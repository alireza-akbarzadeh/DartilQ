/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { BorderType, TextAndIconType } from '@mui/material'
import { PaletteColor, TypeBackground, TypeText } from '@mui/material/styles'
import { ColorPartial, PaletteOptions } from '@mui/material/styles/createPalette'

import * as colors from './colors'

declare module '@mui/material/styles' {
  interface Palette {
    textAndIcon: TextAndIconType
    border: BorderType
  }
  interface PaletteOptions {
    textAndIcon: TextAndIconType
    border: BorderType
  }

  interface PaletteColor {
    lighter?: string
    darker?: string
  }

  interface TypeBackground {
    neutral: string
    light: string
    lightest: string
    dark: string
    darker: string
    darkest: string
  }

  interface TextAndIconType {
    light: string
    lighter: string
    lightest: string
    dark: string
    darker: string
  }

  interface BorderType {
    light: string
    lighter: string
    lightest: string
    dark: string
    darker: string
  }
}

const grey: ColorPartial = {
  100: colors.grey[100],
  200: colors.grey[200],
  300: colors.grey[300],
  500: colors.grey[500],
  700: colors.grey[700],
  900: colors.grey[900],
}

const common = {
  black: '#2B2F33',
  white: '#FFFFFF',
}

const background: TypeBackground = {
  default: '#F2F3F4',
  neutral: '#F2F3F4',
  paper: '#FFFFFF',
  lightest: colors.neutral[50],
  light: colors.neutral[100],
  dark: colors.neutral[200],
  darker: colors.neutral[300],
  darkest: colors.neutral[900],
}

const primary: PaletteColor = {
  main: colors.primary[500],
  lighter: colors.primary[50],
  light: colors.primary[100],
  dark: colors.primary[600],
  darker: colors.primary[800],
  contrastText: common.white,
}

const secondary: PaletteColor = {
  main: colors.secondary[500],
  lighter: colors.secondary[50],
  light: colors.secondary[100],
  dark: colors.secondary[600],
  darker: colors.secondary[800],
  contrastText: common.white,
}

const error: PaletteColor = {
  main: colors.error[500],
  lighter: colors.error[50],
  light: colors.error[100],
  dark: colors.error[600],
  darker: colors.error[800],
  contrastText: common.white,
}

const success: PaletteColor = {
  main: colors.tertiary[500],
  lighter: colors.tertiary[50],
  light: colors.tertiary[100],
  dark: colors.tertiary[600],
  darker: colors.tertiary[800],
  contrastText: common.white,
}

const warning: PaletteColor = {
  main: '#CC6214',
  lighter: '#FFF2E5',
  light: '#E5955C',
  dark: '#803D0C',
  contrastText: common.white,
}

const info: PaletteColor = {
  main: colors.info[500],
  lighter: colors.info[50],
  light: colors.info[100],
  dark: colors.info[600],
  darker: colors.info[800],
  contrastText: common.white,
}

const text: TypeText = {
  primary: '#2B2F33',
  secondary: '#4F565C',
  disabled: '#B6BCC2',
}

const textAndIcon: TextAndIconType = {
  lightest: colors.neutral[50],
  lighter: colors.neutral[200],
  light: colors.neutral[600],
  dark: colors.neutral[700],
  darker: colors.neutral[800],
}

const border: BorderType = {
  lightest: colors.neutral[100],
  lighter: colors.neutral[200],
  light: colors.neutral[300],
  dark: colors.neutral[500],
  darker: colors.neutral[700],
}

const defaultLightPalette: PaletteOptions = {
  mode: 'light',
  primary,
  secondary,
  grey,
  error,
  info,
  warning,
  common,
  background,
  text,
  contrastThreshold: 3,
  tonalOffset: 0.2,
  success,
  divider: 'rgba(0,0,0,0,0.12)',
  textAndIcon,
  border,
}

export { defaultLightPalette }
