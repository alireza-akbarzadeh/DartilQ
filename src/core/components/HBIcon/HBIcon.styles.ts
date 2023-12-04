import { styled } from '@mui/material'

import { IconSize } from '@/core/components/HBIcon/HBIcon.types'
import { pxToRem } from '@/core/utils/pxToRem'

type HBIconStyleProps = {
  size: IconSize
}

const sizes: Record<IconSize, number> = {
  xSmall: 16,
  small: 20,
  medium: 24,
  large: 28,
  xLarge: 32,
}

export const HBIconRootStyle = styled('i')(({ size }: HBIconStyleProps) => {
  return {
    fontSize: pxToRem(sizes[size]),
    display: 'flex',
    alignItems: 'center',
  }
})
