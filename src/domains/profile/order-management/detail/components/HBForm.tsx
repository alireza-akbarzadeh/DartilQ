/* eslint-disable func-style */
/* eslint-disable import/exports-last */
import { SxProps, Theme } from '@mui/material'
import React, { forwardRef, ReactElement } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

import { HBFormRootStyle } from './HBForm.styles'

/*
 * Declare module 'react' {
 *   function forwardRef<T, P>(
 *     render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
 *   ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
 * }
 */

type functionalChildren<T extends FieldValues> = (props: UseFormReturn<T>) => JSX.Element
type children<T extends FieldValues> = ReactElement<UseFormReturn> | functionalChildren<T>
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
type HBUseFormProps<T extends FieldValues> = Optional<
  UseFormReturn<T>,
  | 'clearErrors'
  | 'control'
  | 'formState'
  | 'getFieldState'
  | 'getValues'
  | 'handleSubmit'
  | 'register'
  | 'reset'
  | 'resetField'
  | 'setError'
  | 'setFocus'
  | 'setValue'
  | 'trigger'
  | 'unregister'
  | 'watch'
>

export type HBFormFCProps<T extends object> = (props: HBUseFormProps<T>) => JSX.Element

export type HBFormProps<T extends FieldValues> = {
  children?: children<T>[] | children<T>
  style?: React.CSSProperties
  onSubmit?: SubmitHandler<T>
  id?: string
  onInvalid?: SubmitErrorHandler<T>
  sx?: SxProps<Theme>
  formProviderProps?: UseFormReturn<T>
} & UseFormProps<T>

function _HBForm<T extends FieldValues>(props: HBFormProps<T>, ref: React.ForwardedRef<HTMLFormElement>) {
  const { children, style, onSubmit = () => undefined, onInvalid, formProviderProps, sx, id, ...useFormProps } = props
  const Form = formProviderProps
    ? formProviderProps
    : useForm<T>({
        ...useFormProps,
        mode: useFormProps.mode || 'onBlur',
      })

  const getChild = <T,>(item: T) => {
    if (typeof item === 'function') {
      return item(Form)
    }
    return item
  }
  const newChild = () => {
    if (children && Array.isArray(children)) return children.map(item => getChild<children<T>>(item))
    else if (children) return getChild(children)
    return null
  }

  return (
    <FormProvider {...Form}>
      <HBFormRootStyle sx={{ ...style, ...sx }} ref={ref} id={id} onSubmit={Form.handleSubmit(onSubmit, onInvalid)}>
        {newChild()}
      </HBFormRootStyle>
    </FormProvider>
  )
}

const HBForm = forwardRef(_HBForm) as <T extends FieldValues>(
  props: HBFormProps<T> & { ref?: React.ForwardedRef<HTMLFormElement> },
) => ReturnType<typeof _HBForm>

export { HBForm }
