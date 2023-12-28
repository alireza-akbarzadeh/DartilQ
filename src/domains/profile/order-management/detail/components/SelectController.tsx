/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectClasses, useTheme } from '@mui/material'
import { Controller, FieldPath, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form'

import { HBSelect, HBSelectProps } from './HBSelect'

interface SelectControllerProps<FieldValueType extends FieldValues = any> extends Omit<HBSelectProps, 'name'> {
  name: FieldPath<FieldValueType>
  formRules?: RegisterOptions
  noneOption?: string
  disabled?: boolean
}

export const SelectController = <FieldValueType extends FieldValues = any>({
  name,
  formRules,
  label,
  disabled,
  sx,
  ...props
}: SelectControllerProps<FieldValueType>): JSX.Element => {
  const { control, watch } = useFormContext()
  const { spacing } = useTheme()

  const defaultValue: any = watch(name) || ''

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        const _value = props.multiple ? (Array.isArray(value) ? value : []) : value
        return (
          <HBSelect
            SelectDisplayProps={{
              style: {
                display: 'flex',
                flexDirection: 'row',
              },
            }}
            disabled={disabled}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            label={label}
            size="small"
            value={_value}
            onBlur={onBlur}
            onChange={onChange}
            {...props}
            sx={{
              borderRadius: spacing(1),
              [`& .${selectClasses.select}`]: {
                display: 'inline-block !important',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              ...sx,
            }}
          />
        )
      }}
      rules={
        formRules || {
          required: { value: true, message: `${label} نمی تواند خالی بماند` },
        }
      }
    />
  )
}
