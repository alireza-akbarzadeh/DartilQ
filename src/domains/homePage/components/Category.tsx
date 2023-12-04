/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { forwardRef, memo, useEffect, useState } from 'react'

import { HBBottomSheet, HBIcon, HBNextImage } from '@/core/components'
import { useGetCategoryCategories } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { RoundedBoxContainer } from '@/shared/componets/RoundedBoxContainer'

const ANIMATION_DURATION = 5000

type CategoryProps = {
  curveColor?: string
}

export const Category = memo(
  forwardRef<HTMLDivElement, CategoryProps>((props, ref): JSX.Element => {
    const { curveColor } = props
    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)

    const { data: categoriesData, isLoading } = useGetCategoryCategories()
    const [isFirstloading, setIsFirstloading] = useState<boolean>(isLoading)
    const { push } = useRouter()

    useEffect(() => {
      if (!isLoading) {
        setTimeout(() => setIsFirstloading(false), ANIMATION_DURATION + 1000)
      }
    }, [isLoading])

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            bgcolor: 'primary.main',
            pt: 2,
            gap: 4,
            position: 'relative',
            pb: 8,
            '&:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              borderRadius: '0 90%  0 0',
              width: '100%',
              height: 20,
              backgroundColor: curveColor,
              bottom: -1,
            },
          }}
        >
          <RoundedBoxContainer
            size={355}
            data={categoriesData?.data?.categories ?? []}
            showAnimation={isFirstloading}
            animationDuration={ANIMATION_DURATION}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'textAndIcon.lightest',
              height: 70,
              pb: 4,
              cursor: 'pointer',
            }}
            onClick={() => setOpenBottomSheet(true)}
            ref={ref}
          >
            {(categoriesData?.data?.categories?.length ?? 0) > 7 ? (
              <Typography variant="bodySmall">همه دسته‌بندی‌ها</Typography>
            ) : null}
          </Box>
        </Box>
        {openBottomSheet && (
          <HBBottomSheet open={openBottomSheet} onClose={() => setOpenBottomSheet(false)} hidePuller fullScreen>
            <Box sx={{ display: 'flex', gap: 2, p: 4 }}>
              <HBIcon name="angleRight" size="large" onClick={() => setOpenBottomSheet(false)} />
              <Typography variant="titleLarge">همه دسته‌بندی‌ها</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {categoriesData?.data?.categories?.map((category, index) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    borderTop: 1,
                    borderLeft: index % 2 ? 1 : 0,
                    borderColor: 'background.light',
                    width: '50%',
                    py: 2,
                    px: 4,
                    cursor: 'pointer',
                  }}
                  onClick={() => push(`/category/${category.id}`)}
                  key={category.id}
                >
                  <HBNextImage alt="" height={40} src={category?.icon ?? ''} width={40} />
                  <Typography variant="labelMedium">{category?.name}</Typography>
                </Box>
              ))}
            </Box>
          </HBBottomSheet>
        )}
      </>
    )
  }),
)
