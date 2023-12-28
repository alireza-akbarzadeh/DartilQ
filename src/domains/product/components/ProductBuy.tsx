import { Stack, Typography } from '@mui/material'

import { glyphy } from '@/core/utils'

import { useProduct } from '../hooks'
import { AddToBasketButton } from './AddToBasketButton'

const ProductBuy = () => {
  const { activeProduct } = useProduct()
  const { finalPrice, currency, originalPrice, discount, availability } = { ...activeProduct }

  return (
    <Stack sx={{ mt: 'auto', py: 2, px: 4 }} direction="row" alignItems="center" justifyContent="space-between">
      {availability && (
        <>
          <AddToBasketButton />
          <Stack alignItems="flex-end" spacing={1}>
            <Typography variant={!discount ? 'titleMedium' : 'labelLarge'} color="textAndIcon.darker">
              {finalPrice?.toLocaleString()}
              {!discount && glyphy(currency)}
              {!!discount && (
                <Typography sx={{ ml: 0.25 }} variant="caption">
                  {glyphy(currency)}
                </Typography>
              )}
            </Typography>
            {finalPrice !== originalPrice && (
              <Stack spacing={1} direction="row" alignItems="flex-end" justifyContent="flex-start">
                <Typography
                  variant="smallOverline"
                  color="textAndIcon.light"
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      bgcolor: 'textAndIcon.light',
                      transform: 'rotate(-11deg)',
                    },
                  }}
                >
                  {originalPrice}
                </Typography>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ bgcolor: 'primary.main', borderRadius: 1, minWidth: 20, minHeight: 16 }}
                >
                  <Typography variant="labelSmall" sx={{ color: 'background.lightest' }}>
                    {discount}%
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </>
      )}
      {!availability && (
        <Typography
          sx={{ height: 48, display: 'flex', alignItems: 'center' }}
          variant="bodyMedium"
          color="textAndIcon.light"
        >
          ناموجود!
        </Typography>
      )}
    </Stack>
  )
}

export { ProductBuy }
