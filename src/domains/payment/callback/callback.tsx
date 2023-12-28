'use client'

import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { HBButton, HBLoader } from '@/core/components'
import { useWindowHeight } from '@/core/hooks'
import { usePostWebPaymentPaymentCallback } from '@/services/payment-services/payment'
import { PaySourceEnum } from '@/shared/types/paymentType'

type CallbackProps = {
  providerType: string
  payResult?: string
}

export const Callback = (props: CallbackProps) => {
  const { providerType, payResult } = props
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { mutateAsync: paymentCallback } = usePostWebPaymentPaymentCallback()
  const windowHeight = useWindowHeight()

  useEffect(() => {
    paymentCallback({
      data: {
        paymentProviderId: providerType,
        jsonResult: payResult,
        paySource: PaySourceEnum.WebCommerce,
        forMobile: false,
      },
    })
      .then(response => {
        if (response.success) {
          router.replace(
            `/payment/result/${response.data?.paymentStatus}?paymentBusiness=${response.data?.paymentBusiness}`,
          )
        }
      })
      .catch(error => {
        setErrorMessage(`خطا در دریافت اطلاعات! ${error?.data?.messages?.[0]?.message}`)
      })
  }, [])

  return errorMessage ? (
    <Stack alignItems="center" p={4} spacing={4}>
      <Typography color="error.main">{errorMessage}</Typography>
      <Link href="/">
        <HBButton variant="secondary">بازگشت به صفحه اصلی</HBButton>
      </Link>
    </Stack>
  ) : (
    <Stack alignItems="center" justifyContent="center" height={windowHeight ?? 0}>
      <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
    </Stack>
  )
}
