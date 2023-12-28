'use client'

import { create } from 'zustand'

import { AuthStoreType, StepEnum } from '../authType.d'

export const useAuthStore = create<AuthStoreType>(set => ({
  step: StepEnum.checkPhoneNumber,
  updateStep: step => set(() => ({ step })),
  updateType: type => set(() => ({ type })),
  updateSetting: setting => set(() => ({ setting })),
  updateOtpData: (otpToken, expireDate) => set(() => ({ otpData: { expireDate, otpToken } })),
  updateChangePasswordToken: token => set(() => ({ changePasswordToken: token })),
}))
