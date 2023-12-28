'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { OtpInput } from 'reactjs-otp-input'

import { HBBottomSheet, HBButton, HBCountDownTimer, HBIcon, HBTextField } from '@/core/components'
import { Header } from '@/domains/profile/components/Header'
import {
  usePostAuthCustomerChangeUsernameValidateOTP,
  usePostAuthCustomerCreateOtpForChangeMobile,
  usePostAuthCustomerSetUsernameValidateOTP,
} from '@/services/ids-services/ids'
import { useGetUserIndividual } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { regexps } from '@/shared/constants'

interface PhoneNumberProps {
  onClose: (isRefetch?: boolean) => void
}

export const PhoneNumber = (props: PhoneNumberProps) => {
  const { onClose } = props
  const inputRef = useRef<HTMLDivElement>()
  const { update, data: userSession } = useSession()
  const { data } = useGetUserIndividual({
    query: { staleTime: 50000 },
  })
  const {
    mutateAsync: sendOtpMutate,
    data: sendOtpResponse,
    isPending: isPendingSendOtp,
  } = usePostAuthCustomerCreateOtpForChangeMobile()
  const {
    mutateAsync: changeUserNameMutate,
    isPending: isPendingChangeUserName,
    data: changeUserNameResponse,
  } = usePostAuthCustomerChangeUsernameValidateOTP()
  const { mutateAsync: setUserNameMutate, isPending: isPendingSetUserName } =
    usePostAuthCustomerSetUsernameValidateOTP()
  const [phoneNumber, setPhoneNumber] = useState(data?.data?.mobileNo)
  const [otp, setOtp] = useState('')
  const [otpState, setOtpState] = useState('current')
  const [openOtpForm, setOpenOtpForm] = useState(false)
  const [error, setError] = useState('')

  const handleSendOtp = () => {
    sendOtpMutate({
      data: {
        user: otpState === 'current' ? data?.data?.mobileNo : phoneNumber,
      },
    }).then(response => {
      if (response.otpToken) {
        setOpenOtpForm(true)
      }
    })
  }

  const handleResendOTP = () => {
    sendOtpMutate({
      data: {
        user: otpState === 'current' ? data?.data?.mobileNo : phoneNumber,
      },
    })
  }

  const handleValidOtp = () => {
    changeUserNameMutate({
      data: { newMobileNo: phoneNumber, otpCode: otp, otpToken: sendOtpResponse?.otpToken },
    }).then(response => {
      if (response.isValid) {
        setOtpState('new')
        setOtp('')
        setError('')
        inputRef.current?.getElementsByTagName('input')?.item(0)?.focus()
      } else if (response.error) setError(response.error)
    })
  }

  const handleSetUserName = () => {
    setUserNameMutate({
      data: {
        mobile: data?.data?.mobileNo,
        newMobileNo: phoneNumber,
        newOTPToken: changeUserNameResponse?.otpToken,
        otpCode: otp,
        otpToken: sendOtpResponse?.otpToken,
      },
    }).then(response => {
      if (response?.success) {
        update({ ...userSession?.user, userName: phoneNumber })
        onClose(true)
      } else if (response.error) setError(response.error)
    })
  }

  useEffect(() => {
    if (otp.length === 6 && otpState === 'current') handleValidOtp()
    if (otp.length === 6 && otpState === 'new') handleSetUserName()
  }, [otp])

  return (
    <>
      <HBBottomSheet onClose={onClose} open fullScreen hidePuller>
        <Stack justifyContent="space-between" height="100%">
          <Box>
            <Header title="شماره موبایل" onClick={onClose} />
            <Stack spacing={4} p={4}>
              <HBTextField
                name="firstName"
                sx={{ pb: 5 }}
                label="شماره موبایل"
                value={phoneNumber}
                onChange={event => setPhoneNumber(event?.target?.value)}
                autoFocus
                dir="ltr"
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
                inputProps={{
                  inputMode: 'numeric',
                  pattern: regexps.allowNumbers,
                  maxlength: 11,
                }}
                type="text"
                helperText={
                  <Box display="flex" alignItems="center" sx={{ direction: 'ltr' }}>
                    <HBIcon name="check" sx={{ color: 'success.main' }} />
                    <Typography variant="bodySmall" color="success.main" ml={1}>
                      {data?.data?.mobileNoStateTitle}
                    </Typography>
                  </Box>
                }
              />
              <Typography variant="bodySmall" color="textAndIcon.light" width="100%" textAlign="center">
                در صورت ویرایش، باید شماره جدید را مجددا تایید کنید.
              </Typography>
            </Stack>
          </Box>
          <Box mx={4}>
            <HBButton
              variant="primary"
              fullWidth
              onClick={() => handleSendOtp()}
              disabled={isPendingSendOtp || phoneNumber === data?.data?.mobileNo || phoneNumber?.length !== 11}
              loading={isPendingSendOtp}
            >
              دریافت کد تایید
            </HBButton>
          </Box>
        </Stack>
      </HBBottomSheet>
      {openOtpForm && (
        <HBBottomSheet onClose={() => setOpenOtpForm(false)} open hidePuller>
          <Box p={4}>
            {otpState === 'new' && (
              <Typography component="div" variant="bodyLarge" color="textAndIcon.darker" mb={4}>
                تایید شماره همراه جدید
              </Typography>
            )}
            <Typography variant="bodyMedium" color="textAndIcon.darker">
              کد تایید ارسال‌شده به شماره {otpState === 'current' ? data?.data?.mobileNo : phoneNumber} را وارد کنید.
            </Typography>
            <Box
              ref={inputRef}
              mb={4}
              mt={6}
              sx={theme => ({
                '& >  div > div > input': {
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
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<Box mx={1} />}
                shouldAutoFocus
                isInputNum
                containerStyle={{ direction: 'ltr', justifyContent: 'space-around' }}
                inputStyle={{
                  width: 48,
                  height: 48,
                  fontSize: 16,
                }}
              />
            </Box>
            {error && (
              <Box display="flex" alignItems="center">
                <HBIcon name="exclamationTriangle" size="small" sx={{ color: 'error.main' }} />
                <Typography variant="bodySmall" color="error.main" ml={1}>
                  {error}
                </Typography>
              </Box>
            )}
            <Typography color="textAndIcon.darker" variant="bodySmall" display="flex" justifyContent="flex-end">
              <HBCountDownTimer
                extraTimerText={'مانده تا دریافت مجدد کد'}
                linkText={'ارسال مجدد کد'}
                maximumShowed="minute"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& h5,& p': theme => ({
                    ...theme.typography.bodySmall,
                    marginRight: theme.spacing(0),
                  }),
                }}
                targetDate={new Date(sendOtpResponse?.expireDate || '').getTime()}
                dateNow={new Date(sendOtpResponse?.dateNow || '').getTime()}
                onClick={handleResendOTP}
              />
            </Typography>
            <Stack direction="row" spacing={3} pt={2} mt={3}>
              <HBButton sx={{ flex: 1 }} variant="secondary" onClick={() => setOpenOtpForm(false)}>
                ویرایش شماره
              </HBButton>
              <HBButton
                variant="primary"
                sx={{ flex: 1 }}
                type="submit"
                disabled={isPendingChangeUserName || isPendingSetUserName || otp.length < 6}
                loading={isPendingChangeUserName || isPendingSetUserName}
                onClick={handleValidOtp}
              >
                ادامه
              </HBButton>
            </Stack>
          </Box>
        </HBBottomSheet>
      )}
    </>
  )
}
