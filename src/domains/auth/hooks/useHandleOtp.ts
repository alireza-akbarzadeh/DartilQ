import {
  usePostAuthCustomerCreateOTPForLogin,
  usePostAuthCustomerCreateOtpForRegister,
  usePostAuthCustomerCreateOTPForSetPassword,
  usePostAuthCustomerValidateOTPForRegister,
  usePostAuthCustomerValidateOTPForSetPassword,
} from '@/services/ids-services/ids'

import { StepEnum, TypeEnum } from '../authType.d'
import { useAuthStore } from './useAuthStore'

export const useHandleOtp = () => {
  const { updateOtpData, otpData, updateChangePasswordToken, updateStep, updateType } = useAuthStore()

  const { mutateAsync: createOtpForRegister } = usePostAuthCustomerCreateOtpForRegister()
  const { mutateAsync: createOtpForLogin } = usePostAuthCustomerCreateOTPForLogin()
  const { mutateAsync: validateOtpForRegister } = usePostAuthCustomerValidateOTPForRegister()
  const { mutateAsync: createOtpForSetPassword } = usePostAuthCustomerCreateOTPForSetPassword()
  const { mutateAsync: validateOtpForSetPassword } = usePostAuthCustomerValidateOTPForSetPassword()

  const handleCreateLoginOtp = async (username: string) => {
    const otpLoginRes = await createOtpForLogin({ data: { user: username } })
    if (otpLoginRes.otpToken) {
      updateOtpData(otpLoginRes?.otpToken, otpLoginRes?.expireDate)
      return Promise.resolve(true)
    }
    throw Error(otpLoginRes.message || '')
  }
  const handleCreateRegisterOtp = async (username: string) => {
    const otpRegisterRes = await createOtpForRegister({
      data: { user: username },
    })
    if (otpRegisterRes.otpToken) {
      updateOtpData(otpRegisterRes?.otpToken, otpRegisterRes?.expireDate)
      return Promise.resolve(true)
    }
    throw Error(otpRegisterRes.message || '')
  }

  const handleValidateOtpRegister = async (otpCode: string, username: string) => {
    const response = await validateOtpForRegister({
      data: { otpCode, otpToken: otpData?.otpToken, user: username },
    })
    if (response.error) throw new Error(response?.error || '')
    else {
      updateChangePasswordToken(response.changePasswordToken || '')
      return Promise.resolve(response.changePasswordToken || '')
    }
  }

  const handleForgetPassword = async (username: string) => {
    const response = await createOtpForSetPassword({ data: { user: username } })
    if (response.otpToken) {
      updateOtpData(response.otpToken, response?.expireDate)
      updateStep(StepEnum.otp)
      updateType(TypeEnum.forgetPassword)
      return Promise.resolve(true)
    }
    throw Error(response.message || '')
  }

  const handleValidateOtpForForgetPassword = async (otpCode: string, username: string) => {
    const response = await validateOtpForSetPassword({
      data: { otpCode, otpToken: otpData?.otpToken, user: username },
    })
    if (response.changePasswordToken) {
      updateChangePasswordToken(response.changePasswordToken)
      updateStep(StepEnum.setPassword)
    }
    throw Error(response.error || '')
  }

  return {
    handleCreateLoginOtp,
    handleCreateRegisterOtp,
    handleValidateOtpRegister,
    handleForgetPassword,
    handleValidateOtpForForgetPassword,
  }
}
