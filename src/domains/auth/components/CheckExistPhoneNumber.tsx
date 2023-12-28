'use client'
import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { HBButton, HBIcon, HBTextField } from '@/core/components/index'
import { toEnNumConverter } from '@/core/utils/toEnNumConverter'
import { useGetAuthCustomerGetLoginInfo, useGetAuthCustomerGetRegisterInfo } from '@/services/ids-services/ids'
import { useGetUserMobileRoles } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { regexps } from '@/shared/constants'

import { DefaultLoginType, mobileRegex, StepEnum, TypeEnum } from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'
import { useHandleOtp } from '../hooks/useHandleOtp'
import { TermsAndRules } from './TermsAndRules'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const CheckExistPhoneNumber = () => {
  const { updateStep, updateSetting, updateType } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)

  const {
    formState: { errors },
    setError,
    getValues,
    handleSubmit,
  } = useFormContext<{ username: string }>()
  const { handleCreateLoginOtp, handleCreateRegisterOtp } = useHandleOtp()

  const { refetch: getUserRole, isFetching } = useGetUserMobileRoles(getValues('username'), {
    query: { enabled: false },
  })
  const { refetch: getLoginInfo } = useGetAuthCustomerGetLoginInfo(
    { Provider: 0, UserName: getValues('username') },
    { query: { enabled: false } },
  )
  const { refetch: getRegisterInfo } = useGetAuthCustomerGetRegisterInfo(
    { Provider: 0, ReturnUrl: '-' },
    { query: { enabled: false } },
  )

  const handleCheck = async () => {
    setLoading(true)
    await sleep(2000)
    getUserRole()
      .then(async roleResponse => {
        if (roleResponse?.data?.success && roleResponse?.data?.data?.flow) {
          const [isAdmin, isCustomer] = roleResponse.data.data.flow
          if (Number(isAdmin) + Number(isCustomer) > 0) {
            const loginResponse = await getLoginInfo()
            if (loginResponse.data?.businessLoginFlow) {
              if (loginResponse.data.defaultLoginType?.toLocaleLowerCase() === DefaultLoginType.Otp) {
                await handleCreateLoginOtp(getValues('username'))
              }

              updateStep(
                loginResponse.data.defaultLoginType?.toLocaleLowerCase() === DefaultLoginType.Otp
                  ? StepEnum.otp
                  : StepEnum.password,
              )
              updateType(TypeEnum.login)
              updateSetting({
                businessFlow: loginResponse.data.businessLoginFlow,
                loginScopes: loginResponse.data.loginScopes,
                security: loginResponse.data.securityLogin,
              })
            }
          } else {
            const registerResponse = await getRegisterInfo()
            if (registerResponse.data?.businessRegisterFlow) {
              const otpRegisterRes = await handleCreateRegisterOtp(getValues('username'))
              if (otpRegisterRes) {
                updateStep(StepEnum.otp)
                updateType(TypeEnum.register)
                updateSetting({
                  businessFlow: registerResponse.data.businessRegisterFlow,
                  security: registerResponse.data.securityRegister,
                })
              }
            }
          }
        } else {
          setError('username', {
            message: roleResponse.data?.messages?.[0]?.message ?? 'دریافت اطلاعات با خطا مواجه شد',
          })
        }
      })
      .catch(err => {
        setError('username', {
          message: err?.toString().replace('Error:', '') || '',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCheck)}>
        <Stack spacing={4}>
          <Typography variant="bodyMedium" color="textAndIcon.darker">
            برای ادامه شماره موبایل خود را وارد کنید.
          </Typography>

          <Controller
            name="username"
            rules={{
              pattern: {
                message: 'شماره موبایل وارد شده نادرست است',
                value: new RegExp(mobileRegex),
              },
              required: {
                value: true,
                message: 'شماره موبایل را وارد کنید',
              },
            }}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <HBTextField
                onChange={val => onChange(toEnNumConverter(val))}
                value={value}
                dir="ltr"
                autoFocus
                label={'شماره موبایل'}
                error={Boolean(errors?.username?.message?.length)}
                onKeyDown={event => {
                  if (
                    !(
                      new RegExp(regexps.allowNumbers).test(event.key) ||
                      event.key === 'Enter' ||
                      event.key === 'Backspace' ||
                      event.key === 'Delete'
                    )
                  ) {
                    event.stopPropagation()
                    event.preventDefault()
                  }
                }}
                helperText={
                  errors?.username?.message && (
                    <Box display="flex" alignItems="center" sx={{ direction: 'ltr' }}>
                      <HBIcon name="exclamationTriangle" sx={{ color: 'error.main' }} size="small" />
                      <Typography variant="bodySmall" color="error.main">
                        {errors?.username?.message}
                      </Typography>
                    </Box>
                  )
                }
                inputProps={{
                  inputMode: 'numeric',
                  pattern: regexps.allowNumbers,
                  maxlength: 11,
                }}
                type="text"
                sx={{ pb: 4 }}
              />
            )}
          />

          <Typography variant="bodySmall" color="textAndIcon.darker">
            ورود شما به معنی پذیرش{' '}
            <Box component="span" sx={{ color: 'info.main' }} onClick={() => setOpenTerms(true)}>
              شرایط دارتیل و قوانین حریم خصوصی
            </Box>{' '}
            است.
          </Typography>

          <HBButton variant="primary" type="submit" disabled={isFetching || loading} loading={isFetching || loading}>
            مرحله بعد
          </HBButton>
        </Stack>
      </form>
      {openTerms && <TermsAndRules onClose={() => setOpenTerms(false)} />}
    </>
  )
}
