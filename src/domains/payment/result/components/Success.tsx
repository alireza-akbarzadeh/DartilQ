'use client'

import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HBButton, HBNextImage } from '@/core/components'
import { PaymentBusinessEnum } from '@/shared/types/paymentType'

type SuccessProps = {
  paymentBusiness: PaymentBusinessEnum
}

export const Success = (props: SuccessProps) => {
  const { paymentBusiness } = props
  const router = useRouter()

  const buttonGenerator = (): JSX.Element | null => {
    switch (true) {
      case paymentBusiness === PaymentBusinessEnum.Order: {
        return (
          <HBButton variant="primary" sx={{ minWidth: 156 }}>
            پیگیری سفارش
          </HBButton>
        )
      }
      case paymentBusiness === PaymentBusinessEnum.Wallet: {
        return (
          <HBButton variant="primary" sx={{ minWidth: 156 }} onClick={() => router.push('/wallet')}>
            بازگشت به کیف پول
          </HBButton>
        )
      }

      default: {
        return null
      }
    }
  }

  return (
    <Stack sx={{ justifyContent: 'flex-end', height: '100%' }}>
      <Stack sx={{ gap: 8 }}>
        <Box sx={{ display: 'flex', px: 8 }}>
          <HBNextImage src="/assets/png/success.png" alt="success" quality={100} width={96} height={96} isLocal />
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '50%',
            minHeight: 227,
            backgroundImage: 'url(/assets/png/successBackground.png)',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Stack sx={{ display: 'flex', px: 8, gap: 2 }}>
            <Typography variant="titleMedium" color="textAndIcon.darker">
              پرداخت با موفقیت انجام شد!
            </Typography>
            <Typography variant="bodyMedium" color="textAndIcon.darker">
              جهت پیگیری سفارش خود به پروفایل خود مراجعه کنید.
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
        <Link href="/">
          <HBButton variant="secondary" sx={{ minWidth: 156 }}>
            بازگشت به خانه
          </HBButton>
        </Link>
        {buttonGenerator()}
      </Box>
    </Stack>
  )
}
