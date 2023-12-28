import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

import { glyphy } from '@/core/utils'

interface VendorPriceProps {
  price: number | string
  oldPrice?: number | string | null
  discount?: number | null
  currency: string | null
  justifyContent?: 'flex-end' | 'flex-start' | 'center'
  dontShowDiscount?: boolean
}

export const VendorPrice: FC<VendorPriceProps> = props => {
  const { oldPrice, price, currency, justifyContent, dontShowDiscount = false, discount } = props

  return (
    <Stack spacing={1}>
      {Boolean(oldPrice) && oldPrice !== price && (
        <Stack alignItems="center" direction="row" justifyContent={justifyContent ?? 'flex-end'} spacing={2}>
          <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }} variant="subtitle2">
            {Number(oldPrice)?.toLocaleString()}
          </Typography>
          {!dontShowDiscount && Boolean(discount) && (
            <Stack
              alignItems="center"
              justifyContent="center"
              p={1}
              sx={{ backgroundColor: 'error.main', borderRadius: 2 }}
            >
              <Typography color="common.white" variant="overline">
                {`${discount}٪-`}
              </Typography>
            </Stack>
          )}
        </Stack>
      )}

      <Stack alignItems="center" direction="row" justifyContent={justifyContent ?? 'flex-end'} spacing={0.5}>
        <Typography variant="subtitle1">{Number(price).toLocaleString()}</Typography>
        <Typography variant="subtitle2">{glyphy(currency ?? '')}</Typography>
      </Stack>
    </Stack>
  )
}
