'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'

import { glyphy } from '@/core/utils'
import { Basket } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type PriceDetailProps = {
  basketInfo: Basket | undefined
}

export const PriceDetail = (props: PriceDetailProps): JSX.Element => {
  const { basketInfo } = props
  return (
    <Stack sx={{ gap: 4, py: 4 }}>
      <Divider sx={{ color: 'border.lighter' }} />
      <Stack sx={{ gap: 2, px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
          <Box>
            <Typography variant="titleMedium">جزئیات قیمت</Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'textAndIcon.light' }}
        >
          <Typography variant="bodySmall">جمع سفارش</Typography>
          <Typography variant="bodySmall">
            {basketInfo?.totalOriginalAmount?.toLocaleString()} {glyphy(basketInfo?.currencyTitle)}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'textAndIcon.light' }}
        >
          <Typography variant="bodySmall">تخفیف کالاها</Typography>
          <Typography variant="bodySmall" color="success.dark">
            {basketInfo?.totalDiscount?.toLocaleString()} {glyphy(basketInfo?.currencyTitle)}
          </Typography>
        </Box>
        {!!basketInfo?.totalVoucherAmount && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'textAndIcon.light',
              }}
            >
              <Typography variant="bodySmall">کد تخفیف</Typography>
              <Typography variant="bodySmall" color="success.dark">
                {basketInfo?.totalVoucherAmount?.toLocaleString()} {glyphy(basketInfo?.currencyTitle)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'textAndIcon.light',
              }}
            >
              <Typography variant="bodySmall">سود شما از این خرید</Typography>
              <Typography variant="bodySmall" color="success.dark">
                {basketInfo?.totalDiscountWithVoucher?.toLocaleString()} {glyphy(basketInfo?.currencyTitle)}
              </Typography>
            </Box>
          </>
        )}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'textAndIcon.light' }}
        >
          <Typography variant="bodySmall">هزینه ارسال</Typography>
          {basketInfo?.totalShippingFee ? (
            <Typography variant="bodySmall" color="textAndIcon.light">
              {basketInfo?.totalShippingFee?.toLocaleString()} {glyphy(basketInfo?.currencyTitle)}
            </Typography>
          ) : (
            <Typography variant="bodySmall">رایگان</Typography>
          )}
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'textAndIcon.darker' }}
        >
          <Typography variant="bodyLarge">مبلغ قابل پرداخت</Typography>
          <Typography variant="bodyLarge">
            {basketInfo?.payableAmountWithVoucher?.toLocaleString()} {glyphy(basketInfo?.currencyTitle)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}
