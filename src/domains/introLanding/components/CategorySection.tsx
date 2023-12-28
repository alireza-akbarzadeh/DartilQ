'use client'
import { Box, Typography, useTheme } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { HBNextImage, HBRoundedBox } from '@/core/components'
import { useGetCategoryCategories } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { useScale } from '@/shared/hooks/useScale'

type CategorySectionProps = {
  setOpenBottomSheet: Dispatch<SetStateAction<boolean>>
}

export const CategorySection = ({ setOpenBottomSheet }: CategorySectionProps): JSX.Element => {
  const { palette } = useTheme()

  const { data } = useGetCategoryCategories()
  const scale = useScale()
  return (
    <Box sx={{ minHeight: scale(440), backgroundColor: 'primary.main' }}>
      <Box
        sx={{
          minHeight: scale(432),
          maxHeight: scale(432),
          backgroundColor: 'common.white',
          borderRadius: '0% 100% 0% 100% / 95% 5% 95% 5%',
          pt: scale(6),
          display: 'flex',
          flexDirection: 'column',
          gap: scale(5),
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="titleMedium">دسته بندی ها</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: scale(1),
            flexWrap: 'wrap',
            px: 1,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'grey.200',
            '&::-webkit-scrollbar': {
              width: '3px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'grey.200',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey.500',
              borderRadius: '5px',
            },
            maxHeight: scale(345),
          }}
        >
          {data?.data?.categories?.map(category => {
            return (
              <HBRoundedBox
                key={category?.id}
                border={{ width: scale(2), color: palette.primary.main }}
                shadowSx={{ backgroundColor: 'primary.main', opacity: 0.4 }}
                size={scale(108)}
                sx={{
                  backgroundColor: 'common.white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  pt: scale(1),
                }}
                style={{ justifyContent: 'start' }}
                onClick={() => setOpenBottomSheet(true)}
              >
                <HBNextImage
                  alt=""
                  height={scale(50)}
                  src={category?.iconPath ?? ''}
                  width={scale(50)}
                  quality={100}
                  style={{ marginTop: scale(4) }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: scale(40),
                    px: scale(2),
                    pb: scale(2),
                  }}
                >
                  <Typography
                    variant="labelMedium"
                    component="div"
                    sx={{
                      textAlign: 'center',
                      wordWrap: 'break-word',
                    }}
                  >
                    {category?.name?.substring(0, 25)}
                  </Typography>
                </Box>
              </HBRoundedBox>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
