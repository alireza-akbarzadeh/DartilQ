import { Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

import { HBButton, HBIcon } from '@/core/components'
import { NewStoreConfirmation } from '@/shared/components'
import { useBasket } from '@/shared/hooks/useBasket'

import { useProduct } from '../hooks'

const AddToBasketButton = () => {
  const { product, activeProduct } = useProduct()
  const {
    addToBasket,
    quantity: getQuantity,
    removeFromBasket,
    loading,
    showConfirm,
    setShowConfirm,
    storeBasketLatinName,
  } = useBasket(product?.storeId ?? '')

  const quantity = useMemo(() => {
    if (!activeProduct?.id) return
    return getQuantity(activeProduct?.id)
  }, [activeProduct?.id, getQuantity])

  const handleAdd = () => {
    if (activeProduct?.id) addToBasket(activeProduct?.id)
  }

  const handleMinus = () => {
    if (activeProduct?.id) removeFromBasket(activeProduct?.id)
  }

  return (
    <Box>
      {!quantity && (
        <HBButton loading={loading} onClick={handleAdd} variant="primary">
          افزودن به سبد خرید
        </HBButton>
      )}
      {!!quantity && (
        <HBButton
          loading={loading}
          sx={{ px: 0, cursor: 'default' }}
          onClick={event => event.stopPropagation()}
          variant="primary"
        >
          <Stack
            onClick={handleAdd}
            sx={{ p: 2, width: 48, cursor: 'pointer' }}
            justifyContent="center"
            alignItems="center"
          >
            <HBIcon name="plus" />
          </Stack>
          <Typography sx={{ width: 44 }} variant="bodyLarge" color="textAndIcon.lightest">
            {quantity}
          </Typography>
          <Stack
            onClick={handleMinus}
            sx={{ p: 2, width: 48, cursor: 'pointer' }}
            justifyContent="center"
            alignItems="center"
          >
            <HBIcon name={quantity <= (activeProduct?.multiplesOrder ?? 1) ? 'trashAlt' : 'minus'} />
          </Stack>
        </HBButton>
      )}

      {showConfirm && activeProduct?.id && product?.storeId && (
        <NewStoreConfirmation
          onClose={() => {
            setShowConfirm(false)
          }}
          addToBasket={() => addToBasket(activeProduct.id ?? '', true)}
          storeBasketLatinName={storeBasketLatinName}
        />
      )}
    </Box>
  )
}

export { AddToBasketButton }
