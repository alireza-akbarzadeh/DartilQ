'use client'

import { ComponentType } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { StepEnum } from './authType.d'
import { AuthOtp } from './components/AuthOtp'
import { CheckExistPhoneNumber } from './components/CheckExistPhoneNumber'
import { SetPassword } from './components/SetPassword'
import { SignInPassword } from './components/SignInPassword'
import { SignUpInformation } from './components/SignUpInformation'
import { useAuthStore } from './hooks/useAuthStore'

const stepRenderer: Record<StepEnum, ComponentType> = {
  checkPhoneNumber: CheckExistPhoneNumber,
  otp: AuthOtp,
  password: SignInPassword,
  forgetPassword: SignInPassword,
  signUpInformation: SignUpInformation,
  setPassword: SetPassword,
}

export const AuthPage = () => {
  const { step } = useAuthStore()

  const methods = useForm({ mode: 'onChange' })
  const ComponentRender = stepRenderer[step]
  return (
    <FormProvider {...methods}>
      <ComponentRender />
    </FormProvider>
  )
}
