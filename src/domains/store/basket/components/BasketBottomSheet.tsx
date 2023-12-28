import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { HBBottomSheet, HBButton, HBIcon } from '@/core/components'
import { glyphy } from '@/core/utils'

import { BasketItem } from './BasketItem'
import { RemoveCountDown } from './RemoveCountDown'

type PropsType = {
  onRemoveAll: VoidFunction
  onClose: VoidFunction
  isRemoving: boolean
  items: BasketItem[]
  onRemove: (id: string) => void
  totalAmount: number
  currency: string
  completeRemove: (status: boolean) => void
}

const BasketBottomSheet = (props: PropsType) => {
  const { onRemoveAll, onClose, isRemoving, items, onRemove, totalAmount, currency, completeRemove } = props
  return (
    <HBBottomSheet
      hideDivider
      header={
        <Stack sx={{ px: 2 }} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="bodyLarge">سبد خرید</Typography>
          <HBButton onClick={onRemoveAll} sx={{ gap: 2 }} variant="neutral2">
            <HBIcon size="xSmall" name="trashAlt" sx={{ color: 'textAndColor.darker' }} />
            حذف همه کالاها
          </HBButton>
        </Stack>
      }
      height="50%"
      open
      onClose={onClose}
    >
      <Stack sx={{ height: 'calc(100% - 68px)' }}>
        <Stack
          sx={{
            flex: 1,
            overflowY: 'auto',
            my: 2.5,
            overflowX: 'hidden',
            ...(isRemoving && { visibility: 'hidden' }),
          }}
        >
          {items?.map(item => <BasketItem key={item.id} {...item} onRemoved={onRemove} />)}
        </Stack>
        <Box sx={{ mt: 'auto', px: 4 }}>
          {!isRemoving && (
            <Link href="/checkout">
              <HBButton
                variant="primary"
                fullWidth
                sx={{ justifyContent: 'space-between', color: 'textAndIcon.lightest' }}
              >
                <Stack direction="row" spacing={0.5}>
                  <Typography variant="titleMedium">{totalAmount?.toLocaleString()}</Typography>
                  <Typography variant="labelMedium">{glyphy(currency)}</Typography>
                </Stack>
                <Stack alignItems="center" direction="row" sx={{ color: 'textAndIcon.lightest' }}>
                  <Typography variant="titleMedium">ادامه و پرداخت</Typography>
                  <HBIcon name="arrowLeft" />
                </Stack>
              </HBButton>
            </Link>
          )}
          {isRemoving && <RemoveCountDown countDownFinished={completeRemove} />}
        </Box>
      </Stack>
    </HBBottomSheet>
  )
}

export { BasketBottomSheet }
