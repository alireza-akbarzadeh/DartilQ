/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, InputLabel, InputLabelProps, MenuItem, SelectProps, Stack } from '@mui/material'
import { ForwardedRef, forwardRef, ReactNode, useEffect, useState } from 'react'

import { HBIcon } from '@/core/components'

import {
  HBFormControlRootStyle,
  HBHelperTextStyle,
  HBHelperTextWrapperStyle,
  HBSelectRootStyle,
} from './HBSelect.styles'

interface HBSelectProps extends Omit<SelectProps, 'ref'> {
  label: string
  menuItem?: Array<{
    title: ReactNode
    value: any
    iconPath?: string | ReactNode
    color?: string
    'data-test-id'?: string
  }>
  noneOption?: string
  inputLabelProps?: InputLabelProps
  helperText?: string
  showErrorMessage?: boolean
}

const HBSelect = forwardRef(
  <T extends HTMLInputElement>(
    { noneOption, menuItem, inputLabelProps, helperText, showErrorMessage, ...props }: HBSelectProps,
    ref: ForwardedRef<T>,
  ) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      const handler = () => {
        setIsOpen(false)
      }
      window.addEventListener('scroll', handler)
      return () => {
        window.removeEventListener('scroll', handler)
      }
    }, [])

    return (
      <HBFormControlRootStyle
        style={props.style}
        sx={props.sx}
        size={props.size}
        fullWidth={props.fullWidth}
        required={props.required}
      >
        <InputLabel {...inputLabelProps}>{props.label}</InputLabel>
        <HBSelectRootStyle
          open={isOpen}
          onOpen={() => {
            setIsOpen(true)
          }}
          onClose={() => {
            setIsOpen(false)
          }}
          ref={ref}
          {...props}
        >
          {noneOption && (
            <MenuItem value="">
              <em>{noneOption}</em>
            </MenuItem>
          )}

          {menuItem?.map(item => (
            <MenuItem
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
              key={String(item.value)}
              value={item.value}
              data-test-id={item['data-test-id']}
            >
              {item?.iconPath && typeof item?.iconPath === 'string' && (
                <Avatar
                  sx={{
                    mr: 2,
                    height: 24,
                    width: 24,
                  }}
                  sizes="small"
                  variant="circular"
                  src={`${process.env['NEXT_PUBLIC_CDN']}/${item.iconPath}`}
                  alt={String(item?.title || '')}
                />
              )}
              {item?.color && (
                <Stack
                  sx={{
                    mr: 2,
                    height: 24,
                    width: 24,
                    backgroundColor: item.color,
                    borderRadius: '50%',
                  }}
                />
              )}
              {item?.iconPath && typeof item?.iconPath !== 'string' && item.iconPath}
              {item.title}
            </MenuItem>
          ))}
        </HBSelectRootStyle>
        {helperText && showErrorMessage && (
          <HBHelperTextWrapperStyle sx={{ color: props.error ? 'error.main' : 'grey.900' }}>
            <HBIcon size="small" name="infoCircle" />
            <HBHelperTextStyle>{helperText}</HBHelperTextStyle>
          </HBHelperTextWrapperStyle>
        )}
      </HBFormControlRootStyle>
    )
  },
)

HBSelect.displayName = 'HBSelect'

export type { HBSelectProps }
export { HBSelect }
