import {
  Components,
  formHelperTextClasses,
  inputBaseClasses,
  inputLabelClasses,
  outlinedInputClasses,
} from '@mui/material'

import { error, neutral, tertiary } from '../colors'

type MuiTextFieldType = Components['MuiTextField']

const textField: MuiTextFieldType = {
  styleOverrides: {
    root: {
      [`& .${inputBaseClasses.input}`]: {
        padding: '12.5px 12px',
        [`&.${inputBaseClasses.inputSizeSmall}`]: {
          paddingTop: 8.5,
          paddingBottom: 8.5,
        },
      },
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: neutral[200],
        '&:hover': {
          borderColor: neutral[600],
        },
      },

      [`& .${inputLabelClasses.outlined}`]: {
        transformOrigin: 'center left ',
        color: neutral[600],
        lineHeight: 1,
        [`&.${inputBaseClasses.error}`]: {
          color: error[500],
        },
        '&.MuiFormLabel-colorSuccess': {
          color: tertiary[500],
        },
      },
      [`& > div.${inputBaseClasses.disabled}`]: {
        opacity: 0.3,
      },
      [`& > div.${inputBaseClasses.root}`]: {
        backgroundColor: neutral[50],
        borderRadius: 8,
        padding: '0',
        [`&${inputBaseClasses.error} .${inputBaseClasses.input}`]: {
          color: error[500],
        },
        [`&.MuiInputBase-colorSuccess .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: tertiary[500],
        },
        '& > i:first-of-type': {
          marginLeft: 12,
        },
        '& > i:last-of-type': {
          marginRight: 12,
        },
      },
      [`& > p.${formHelperTextClasses.root}`]: {
        marginTop: 4,
        '& i': {
          marginRight: 8,
        },
      },
      '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  },
}

export { textField }
