'use client'
import { TextField, TextFieldProps } from '@mui/material'

import { HBIcon } from '../HBIcon/HBIcon'

export type HBTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
  clearable?: boolean
  withSearchIcon?: boolean
  onChange?: (value: string) => void
}

export const HBTextField = (props: HBTextFieldProps): JSX.Element => {
  const { clearable, withSearchIcon, InputProps, value, onChange, ...rest } = props

  return (
    <TextField
      InputProps={{
        startAdornment: withSearchIcon ? (
          <HBIcon name="search" sx={{ color: value ? 'textAndIcon.dark' : 'textAndIcon.light' }} />
        ) : (
          InputProps?.startAdornment
        ),
        endAdornment: clearable ? (
          <HBIcon name="times" onClick={() => onChange?.('')} sx={{ color: 'textAndIcon.dark' }} />
        ) : (
          InputProps?.endAdornment
        ),
        ...InputProps,
      }}
      value={value}
      onChange={event => onChange?.(event.target.value)}
      {...rest}
    />
  )
}
