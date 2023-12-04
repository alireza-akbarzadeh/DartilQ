'use client'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

import { HBTextField, HBTextFieldProps } from './HBTextField'

export const HBTextFieldController = (
  props: HBTextFieldProps & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue'>,
): JSX.Element => {
  const { name, rules, defaultValue, ...rest } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value } }) => (
        <HBTextField onChange={val => onChange(val)} value={value} onBlur={onBlur} {...rest} />
      )}
    />
  )
}
