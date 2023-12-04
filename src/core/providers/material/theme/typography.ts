/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { TypographyOptions } from '@mui/material/styles/createTypography'

import { ThemeConstants } from './constants'
import { pxToRem } from './helpers'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    smallCaption: React.CSSProperties
    smallOverline: React.CSSProperties
    displayLarge: React.CSSProperties
    displayMedium: React.CSSProperties
    displaySmall: React.CSSProperties
    headlineLarge: React.CSSProperties
    headlineMedium: React.CSSProperties
    headlineSmall: React.CSSProperties
    titleLarge: React.CSSProperties
    titleMedium: React.CSSProperties
    titleSmall: React.CSSProperties
    labelLarge: React.CSSProperties
    labelMedium: React.CSSProperties
    labelSmall: React.CSSProperties
    bodyLarge: React.CSSProperties
    bodyMedium: React.CSSProperties
    bodySmall: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    smallCaption?: React.CSSProperties
    smallOverline?: React.CSSProperties
    displayLarge: React.CSSProperties
    displayMedium: React.CSSProperties
    displaySmall: React.CSSProperties
    headlineLarge: React.CSSProperties
    headlineMedium: React.CSSProperties
    headlineSmall: React.CSSProperties
    titleLarge: React.CSSProperties
    titleMedium: React.CSSProperties
    titleSmall: React.CSSProperties
    labelLarge: React.CSSProperties
    labelMedium: React.CSSProperties
    labelSmall: React.CSSProperties
    bodyLarge: React.CSSProperties
    bodyMedium: React.CSSProperties
    bodySmall: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    smallCaption: true
    smallOverline: true
    displayLarge: true
    displayMedium: true
    displaySmall: true
    headlineLarge: true
    headlineMedium: true
    headlineSmall: true
    titleLarge: true
    titleMedium: true
    titleSmall: true
    labelLarge: true
    labelMedium: true
    labelSmall: true
    bodyLarge: true
    bodyMedium: true
    bodySmall: true
  }
}

const {
  htmlFontSize,
  fontFamily,
  fontSize,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
  fontWeightMediumBold,
  fontWeightExtraBold,
} = ThemeConstants

const fontWeights = {
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
  fontWeightMediumBold,
  fontWeightExtraBold,
}

const typographyHeadings: TypographyOptions = {
  h1: {
    fontWeight: fontWeightBold,
    fontSize: pxToRem(64),
    lineHeight: '110.5px',
  },
  h2: {
    fontWeight: fontWeightBold,
    fontSize: pxToRem(48),
    lineHeight: '82.9px',
  },
  h3: {
    fontWeight: fontWeightBold,
    fontSize: pxToRem(32),
    lineHeight: '55.3px',
  },
  h4: {
    fontWeight: fontWeightBold,
    fontSize: pxToRem(24),
    lineHeight: '41.5px',
  },
  h5: {
    fontWeight: fontWeightBold,
    fontSize: pxToRem(20),
    lineHeight: '34.5px',
  },
  h6: {
    fontWeight: fontWeightBold,
    fontSize: pxToRem(18),
    lineHeight: '31.1px',
  },

  subtitle1: {
    fontWeight: fontWeightMedium,
    fontSize: pxToRem(16),
    lineHeight: '27.6px',
  },
  subtitle2: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(14),
    lineHeight: '24.2px',
  },
  body1: {
    fontWeight: fontWeightLight,
    fontSize: pxToRem(16),
    lineHeight: '27.6px',
  },
  body2: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(14),
    lineHeight: '24.2px',
  },
  button: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(14),
    lineHeight: '24.2px',
  },
  caption: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(12),
    lineHeight: '20.7px',
  },
  overline: {
    fontWeight: fontWeightMedium,
    fontSize: pxToRem(12),
    lineHeight: '20.7px',
  },
  smallCaption: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(10),
    lineHeight: '17.3px',
  },
  smallOverline: {
    fontWeight: fontWeightMedium,
    fontSize: pxToRem(10),
    lineHeight: '17.3px',
  },
  displayLarge: {
    fontWeight: fontWeightExtraBold,
    fontSize: pxToRem(48),
    lineHeight: '64px',
  },
  displayMedium: {
    fontWeight: fontWeightExtraBold,
    fontSize: pxToRem(40),
    lineHeight: '54px',
  },
  displaySmall: {
    fontWeight: fontWeightExtraBold,
    fontSize: pxToRem(36),
    lineHeight: '48px',
  },
  headlineLarge: {
    fontWeight: fontWeightExtraBold,
    fontSize: pxToRem(32),
    lineHeight: '44px',
  },
  headlineMedium: {
    fontWeight: fontWeightExtraBold,
    fontSize: pxToRem(10),
    lineHeight: '34px',
  },
  headlineSmall: {
    fontWeight: fontWeightExtraBold,
    fontSize: pxToRem(10),
    lineHeight: '28px',
  },
  titleLarge: {
    fontWeight: fontWeightMediumBold,
    fontSize: pxToRem(20),
    lineHeight: '28px',
  },
  titleMedium: {
    fontWeight: fontWeightMediumBold,
    fontSize: pxToRem(14),
    lineHeight: '18px',
  },
  titleSmall: {
    fontWeight: fontWeightMediumBold,
    fontSize: pxToRem(14),
    lineHeight: '20px',
  },
  labelLarge: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(14),
    lineHeight: '20px',
  },
  labelMedium: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(12),
    lineHeight: '18px',
  },
  labelSmall: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(10),
    lineHeight: '14px',
  },
  bodyLarge: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(16),
    lineHeight: '24px',
  },
  bodyMedium: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(14),
    lineHeight: '28px',
  },
  bodySmall: {
    fontWeight: fontWeightRegular,
    fontSize: pxToRem(12),
    lineHeight: '18px',
  },
}

const typography: TypographyOptions = {
  htmlFontSize,
  fontFamily,
  fontSize,
  ...fontWeights,
  ...typographyHeadings,
}

export { fontWeights, typography, typographyHeadings }
