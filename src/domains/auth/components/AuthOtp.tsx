'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import OtpInput from 'react-otp-input'

import { HBButton, HBCountDownTimer, HBIcon } from '@/core/components/index'
import { ProviderEnum } from '@/shared/types/enums'

import { authMessages } from '../auth.messages'
import { CredentialGetType, StepEnum, TypeEnum } from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'
import { useCreateCustomer } from '../hooks/useCreateCustomer'
import { useHandleOtp } from '../hooks/useHandleOtp'

export const AuthOtp = () => {
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const callbackUrl = searchParams.get('callbackUrl')
  const provider = searchParams.get('provider')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setting, otpData, type, updateStep, updateOtpData } = useAuthStore()
  const { getValues, handleSubmit } = useFormContext<{ username: string }>()
  const {
    handleCreateLoginOtp,
    handleForgetPassword,
    handleValidateOtpRegister,
    handleCreateRegisterOtp,
    handleValidateOtpForForgetPassword,
  } = useHandleOtp(getValues('username'))
  const { handleCreateCustomer, loading: createCustomerLoading, error: createCustomerError } = useCreateCustomer()

  const handleResendOTP = async () => {
    setOtp('')
    switch (type) {
      case TypeEnum.login: {
        await handleCreateLoginOtp()
        break
      }
      case TypeEnum.register: {
        await handleCreateRegisterOtp()
        break
      }
      default: {
        await handleForgetPassword()
      }
    }
  }

  const handleCallback = (): void => {
    let pathname = searchParams.toString().split('callbackUrl=')?.[1]?.replace('%3F', '?')
    if (pathname.slice(-1) === '/') pathname.slice(0, -1)
    const callBackAction = (provider ?? '') === ProviderEnum.CustomerComment.toString() ? '1' : ''

    if (callBackAction) pathname += `&callBackAction=${callBackAction}`

    push(pathname)
  }

  const handleConfirm = async () => {
    setError('')
    setLoading(true)
    if (type === TypeEnum.login) {
      signIn('SIGN_IN', {
        username: getValues('username'),
        loginType: 'otp',
        otpToken: otpData?.otpToken,
        otpCode: otp,
        redirect: false,
      })
        .then(response => {
          if (response?.error || !response?.ok) {
            setOtp('')
            setError(response?.error || '')
          } else {
            updateOtpData('', '')
            if (callbackUrl) {
              handleCallback()
            } else if (setting?.businessFlow?.forceSetFnameLname || setting?.businessFlow?.forceSetNationalCode) {
              updateStep(StepEnum.signUpInformation)
            } else {
              push('/')
            }
          }
        })
        .catch(error => {
          setOtp('')
          setError(error)
        })
        .finally(() => setLoading(false))
    } else if (type === TypeEnum.register) {
      handleValidateOtpRegister(otp)
        .then(response => {
          if (setting?.businessFlow?.forceSetFnameLname || setting?.businessFlow?.forceSetNationalCode) {
            updateStep(StepEnum.signUpInformation)
          } else {
            handleCreateCustomer(response, getValues('username'), 'm', 'm')
          }
        })
        .catch(error => {
          setError(error.toString().replace('Error:', ''))
          setOtp('')
        })
        .finally(() => setTimeout(() => setLoading(false), 1000))
    } else {
      handleValidateOtpForForgetPassword(otp)
    }
  }

  useEffect(() => {
    if (otp.length === (setting?.security?.numberOfOtpDigit || 6)) handleConfirm()
  }, [otp])

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController()
      const option: CredentialGetType = {
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigator.credentials.get(option).then((otp: any) => {
        setOtp(otp.code)
      })
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(handleConfirm)}>
      <Stack
        spacing={4}
        sx={theme => ({
          '& > div > input': {
            color: 'textAndIcon.darker',
            borderColor: 'textAndIcon.light',
            borderRadius: 1,
            borderWidth: 1,
            fontFamily: theme.typography.fontFamily,
            '&:focus-visible': {
              outline: 'unset',
              borderColor: 'primary.main',
            },
            '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          },
        })}
      >
        <Typography variant="bodyMedium" color="textAndIcon.darker">
          <FormattedMessage {...authMessages.enterOtpCode} values={{ phoneNumber: getValues('username') }} />
        </Typography>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={setting?.security?.numberOfOtpDigit || 6}
          inputType="number"
          renderSeparator={<Box mx={1} />}
          shouldAutoFocus
          renderInput={props => <input {...props} />}
          containerStyle={{ direction: 'ltr', justifyContent: 'space-around' }}
          inputStyle={{
            width: 48,
            height: 48,
            fontSize: 16,
          }}
        />
        {(error || createCustomerError) && (
          <Box display="flex" alignItems="center">
            <HBIcon name="exclamationTriangle" size="small" sx={{ color: 'error.main' }} />
            <Typography variant="bodySmall" color="error.main" ml={1}>
              {error || createCustomerError}
            </Typography>
          </Box>
        )}
        <Box display="flex" justifyContent={type === TypeEnum.login ? 'space-between' : 'center'} alignItems="center">
          {type === TypeEnum.login && (
            <Typography color="info.main" variant="bodySmall" onClick={() => updateStep(StepEnum.password)}>
              <FormattedMessage {...authMessages.loginWithPassword} />
            </Typography>
          )}
          <Typography color="textAndIcon.darker" variant="bodySmall">
            <HBCountDownTimer
              extraTimerText={<FormattedMessage {...authMessages.extraTimerText} />}
              linkText={<FormattedMessage {...authMessages.resendOtp} />}
              maximumShowed="minute"
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& h5,& p': theme => ({
                  ...theme.typography.bodySmall,
                  marginRight: theme.spacing(0),
                }),
              }}
              targetDate={new Date(otpData?.expireDate || '').getTime()}
              onClick={handleResendOTP}
            />
          </Typography>
        </Box>

        <Stack direction="row" spacing={3} py={2}>
          <HBButton sx={{ flex: 1 }} variant="secondary" onClick={() => updateStep(StepEnum.checkPhoneNumber)}>
            <FormattedMessage {...authMessages.editPhoneNumber} />
          </HBButton>
          <HBButton
            variant="primary"
            sx={{ flex: 1 }}
            type="submit"
            disabled={createCustomerLoading || loading || otp.length < (setting?.security?.numberOfOtpDigit || 6)}
            loading={createCustomerLoading || loading}
          >
            <FormattedMessage {...authMessages.confirm} />
          </HBButton>
        </Stack>
      </Stack>
    </form>
  )
}
