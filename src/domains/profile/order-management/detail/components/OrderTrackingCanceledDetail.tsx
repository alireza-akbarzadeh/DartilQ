import { Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBButton, HBIcon, HBLoader } from '@/core/components'
import { glyphy } from '@/core/utils'
import { useGetWebSaleOrdersOrderDetailOrderId } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { ConsignmentText } from '../../components/ConsignmentText'
import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { CancelTypeEnum, ConsignmentStatusEnum, OrderServiceSectionEnum, OrderStateCode } from '../../types'
import { CancelReason } from './CancelReason'
import { ConsignmentDescription } from './ConsignmentDescription'
import { ConsignmentDetailHeader } from './ConsignmentDetailHeader'
import { ConsignmentGroup } from './ConsignmentGroup'
import { OrderHistory } from './OrderHistory'
import { OrderTrackingDetailBodyHOC } from './OrderTrackingDetailBodyHOC'

type PropsType = {
  orderId: string
}

export const OrderTrackingCanceledDetail = (props: PropsType) => {
  const { orderId } = props
  const { push } = useRouter()
  const { formatMessage, formatDate } = useIntl()
  // Const { reShopOrder, reShopLoading } = useBasketManagement()
  const [openAccordion, setOpenAccordion] = useState<boolean>(false)

  const {
    isFetching,
    data: canceledDetailData,
    isError,
  } = useGetWebSaleOrdersOrderDetailOrderId(orderId, { Section: OrderServiceSectionEnum.Canceled })

  const order = useMemo(() => canceledDetailData?.data?.order, [canceledDetailData])

  /*
   * Const reShopping = (): void => {
   *   const productItems: ProductItems[] = []
   *   order?.bundleItems?.forEach(
   *     item =>
   *       item.orderItems?.forEach(
   *         orderItem => orderItem.productId && productItems.push({ productId: orderItem.productId }),
   *       ),
   *   )
   *   reShopOrder(order?.id, productItems)
   * }
   */

  if (isFetching)
    return (
      <OrderTrackingDetailWrappers spacing={6}>
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </OrderTrackingDetailWrappers>
    )
  if (!isFetching && !isError)
    return (
      <OrderTrackingDetailBodyHOC>
        <ConsignmentDetailHeader
          shoppingCartId={order?.id ?? ''}
          status={
            order?.stateCode === OrderStateCode.CanceledBySystem
              ? ConsignmentStatusEnum.SystemCancel
              : ConsignmentStatusEnum.Canceled
          }
          transactions={order?.transactions ?? []}
          onClick={() => push('/profile/order-tracking/canceled/')}
        >
          {order?.cancelType === CancelTypeEnum.Full && (
            <CancelReason
              cancelReason={order?.systemCancelReason || ''}
              cancelReasonId={order.cancelReason || ''}
              sx={{ border: 0, padding: 0, mb: 2 }}
              title={formatMessage({ ...OrderManagementMessages.cancelReason })}
            />
          )}
          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            direction={{ sm: 'row', xs: 'column' }}
            flexWrap="wrap"
            gap={6}
          >
            {order?.cancelDate && (
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.cancelDate })}
                value={formatDate(order?.cancelDate)}
              />
            )}

            {order?.number && (
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.orderCode })}
                value={order?.number}
              />
            )}
          </Stack>

          <Divider sx={{ borderColor: 'border.lighter' }} />

          <Stack
            alignItems={{ sm: 'center', xs: 'flex-start' }}
            direction={{ sm: 'row', xs: 'column' }}
            justifyContent="space-between"
          >
            <Stack
              alignItems={{ sm: 'center', xs: 'flex-start' }}
              direction={{ sm: 'row', xs: 'column' }}
              flexWrap="wrap"
              gap={6}
            >
              {order?.paymentInfo?.paymentMethodName && (
                <ConsignmentText
                  sx={{ gap: 2 }}
                  title={formatMessage({ ...OrderManagementMessages.paymentType })}
                  value={order?.paymentInfo?.paymentMethodName}
                />
              )}

              {order?.totalNetPrice && (
                <ConsignmentText
                  sx={{ gap: 2 }}
                  title={formatMessage({ ...OrderManagementMessages.canceledAmount })}
                  value={formatMessage(
                    { ...OrderManagementMessages.priceWithCurrency },
                    {
                      price: order?.totalNetPrice.toLocaleString(),
                      currency: glyphy(order?.currency),
                    },
                  )}
                />
              )}
            </Stack>
            <Stack>
              <HBButton
                sx={{
                  gap: 3,
                  color: 'secondary.dark',
                }}
                variant="link"
                onClick={() => setOpenAccordion(!openAccordion)}
              >
                <Typography variant="body2">
                  <FormattedMessage {...OrderManagementMessages.orderHistory} />
                </Typography>
                <HBIcon
                  sx={{
                    color: 'gray.700',
                    display: 'flex',
                    transform: openAccordion ? 'rotate(180deg)' : 'unset',
                  }}
                  name="angleDown"
                />
              </HBButton>
            </Stack>
          </Stack>

          <OrderHistory expanded={openAccordion} transactions={canceledDetailData?.data?.order?.transactions ?? []} />

          {/* <Stack alignItems="center" direction="row" justifyContent="flex-end" spacing={4}>
            <HBButton
              loading={reShopLoading}
              sx={theme => ({
                boxShadow: 'none',
                [theme.breakpoints.down('sm')]: {
                  flex: 1,
                },
              })}
              variant="contained"
              onClick={() => reShopping()}
            >
              <FormattedMessage {...OrderManagementMessages.buyAgainOrder} />
            </HBButton>
          </Stack> */}
        </ConsignmentDetailHeader>

        {canceledDetailData?.data?.order?.description && (
          <ConsignmentDescription description={canceledDetailData?.data?.order?.description || ''} />
        )}

        <OrderTrackingDetailWrappers sx={{ padding: 0 }}>
          {order?.bundleItems?.map((bundleItem, index) => (
            <ConsignmentGroup
              cancelType={order?.cancelType}
              cargoId={bundleItem?.bundleId}
              isCanceled
              key={bundleItem?.bundleId}
              name={formatMessage({ ...OrderManagementMessages.consignmentNumber }, { number: index + 1 })}
              products={bundleItem?.orderItems ?? []}
              shoppingCartId={orderId ?? ''}
            />
          ))}
        </OrderTrackingDetailWrappers>
      </OrderTrackingDetailBodyHOC>
    )
  return (
    <OrderTrackingDetailWrappers spacing={6}>
      <NotFound />
    </OrderTrackingDetailWrappers>
  )
}
