/* eslint-disable no-nested-ternary */
import { Divider, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'

import { glyphy } from '@/core/utils'
import { CommerceOrderItem, GetRefundRequestsQueryResult } from '@/services/sale-services/sale.schemas'

import { OrderManagementMessages } from '../../order-management.messages'
import { Bullet, OrderTrackingConsignmentBodyStyles } from '../../order-tracking.styles'
import { ConsignmentStatusEnum, OrderRefundStates } from '../../types'
import { ConsignmentCard } from '../ConsignmentCard'
import { ConsignmentHeader } from '../ConsignmentHeader'
import { ConsignmentText } from '../ConsignmentText'
const ItemRender = ({ order }: { order: GetRefundRequestsQueryResult }): JSX.Element => {
  const { formatMessage } = useIntl()
  const { push } = useRouter()

  const items = order.bundleItems?.map<CommerceOrderItem>(item => ({
    quantity: item.quantity,
    productDefaultImage: item.productImage,
    productId: item.productId,
    productName: item.productName,
    hsin: item.hsin,
    slug: item.slug,
  }))

  return (
    <OrderTrackingConsignmentBodyStyles spacing={6}>
      <ConsignmentHeader
        isRefund
        key={order.id}
        status={
          order.refundRequestStateCode === OrderRefundStates.Confirmed
            ? ConsignmentStatusEnum.Returned
            : order.refundRequestStateCode === OrderRefundStates.Requested
              ? ConsignmentStatusEnum.PendingReturned
              : ConsignmentStatusEnum.Rejected
        }
        onClick={() => push(`/profile/order-management/returned/${order.id}`)}
      >
        <Stack direction="row" flexWrap="wrap" gap={6}>
          {order.number && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="secondary" />
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.refundCode })}
                value={order.number}
              />
            </Stack>
          )}

          {order.totalFinalPrice && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="secondary" />
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.refundPrice })}
                value={formatMessage(
                  { ...OrderManagementMessages.priceWithCurrency },
                  {
                    price: order.totalFinalPrice.toLocaleString(),
                    currency: glyphy(order.currency),
                  },
                )}
              />
            </Stack>
          )}
        </Stack>
      </ConsignmentHeader>
      <Divider sx={{ borderColor: 'border.lightest' }} />
      <ConsignmentCard
        hideCommentButton
        hideHeader
        products={
          items?.map(orderItem => ({
            count: orderItem.quantity,
            src: orderItem.productDefaultImage,
            productClassId: orderItem.productClassId,
            productId: orderItem.productId,
            productName: orderItem.productName,
            hsin: orderItem.hsin,
            slug: orderItem.slug,
          })) ?? []
        }
      />
    </OrderTrackingConsignmentBodyStyles>
  )
}

export const RenderRefundedList = (props: { orders: GetRefundRequestsQueryResult[] }): JSX.Element => {
  const { orders } = props

  const renderItem = (): JSX.Element[] => orders.map(order => <ItemRender key={order.number} order={order} />)
  return <>{renderItem()}</>
}
