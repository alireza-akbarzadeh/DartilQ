import { Divider, Hidden, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { glyphy } from '@/core/utils'
import { CommerceOrder } from '@/services/sale-services/sale.schemas'

import { OrderManagementMessages } from '../../order-management.messages'
import { Bullet, OrderTrackingConsignmentBodyStyles } from '../../order-tracking.styles'
import { ConsignmentStatusEnum } from '../../types'
import { ConsignmentCard } from '../ConsignmentCard'
import { ConsignmentHeader } from '../ConsignmentHeader'
import { ConsignmentText } from '../ConsignmentText'
const ItemRender = ({ order }: { order: CommerceOrder }): JSX.Element => {
  const { formatMessage } = useIntl()
  const { push } = useRouter()

  return (
    <OrderTrackingConsignmentBodyStyles spacing={6}>
      <ConsignmentHeader
        key={order.id}
        status={ConsignmentStatusEnum.Delivered}
        onClick={() => push(`/profile/order-management/delivered/${order.id}`)}
      >
        {order.deliveryAddress?.title && (
          <Stack alignItems="center" direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
            <Bullet type="info" />
            <ConsignmentText
              sx={{ gap: 2 }}
              title={formatMessage({ ...OrderManagementMessages.addressTitle })}
              value={order.deliveryAddress.title}
            />
          </Stack>
        )}

        <Stack direction="row" flexWrap="wrap" gap={6}>
          {order.number && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="info" />
              <ConsignmentText
                sx={{ '& h6:last-child': { userSelect: 'text !important' }, gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.orderCode })}
                value={order.number}
              />
            </Stack>
          )}
          {order.totalNetPrice && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="info" />
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.orderAmount })}
                value={formatMessage(
                  { ...OrderManagementMessages.priceWithCurrency },
                  {
                    price: order.totalNetPrice.toLocaleString(),
                    currency: glyphy(order.currency),
                  },
                )}
              />
            </Stack>
          )}

          {Number(order.totalDiscount) !== 0 && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="info" />
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.discount })}
                value={formatMessage(
                  { ...OrderManagementMessages.priceWithCurrency },
                  {
                    price: order.totalDiscount?.toLocaleString(),
                    currency: glyphy(order.currency),
                  },
                )}
              />
            </Stack>
          )}
          {order.paymentInfo?.paymentMethodName && (
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="info" />
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.paymentType })}
                value={order.paymentInfo.paymentMethodName}
              />
            </Stack>
          )}
        </Stack>
      </ConsignmentHeader>
      <Divider sx={{ borderColor: 'border.lightest' }} />{' '}
      {order.bundleItems?.map((bundleItem, index) => (
        <Fragment key={bundleItem.bundleId}>
          <ConsignmentCard
            hideCommentButton
            name={formatMessage({ ...OrderManagementMessages.consignmentNumber }, { number: index + 1 })}
            products={
              bundleItem.orderItems
                ? bundleItem.orderItems?.map(orderItem => ({
                    count: orderItem.quantity,
                    src: orderItem.productDefaultImage,
                    productClassId: orderItem.productClassId,
                    productId: orderItem.productId,
                    productName: orderItem.productName,
                    hsin: orderItem.hsin,
                    slug: orderItem.slug,
                  }))
                : []
            }
          />
          {(index !== -1 || index === (order.bundleItems?.length ?? 0) - 1) && (
            <Hidden smDown>
              <Divider sx={{ borderColor: 'border.lightest' }} />
            </Hidden>
          )}
        </Fragment>
      ))}
    </OrderTrackingConsignmentBodyStyles>
  )
}

export const RenderDeliveredList = (props: { orders: CommerceOrder[] }): JSX.Element => {
  const { orders } = props
  const renderItem = (): JSX.Element[] => orders.map(order => <ItemRender key={order.number} order={order} />)
  return <>{renderItem()}</>
}
