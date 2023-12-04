'use client'
import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBTextFieldController } from '@/core/components/HBTextField/HBTextFieldController'
import { HBButton, HBIcon } from '@/core/components/index'
import { useGetAuthCustomerGetLoginInfo, useGetAuthCustomerGetRegisterInfo } from '@/services/ids-services/ids'
import { useGetUserMobileRoles } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

import { authMessages } from '../auth.messages'
import { DefaultLoginType, mobileRegex, StepEnum, TypeEnum } from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'
import { useHandleOtp } from '../hooks/useHandleOtp'
import { TermsAndRules } from './TermsAndRules'

export const CheckExistPhoneNumber = () => {
  const { updateStep, updateSetting, updateType } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)
  const { formatMessage } = useIntl()

  const {
    formState: { isValid, errors },
    setError,
    getValues,
    handleSubmit,
  } = useFormContext<{ username: string }>()
  const { handleCreateLoginOtp, handleCreateRegisterOtp } = useHandleOtp(getValues('username'))

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
    const roleResponse = await getUserRole()
    try {
      if (roleResponse?.data?.success && roleResponse?.data?.data?.flow) {
        const [isAdmin, isCustomer] = roleResponse.data.data.flow
        if (Number(isAdmin) + Number(isCustomer) > 0) {
          const loginResponse = await getLoginInfo()
          if (loginResponse.data?.businessLoginFlow) {
            if (loginResponse.data.defaultLoginType?.toLocaleLowerCase() === DefaultLoginType.Otp) {
              await handleCreateLoginOtp()
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
            const otpRegisterRes = await handleCreateRegisterOtp()
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
          message: roleResponse.data?.messages?.[0]?.message ?? formatMessage(authMessages.faultMessage),
        })
      }
    } catch (err) {
      setError('username', {
        message: err?.toString().replace('Error:', '') || '',
      })
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCheck)}>
        <Stack spacing={4}>
          <Typography variant="bodyMedium" color="textAndIcon.darker">
            <FormattedMessage {...authMessages.enterPhoneNumber} />
          </Typography>

          <HBTextFieldController
            name="username"
            dir="ltr"
            type="number"
            autoFocus
            defaultValue=""
            label={<FormattedMessage {...authMessages.phoneNumber} />}
            rules={{
              pattern: {
                message: formatMessage(authMessages.phoneNumberErrorMessage),
                value: new RegExp(mobileRegex),
              },
              required: {
                value: true,
                message: '',
              },
            }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 4,
            }}
            error={Boolean(errors?.username?.message?.length)}
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
          />
          <Typography variant="bodySmall" color="textAndIcon.darker">
            <FormattedMessage
              {...authMessages.termsAndPrivacyRules}
              values={{
                b: chunks => (
                  <Box component="span" sx={{ color: 'info.main' }} onClick={() => setOpenTerms(true)}>
                    {chunks}
                  </Box>
                ),
              }}
            />
          </Typography>

          <HBButton
            variant="primary"
            type="submit"
            disabled={!isValid || isFetching || loading}
            loading={isFetching || loading}
          >
            <FormattedMessage {...authMessages.confirmAndReceiveTheCode} />
          </HBButton>
        </Stack>
      </form>
      {openTerms && <TermsAndRules onClose={() => setOpenTerms(false)} />}
    </>
  )
}
