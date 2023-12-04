'use client'

import { BusinessFlow, Security } from '@/services/ids-services/ids.schemas'

export enum DefaultLoginType {
  Otp = 'otp',
  Password = 'password',
}

export enum TypeEnum {
  login = 'login',
  register = 'register',
  forgetPassword = 'forgetPassword',
}

export enum StepEnum {
  checkPhoneNumber = 'checkPhoneNumber',
  otp = 'otp',
  password = 'password',
  forgetPassword = 'forgetPassword',
  signUpInformation = 'signUpInformation',
  setPassword = 'setPassword',
}

type SettingType = {
  businessFlow: BusinessFlow
  loginScopes?: string[] | null
  security?: Security
}

export type AuthStoreType = {
  type?: TypeEnum
  step: StepEnum
  updateType: (type: AuthStoreType['type']) => void
  updateStep: (step: AuthStoreType['step']) => void
  setting?: SettingType
  updateSetting: (setting: SettingType) => void
  changePasswordToken?: string | null
  updateChangePasswordToken: (token?: string) => void
  otpData?: { otpToken?: string | null; expireDate?: string | null }
  updateOtpData: (otpToken?: string | null, expireDate?: string | null) => void
}

export const mobileRegex = new RegExp('^09[0-3|8-9][0-9]{8}$')
// eslint-disable-next-line prettier/prettier
export const specialCharRegex = new RegExp(`[$&+,:;=?@#|'<>.^*()%!-]`)
export const capitalRegex = new RegExp('[A-Z ]+')
export const smallChrRegex = new RegExp('[a-z ]+')
export const numberRegex = new RegExp('[0-9]')

export type RulesType = 'minLength' | 'maxLength' | 'specialChar' | 'number' | 'capitalChr' | 'smallChr' | 'match'

export type PasswordCheckerProps = {
  value: string
  rules: Partial<Record<RulesType, ReactNode>>
  onValid: (valid: boolean) => void
  minLength?: number
  maxLength?: number
}

export interface CredentialGetType {
  otp: { transport: ['sms'] }
  signal: AbortSignal
}
