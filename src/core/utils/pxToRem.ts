import { ThemeConstants } from '@/core/providers/material/theme/constants'

const { htmlFontSize } = ThemeConstants

export const pxToRem = (px: number, baseFontSize: number = htmlFontSize): string =>
  `${(px / baseFontSize).toFixed(3)}rem`
