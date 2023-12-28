import { Divider, Stack } from '@mui/material'
import { isValid } from 'date-fns'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { glyphy } from '@/core/utils'
import { CommerceOrder, CommerceOrderItem } from '@/services/sale-services/sale.schemas'

import { OrderManagementMessages } from '../../order-management.messages'
import { Bullet, OrderTrackingConsignmentBodyStyles } from '../../order-tracking.styles'
import { ConsignmentStatusEnum, OrderStateCode } from '../../types'
import { ConsignmentCard } from '../ConsignmentCard'
import { ConsignmentHeader } from '../ConsignmentHeader'
import { ConsignmentText } from '../ConsignmentText'
const ItemRender = ({ order }: { order: CommerceOrder }): JSX.Element => {
  const [cancelItems, setCancelItems] = useState<CommerceOrderItem[]>([])
  const { formatMessage, formatDate } = useIntl()
  const { push } = useRouter()

  useEffect(() => {
    let canceledItems: CommerceOrderItem[] = []
    order.bundleItems?.map(item => {
      canceledItems = [...canceledItems, ...(item.orderItems || [])]
      return null
    })
    setCancelItems(canceledItems)
  }, [])

  return (
    <OrderTrackingConsignmentBodyStyles spacing={6}>
      <ConsignmentHeader
        status={
          order.stateCode === OrderStateCode.CanceledBySystem
            ? ConsignmentStatusEnum.SystemCancel
            : ConsignmentStatusEnum.Canceled
        }
        onClick={() => push(`/profile/order-management/canceled/${order.id}`)}
      >
        <Stack direction="row" flexWrap="wrap" gap={6}>
          {isValid(new Date(order.cancelDate ?? '')) && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
              <Bullet type="error" />

              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.canceledDate })}
                value={formatDate(order.cancelDate || '')}
              />
            </Stack>
          )}

          {order.number && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
              <Bullet type="error" />
              <ConsignmentText
                sx={{ '& h6:last-child': { userSelect: 'text !important' }, gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.orderCode })}
                value={order.number ?? ''}
              />
            </Stack>
          )}

          {order.totalNetPrice && Boolean(order.totalNetPrice) && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
              <Bullet type="error" />
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.canceledAmount })}
                value={formatMessage(
                  { ...OrderManagementMessages.priceWithCurrency },
                  { price: order.totalNetPrice.toLocaleString(), currency: glyphy(order.currency) },
                )}
              />
            </Stack>
          )}
        </Stack>
      </ConsignmentHeader>
      <Divider sx={{ borderColor: 'border.lighter' }} />
      <ConsignmentCard
        hideCommentButton
        hideHeader
        products={cancelItems?.map(orderItem => ({
          count: orderItem.quantity,
          src: orderItem.productDefaultImage,
          productClassId: orderItem.productClassId,
          productId: orderItem.productId,
          productName: orderItem.productName,
          hsin: orderItem.hsin,
          slug: orderItem.slug,
        }))}
      />
    </OrderTrackingConsignmentBodyStyles>
  )
}

export const RenderCanceledList: FC<{ orders: CommerceOrder[] }> = ({ orders }) => {
  const renderItem = (): JSX.Element[] => orders.map(order => <ItemRender key={order.number} order={order} />)
  return <>{renderItem()}</>
}
