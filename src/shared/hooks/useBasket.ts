import { useSession } from 'next-auth/react'
import { useCallback, useMemo, useState } from 'react'

import { useBroadcastChannel } from '@/core/hooks'
import {
  useGetBasket,
  usePostBasketDecrease,
  usePostBasketIncrease,
} from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import {
  useDeleteWebSaleBasketItems as useDeleteAll,
  useDeleteWebSaleBasketItemsProductId as useRemoveCompletely,
} from '@/services/sale-services/sale'

import { SaleCenterEnum } from '../types/enums'

export const useBasket = (storeId: string) => {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { data: userSession } = useSession()
  const { mutateAsync: addToBasketMutate } = usePostBasketIncrease()
  const { mutateAsync: removeFromBasketMutate } = usePostBasketDecrease()
  const { mutateAsync: removeAllMutate } = useDeleteAll()
  const { mutateAsync: removeCompletely } = useRemoveCompletely()
  const { data, refetch } = useGetBasket({ query: { staleTime: 500000 } })

  const handleMessages = () => {
    if (typeof window !== 'undefined' && document.visibilityState === 'hidden') {
      refetch()
    }
  }

  const { broadcastMessage } = useBroadcastChannel<void>({ channelName: 'basket', handleMessage: handleMessages })

  const addToBasket = useCallback(
    (productId: string, allowRemove: boolean = false) => {
      if (data?.data?.storeId !== storeId && !showConfirm && !!Number(data?.data?.storeId)) setShowConfirm(true)
      else {
        if (showConfirm) setShowConfirm(false)
        setLoading(true)
        addToBasketMutate({
          data: {
            addressId: userSession?.user?.address?.id,
            allowRemoveOtherBasket: allowRemove,
            productId,
          },
        })
          .then(async res => {
            if (res?.success) {
              broadcastMessage()
              await refetch()
            }
          })
          .finally(() => setLoading(false))
      }
    },
    [data, showConfirm],
  )

  const removeFromBasket = useCallback((productId: string) => {
    setLoading(true)
    removeFromBasketMutate({
      data: { productId },
    })
      .then(async res => {
        if (res?.success) {
          broadcastMessage()
          await refetch()
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const removeProductCompletely = useCallback((productId: string) => {
    setLoading(true)
    removeCompletely({ productId, params: { saleCenter: SaleCenterEnum.QCommerce } })
      .then(async res => {
        if (res.success) {
          broadcastMessage()
          await refetch()
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const removeAll = useCallback(() => {
    setLoading(true)
    removeAllMutate({ params: { saleCenter: SaleCenterEnum.QCommerce } })
      .then(async res => {
        if (res.messages) {
          broadcastMessage()
          await refetch()
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const getQuantity = useCallback(
    (productId: string) => data?.data?.basketItems?.find(item => item.productId === productId)?.quantity,
    [data?.data?.basketItems],
  )

  const basketData = useMemo(() => {
    if (storeId !== data?.data?.storeId) return undefined
    return {
      count: data?.data?.itemCount,
      totalAmount: data?.data?.totalAmount,
      currency: data?.data?.currencyTitle,
    }
  }, [storeId, data?.data])

  return {
    addToBasket,
    removeFromBasket,
    loading,
    showConfirm,
    setShowConfirm,
    quantity: getQuantity,
    basketData,
    removeAll,
    storeBasketLatinName: data?.data?.latinName,
    removeProductCompletely,
  }
}
