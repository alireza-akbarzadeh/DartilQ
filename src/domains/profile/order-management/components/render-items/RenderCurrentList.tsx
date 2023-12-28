import { Divider, Hidden, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { glyphy } from '@/core/utils'
import { CommerceOrder } from '@/services/sale-services/sale.schemas'

import { useGetOrderDeliveryDate } from '../../hooks/useGetOrderDeliveryDate'
import { OrderManagementMessages } from '../../order-management.messages'
import {
  Bullet,
  OrderTrackingConsignmentBodyStyles,
  OrderTrackingConsignmentHeaderSubText,
  OrderTrackingConsignmentHeaderTextWrapper,
} from '../../order-tracking.styles'
import { ConsignmentStatusEnum, OrderStateCode } from '../../types'
import { ConsignmentCard } from '../ConsignmentCard'
import { ConsignmentHeader } from '../ConsignmentHeader'

const ItemRender = ({ order }: { order: CommerceOrder }): JSX.Element => {
  const { formatDate, formatMessage } = useIntl()

  const { push } = useRouter()
  const { getDeliveryDate } = useGetOrderDeliveryDate()

  return (
    <OrderTrackingConsignmentBodyStyles key={order.number}>
      <Stack spacing={6}>
        <ConsignmentHeader
          status={ConsignmentStatusEnum.Paid}
          onClick={() => push(`/profile/order-management/current/${order.id}`)}
        >
          <Stack alignItems="center" direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
            <Bullet type="success" />
            <OrderTrackingConsignmentHeaderTextWrapper gap={2} variant="subtitle2">
              <FormattedMessage {...OrderManagementMessages.addressTitle} />
              <OrderTrackingConsignmentHeaderSubText color="text.primary" sx={{ userSelect: 'text' }} variant="body2">
                {order.deliveryAddress?.title}
              </OrderTrackingConsignmentHeaderSubText>
            </OrderTrackingConsignmentHeaderTextWrapper>
          </Stack>

          <Stack alignItems="center" direction="row" flexWrap="wrap" gap={4}>
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="success" />
              <OrderTrackingConsignmentHeaderTextWrapper color="grey.700" variant="subtitle2">
                <FormattedMessage {...OrderManagementMessages.orderDateTime} />
                <OrderTrackingConsignmentHeaderSubText color="text.primary" sx={{ userSelect: 'text' }} variant="body2">
                  {formatDate(order.createDate)}
                </OrderTrackingConsignmentHeaderSubText>
              </OrderTrackingConsignmentHeaderTextWrapper>
            </Stack>

            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="success" />
              <OrderTrackingConsignmentHeaderTextWrapper gap={2} variant="subtitle2">
                <FormattedMessage {...OrderManagementMessages.orderCode} />
                <OrderTrackingConsignmentHeaderSubText color="text.primary" sx={{ userSelect: 'text' }} variant="body2">
                  {order.number}
                </OrderTrackingConsignmentHeaderSubText>
              </OrderTrackingConsignmentHeaderTextWrapper>
            </Stack>

            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="success" />
              <OrderTrackingConsignmentHeaderTextWrapper gap={2} variant="subtitle2">
                <FormattedMessage {...OrderManagementMessages.orderAmount} />
                <OrderTrackingConsignmentHeaderSubText color="text.primary" variant="body2">
                  {order.totalNetPrice?.toLocaleString()} {glyphy(order.currency)}
                </OrderTrackingConsignmentHeaderSubText>
              </OrderTrackingConsignmentHeaderTextWrapper>
            </Stack>

            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
              <Bullet type="success" />
              <OrderTrackingConsignmentHeaderTextWrapper gap={2} variant="subtitle2">
                سود شما از خرید:
                <OrderTrackingConsignmentHeaderSubText color="text.primary" variant="body2">
                  {order.totalDiscount?.toLocaleString()} {glyphy(order.currency)}
                </OrderTrackingConsignmentHeaderSubText>
              </OrderTrackingConsignmentHeaderTextWrapper>
            </Stack>

            {order.bundleItems?.length === 1 && (
              <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
                <Bullet type="success" />
                <OrderTrackingConsignmentHeaderTextWrapper color="grey.700" variant="subtitle2">
                  <FormattedMessage {...OrderManagementMessages.deliveredDate} />
                  <OrderTrackingConsignmentHeaderSubText
                    color="text.primary"
                    sx={{ userSelect: 'text' }}
                    variant="body2"
                  >
                    {getDeliveryDate(order, order.bundleItems[0])}
                  </OrderTrackingConsignmentHeaderSubText>
                </OrderTrackingConsignmentHeaderTextWrapper>
              </Stack>
            )}
          </Stack>
        </ConsignmentHeader>
        <Hidden smDown>
          <Divider
            sx={{
              borderColor: 'grey.100',
            }}
          />
        </Hidden>
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
            {index === (order.bundleItems?.length ?? 0) - 1 &&
              order.stateCode === OrderStateCode.AwaitPayment &&
              Boolean(order.reservationLeftMinutes) &&
              index + 1 !== order.bundleItems?.length && (
                <Hidden smDown>
                  <Divider sx={{ borderColor: 'border.lightest' }} />
                </Hidden>
              )}
          </Fragment>
        ))}
      </Stack>
    </OrderTrackingConsignmentBodyStyles>
  )
}

export const RenderCurrentList = (props: { orders: CommerceOrder[] }): JSX.Element => {
  const { orders } = props
  const renderItem = (): JSX.Element[] => orders.map(order => <ItemRender key={order.number} order={order} />)
  return <>{renderItem()}</>
}
