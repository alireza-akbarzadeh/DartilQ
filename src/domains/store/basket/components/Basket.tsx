import { Box, Divider, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { HBButton, HBIcon } from '@/core/components'
import { glyphy } from '@/core/utils'
import { useGetBasket } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { useBasket } from '@/shared/hooks/useBasket'

import { MinimumPrice } from './BasketMinimumPrice'

const BasketBottomSheet = dynamic(() => import('./BasketBottomSheet').then(mod => mod.BasketBottomSheet))

type PropsType = {
  storeId: string
}

const Basket = (props: PropsType) => {
  const { storeId } = props
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const { data } = useGetBasket({ query: { enabled: openBottomSheet } })
  const { basketData, removeAll, removeProductCompletely } = useBasket(storeId)
  const { count, currency, totalAmount } = { ...basketData }
  const { basketItems, orderPlacingResult } = { ...data?.data }
  const removingId = useRef('')
  const handleRemove = (id: string) => {
    setIsRemoving(true)
    removingId.current = id
  }

  const completeRemove = (status: boolean) => {
    if (status && !!removingId.current) {
      removeProductCompletely(removingId.current)
      removingId.current = ''
    } else if (status && !removingId.current) removeAll()
    setIsRemoving(false)
  }

  const handleClose = () => {
    replace('?')
    setTimeout(() => {
      setOpenBottomSheet(false)
      setIsRemoving(false)
    }, 500)
  }

  const handleRemoveAll = () => {
    setIsRemoving(true)
  }

  useEffect(() => {
    if (!count && openBottomSheet) setOpenBottomSheet(false)
    else if (searchParams.get('openBasket') === 'true') setOpenBottomSheet(true)
  }, [count, openBottomSheet])

  const showMinimumStatue = (orderPlacingResult?.minimumShoppingAmount ?? 0) > (totalAmount ?? 0)

  if (!count) return

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        zIndex: 1,
        ...(showMinimumStatue && {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          boxShadow: theme => `1px 1px 19px -3px ${theme.palette.border.darker}`,
        }),
      }}
    >
      {showMinimumStatue && (
        <MinimumPrice
          currencyTitle={currency}
          minimumShoppingAmount={orderPlacingResult?.minimumShoppingAmount ?? 0}
          totalAmount={totalAmount}
        />
      )}
      {!showMinimumStatue && (
        <HBButton
          onClick={() => setOpenBottomSheet(true)}
          fullWidth
          variant="primary"
          sx={{ bgcolor: 'primary.main', px: 4, py: 3, justifyContent: 'space-between', color: 'textAndIcon.lightest' }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="labelMedium">{count} کالا</Typography>
            <Divider orientation="vertical" flexItem sx={{ borderColor: 'textAndIcon.lightest' }} />
            <Stack direction="row" spacing={0.5}>
              <Typography variant="titleMedium">{totalAmount?.toLocaleString()}</Typography>
              <Typography variant="bodySmall">{glyphy(currency)}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="titleMedium">مشاهده سبد</Typography>
            <HBIcon name="arrowLeft" />
          </Stack>
        </HBButton>
      )}

      {openBottomSheet && (
        <BasketBottomSheet
          completeRemove={completeRemove}
          currency={currency ?? ''}
          isRemoving={isRemoving}
          items={basketItems ?? []}
          onClose={handleClose}
          onRemoveAll={handleRemoveAll}
          onRemove={handleRemove}
          totalAmount={totalAmount ?? 0}
        />
      )}
    </Box>
  )
}

export { Basket }
