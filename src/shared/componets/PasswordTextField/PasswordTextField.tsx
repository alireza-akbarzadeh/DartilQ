'use client'

import { IconButton } from '@mui/material'
import { useState } from 'react'

import { HBTextFieldProps } from '@/core/components/HBTextField/HBTextField'
import { HBIcon, HBTextField } from '@/core/components/index'

export const PasswordTextField = (props: HBTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  return (
    <HBTextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            sx={{ mr: 2 }}
            edge="end"
          >
            {showPassword ? <HBIcon name="eyeSlash" /> : <HBIcon name="eye" />}
          </IconButton>
        ),
      }}
    />
  )
}
