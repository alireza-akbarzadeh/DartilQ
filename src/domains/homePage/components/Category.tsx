/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { forwardRef, memo, useEffect, useState } from 'react'

import { HBBottomSheet, HBIcon, HBNextImage } from '@/core/components'
import { useGetCategoryCategories } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { CategoryModel } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { CategoryLoader, RoundedBoxContainer } from '@/shared/components'
import { useScale } from '@/shared/hooks/useScale'

const ANIMATION_DURATION = 5000

type CategoryProps = {
  curveColor?: string
}

export const Category = memo(
  forwardRef<HTMLDivElement, CategoryProps>((props, ref): JSX.Element => {
    const { curveColor } = props
    const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
    const { data: userSession } = useSession()
    const defaultAddress = userSession?.user.address

    const { data: categoriesData, isLoading } = useGetCategoryCategories({
      CityId: defaultAddress?.cityId,
      Latitude: defaultAddress?.latitude,
      Longitude: defaultAddress?.longitude,
    })
    const [isFirstloading, setIsFirstloading] = useState<boolean>(isLoading)
    const { push } = useRouter()
    const scale = useScale()

    useEffect(() => {
      if (!isLoading) {
        setTimeout(() => setIsFirstloading(false), ANIMATION_DURATION + 1000)
      }
    }, [isLoading])

    const navigateToCategory = (category: CategoryModel) => {
      const url = `/category/${category.latinName}${category.isLeaf ? `?name=${category.name}` : ''}`
      push(url)
    }

    if (isLoading) {
      return <CategoryLoader />
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            bgcolor: 'primary.main',
            pt: scale(2),
            gap: scale(4),
            position: 'relative',
            pb: scale(8),
            '&:after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              borderRadius: '0 90%  0 0',
              width: '100%',
              height: scale(20),
              backgroundColor: curveColor,
              bottom: scale(-1),
            },
            marginTop: -10,
          }}
        >
          <RoundedBoxContainer
            size={scale(355)}
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
              height: scale(50),

              cursor: 'pointer',
              marginTop: -2,
            }}
            onClick={() => setOpenBottomSheet(true)}
            ref={ref}
          >
            {(categoriesData?.data?.categories?.length ?? 0) > 7 ? (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="bodySmall">همه دسته‌بندی‌ها</Typography>
                <HBIcon name="angleUp" />
              </Box>
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
                  onClick={() => navigateToCategory(category)}
                  key={category.id}
                >
                  <HBNextImage alt="" height={40} src={category?.iconPath ?? ''} width={40} />
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
