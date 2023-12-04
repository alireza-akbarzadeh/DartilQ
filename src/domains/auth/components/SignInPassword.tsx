'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { HBButton, HBIcon } from '@/core/components/index'
import { PasswordTextField } from '@/shared/componets/PasswordTextField/PasswordTextField'
import { ProviderEnum } from '@/shared/types/enums'

import { authMessages } from '../auth.messages'
import { StepEnum, TypeEnum } from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'
import { useHandleOtp } from '../hooks/useHandleOtp'

export const SignInPassword = () => {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const callbackUrl = searchParams.get('callbackUrl')
  const provider = searchParams.get('provider')
  const { getValues, handleSubmit } = useFormContext()
  const { updateStep, setting, updateType } = useAuthStore()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { handleCreateLoginOtp, handleForgetPassword } = useHandleOtp(getValues('username'))

  const handleCallback = (): void => {
    let pathname = searchParams.toString().split('callbackUrl=')?.[1]?.replace('%3F', '?')
    if (pathname.slice(-1) === '/') pathname.slice(0, -1)
    const callBackAction = (provider ?? '') === ProviderEnum.CustomerComment.toString() ? '1' : ''

    if (callBackAction) pathname += `&callBackAction=${callBackAction}`

    push(pathname)
  }

  const handleSignIn = () => {
    setLoading(true)
    signIn('SIGN_IN', {
      username: getValues('username'),
      password,
      redirect: false,
    })
      .then(response => {
        if (response?.error || !response?.ok) setError(response?.error || 'Unknown')
        else {
          setError('')
          if (callbackUrl) handleCallback()
          else if (setting?.businessFlow?.forceSetFnameLname || setting?.businessFlow?.forceSetNationalCode) {
            updateStep(StepEnum.signUpInformation)
          } else {
            push('/')
          }
        }
      })
      .finally(() => setLoading(false))
  }

  const handleLoginWithOtp = async () => {
    const response = await handleCreateLoginOtp()
    if (response) {
      updateStep(StepEnum.otp)
      updateType(TypeEnum.login)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Stack spacing={4}>
        <Typography variant="bodyMedium" color="textAndIcon.darker">
          <FormattedMessage {...authMessages.enterOtpCode} values={{ phoneNumber: getValues('username') }} />
        </Typography>
        <PasswordTextField
          label={<FormattedMessage {...authMessages.password} />}
          onChange={value => {
            setError('')
            setPassword(value)
          }}
          value={password}
          autoFocus
          error={Boolean(error)}
          helperText={
            error && (
              <Box display="flex" alignItems="center">
                <HBIcon name="exclamationTriangle" sx={{ color: 'error.main' }} size="small" />
                <Typography variant="bodySmall" color="error.main">
                  {error}
                </Typography>
              </Box>
            )
          }
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="info.main" variant="bodySmall" sx={{ cursor: 'pointer' }} onClick={handleForgetPassword}>
            <FormattedMessage {...authMessages.forgetPassword} />
          </Typography>
          <Typography color="info.main" variant="bodySmall" sx={{ cursor: 'pointer' }} onClick={handleLoginWithOtp}>
            <FormattedMessage {...authMessages.loginWithOtp} />
          </Typography>
        </Box>

        <Stack direction="row" spacing={3} py={2}>
          <HBButton sx={{ flex: 1 }} variant="secondary" onClick={() => updateStep(StepEnum.checkPhoneNumber)}>
            <FormattedMessage {...authMessages.back} />
          </HBButton>
          <HBButton
            variant="primary"
            sx={{ flex: 1 }}
            type="submit"
            disabled={
              Boolean(error?.length) || loading || password.length < (setting?.security?.passwordMinLength || 4)
            }
            loading={loading}
          >
            <FormattedMessage {...authMessages.nextStep} />
          </HBButton>
        </Stack>
      </Stack>
    </form>
  )
}
