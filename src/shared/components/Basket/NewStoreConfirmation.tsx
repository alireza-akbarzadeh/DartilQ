import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBBottomSheet, HBButton } from '@/core/components'
type PropsType = {
  onClose: VoidFunction
  addToBasket: VoidFunction
  storeBasketLatinName?: string | null
}
const NewStoreConfirmation = (props: PropsType) => {
  const { onClose, addToBasket, storeBasketLatinName } = props
  const { push } = useRouter()
  return (
    <HBBottomSheet open onClose={onClose}>
      <Stack px={8} spacing={7}>
        <Typography variant="titleMedium" color="textAndIcon.dark">
          سفارش جدید
        </Typography>
        <Typography variant="bodyMedium" color="textAndIcon.dark">
          شما در حال سفارش از فروشگاه جدیدی هستید. با این ثبت سفارش سبد قبلی شما حذف خواهد شد. آیا مطمئنید؟
        </Typography>
        <Stack direction="row" spacing={6} justifyContent="space-between">
          <HBButton
            fullWidth
            variant="secondary"
            onClick={() => push(`/store/${storeBasketLatinName}?openBasket=true`)}
          >
            ادامه خرید قبلی
          </HBButton>
          <HBButton fullWidth variant="primary" onClick={addToBasket}>
            بله ادامه میدم
          </HBButton>
        </Stack>
      </Stack>
    </HBBottomSheet>
  )
}

export { NewStoreConfirmation }
