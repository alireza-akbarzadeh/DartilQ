'use client'
import { TextField, TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'

import { HBIcon } from '../HBIcon/HBIcon'

export type HBTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
  clearable?: boolean
  withSearchIcon?: boolean
  onChange?: (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
          <HBIcon
            name="times"
            onClick={() => onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
            sx={{ color: 'textAndIcon.dark' }}
          />
        ) : (
          InputProps?.endAdornment
        ),
        ...InputProps,
      }}
      value={value}
      onChange={event => {
        return onChange?.(event)
      }}
      {...rest}
    />
  )
}
