import { LinearProgress, linearProgressClasses, Stack, Typography } from '@mui/material'

import { glyphy } from '@/core/utils'
import { Basket, OrderPlacing } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type PropsType = Pick<Basket, 'totalAmount' | 'currencyTitle'> & Pick<OrderPlacing, 'minimumShoppingAmount'>
const MinimumPrice = (props: PropsType) => {
  const { minimumShoppingAmount, totalAmount, currencyTitle } = props
  return (
    <Stack sx={{ pb: 2 }} spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ color: 'error.dark' }}>
          <Typography variant="labelMedium">حداقل خرید:</Typography>
          <Typography variant="labelLarge">
            {minimumShoppingAmount?.toLocaleString()}
            <Typography sx={{ ml: 1 }} variant="labelMedium">
              {glyphy(currencyTitle)}
            </Typography>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'error.dark' }}>
          <Typography variant="labelMedium">باقی‌مانده:</Typography>
          <Typography variant="labelLarge">
            {((minimumShoppingAmount ?? 0) - (totalAmount ?? 0)).toLocaleString()}
            <Typography sx={{ ml: 1 }} variant="labelMedium">
              {glyphy(currencyTitle)}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
      <LinearProgress
        sx={{
          height: 6,
          borderRadius: 6,
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme => theme.palette.border.lighter,
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme => theme.palette.error.main,
          },
        }}
        variant="determinate"
        value={((totalAmount ?? 0) / (minimumShoppingAmount ?? 0)) * 100}
      />
    </Stack>
  )
}

export { MinimumPrice }
