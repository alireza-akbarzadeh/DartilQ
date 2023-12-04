/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { buttonClasses, Components } from '@mui/material'

import { info, neutral, primary } from '../colors'
import { typographyHeadings } from '../typography'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    tertiary: true
    link: true
    neutral1: true
    neutral2: true
    contained: false
    outlined: false
    text: false
  }

  interface ButtonPropsSizeOverrides {
    small: true
    medium: true
    large: false
    big: true
  }
}

type MuiButtonType = Components['MuiButton']

const button: MuiButtonType = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    sizeMedium: {
      ...typographyHeadings.bodyMedium,
      height: 48,
      padding: '0px 12px',
      [`& .${buttonClasses.endIcon}`]: {
        marginLeft: 12,
      },
      [`& .${buttonClasses.startIcon}`]: {
        marginRight: 12,
      },
    },
    sizeSmall: {
      ...typographyHeadings.bodySmall,
      height: 40,
      padding: '0px 8px',
    },
    root: {
      borderRadius: 12,
      minWidth: 0,
      '&.MuiButton-sizeBig': {
        ...typographyHeadings.bodyLarge,
        height: 56,
        padding: '0px 16px',
        [`& .${buttonClasses.endIcon}`]: {
          marginLeft: 16,
        },
        [`& .${buttonClasses.startIcon}`]: {
          marginRight: 16,
        },
      },
      [`&.${buttonClasses.disabled}`]: {
        backgroundColor: neutral[200],
        color: neutral[50],
        border: 'none',
      },
    },
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        backgroundColor: primary[500],
        color: primary[50],
        '&:hover': {
          backgroundColor: primary[600],
        },
        '&:focus': {
          outline: `2px solid ${primary[100]}`,
        },
        '&:active': {
          backgroundColor: primary[700],
        },
        [`&.${buttonClasses.disabled}`]: {
          backgroundColor: neutral[200],
          color: neutral[50],
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        backgroundColor: neutral[50],
        border: `1px solid ${primary[500]}`,
        color: primary[500],
        '&:hover': {
          backgroundColor: primary[50],
        },
        '&:focus': {
          backgroundColor: neutral[50],
          outline: `2px solid ${primary[100]}`,
        },
        '&:active': {
          backgroundColor: primary[100],
        },
        [`&.${buttonClasses.disabled}`]: {
          backgroundColor: neutral[300],
          color: neutral[100],
          border: 'none',
        },
      },
    },
    {
      props: { variant: 'tertiary' },
      style: {
        backgroundColor: neutral[50],
        color: primary[500],
        '&:hover': {
          backgroundColor: primary[50],
        },
        '&:focus': {
          outline: `2px solid ${primary[100]}`,
        },
        '&:active': {
          backgroundColor: primary[100],
        },
        [`&.${buttonClasses.disabled}`]: {
          backgroundColor: neutral[50],
          color: neutral[300],
        },
      },
    },
    {
      props: { variant: 'link' },
      style: {
        backgroundColor: neutral[50],
        color: info[500],
        '&:hover': {
          backgroundColor: info[50],
        },
        '&:focus': {
          outline: `2px solid ${info[100]}`,
        },
        '&:active': {
          backgroundColor: info[100],
        },
        [`&.${buttonClasses.disabled}`]: {
          backgroundColor: neutral[50],
          color: neutral[300],
        },
      },
    },
    {
      props: { variant: 'neutral1' },
      style: {
        backgroundColor: neutral[50],
        color: neutral[800],
        border: `1px solid ${neutral[700]}`,
        '&:hover': {
          backgroundColor: neutral[100],
          color: neutral[800],
        },
        '&:focus': {
          outline: `2px solid ${neutral[500]}`,
        },
        '&:active': {
          backgroundColor: neutral[200],
        },
        [`&.${buttonClasses.disabled}`]: {
          backgroundColor: neutral[50],
          color: neutral[300],
          outline: `1px solid ${neutral[100]}`,
        },
      },
    },
    {
      props: { variant: 'neutral2' },
      style: {
        backgroundColor: neutral[50],
        color: neutral[700],
        '&:hover': {
          backgroundColor: neutral[100],
          color: neutral[700],
        },
        '&:active': {
          backgroundColor: neutral[200],
        },
        [`&.${buttonClasses.disabled}`]: {
          color: neutral[300],
          backgroundColor: neutral[50],
          outline: `1px solid ${neutral[200]}`,
        },
      },
    },
  ],
}

export { button }
