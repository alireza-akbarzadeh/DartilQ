'use client'
import { Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBNextImage, HBRoundedBox } from '@/core/components'
import { CategoryModel } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { useScale } from '@/shared/hooks/useScale'

import { RoundedBoxContainerRootStyle } from './RoundedBoxContainer.styles'

type RoundedBoxContainerProps = {
  size: number
  data: CategoryModel[]
  showAnimation: boolean
  animationDuration?: number
  viewLeaf?: boolean
}

const roundedBoxPosition = {
  '5': ['deg-0', 'deg-45', 'deg-135', 'deg-225', 'deg-315'],
  '6': ['deg-0', 'deg-50', 'deg-135', 'deg-200', 'deg-270', 'deg-340'],
  '7': ['deg-0', 'deg-245', 'deg-185', 'deg-125', 'deg-65', 'deg-5', 'deg-305'],
}

export const RoundedBoxContainer = ({
  size,
  data,
  showAnimation,
  animationDuration,
  viewLeaf = true,
}: RoundedBoxContainerProps) => {
  const { palette } = useTheme()
  const { push } = useRouter()
  const scale = useScale()
  const dataLength = data.length >= 7 ? 7 : data.length
  const categories = data.slice(0, 7).reverse()

  const navigateToCategory = (category: CategoryModel) => {
    const url = `/category/${category.latinName}/${category.isLeaf || !viewLeaf ? '' : `?name=${category.name}`}`
    push(url)
  }

  return (
    <RoundedBoxContainerRootStyle
      total={dataLength}
      animation={showAnimation ? 'true' : 'false'}
      duration={animationDuration}
      {...{ size }}
    >
      <Box className={dataLength > 4 ? 'round-box-circle-container' : 'round-box-container'}>
        {categories?.map((category, index) => {
          return (
            <HBRoundedBox
              key={category?.id}
              border={{ width: scale(2), color: palette.primary.dark }}
              shadowSx={{ backgroundColor: 'primary.dark', opacity: 0.4 }}
              size={scale(114)}
              sx={{
                backgroundColor: 'common.white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              style={{ justifyContent: 'end' }}
              className={
                dataLength > 4
                  ? `round-box ${roundedBoxPosition[dataLength.toString() as keyof typeof roundedBoxPosition][index]}`
                  : ''
              }
              onClick={() => navigateToCategory(category)}
            >
              <HBNextImage
                alt=""
                height={scale(57)}
                src={category?.iconPath ?? ''}
                width={scale(57)}
                style={{ borderRadius: 10 }}
                quality={100}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  minHeight: scale(35),
                  width: 120,
                  px: scale(1),
                  pb: scale(1),
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
                  {category?.name}
                </Typography>
              </Box>
            </HBRoundedBox>
          )
        })}
      </Box>
    </RoundedBoxContainerRootStyle>
  )
}
