import { ThemeConstants } from './constants'

const { htmlFontSize } = ThemeConstants

const pxToRem = (px: number, baseFontSize: number = htmlFontSize): string => `${(px / baseFontSize).toFixed(3)}rem`

const remToPx = (rem: number, baseFontSize: number = htmlFontSize): string => `${(rem * baseFontSize).toFixed(0)}px`

export { pxToRem, remToPx }
