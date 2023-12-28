/* eslint-disable complexity */

import { Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBButton, HBIcon, HBLoader } from '@/core/components'
import { fontWeights } from '@/core/providers/material/theme'
import { glyphy } from '@/core/utils'
import { useGetWebSaleOrdersOrderDetailOrderId } from '@/services/sale-services/sale'
import { CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'
import { NotFound } from '@/shared/components'

import { ConsignmentText } from '../../components/ConsignmentText'
import { useGetOrderDeliveryDate } from '../../hooks/useGetOrderDeliveryDate'
import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { ConsignmentStatusEnum, OrderServiceSectionEnum } from '../../types'
import { RefundProvider } from '../context/RefundContext'
import { ConsignmentDescription } from './ConsignmentDescription'
import { ConsignmentDetailAddress } from './ConsignmentDetailAddress'
import { ConsignmentDetailHeader } from './ConsignmentDetailHeader'
import { ConsignmentGroup } from './ConsignmentGroup'
import { OrderHistory } from './OrderHistory'
import { OrderTrackingDetailBodyHOC } from './OrderTrackingDetailBodyHOC'
import { Refund } from './Refund'
import { RefundedList } from './RefundedList'

type PropsType = {
  orderId: string
}
export const OrderTrackingDeliveredDetail = (props: PropsType) => {
  const { orderId } = props
  const { push } = useRouter()
  const [openAccordion, setOpenAccordion] = useState<boolean>(false)
  const [variant, setVariant] = useState<'detail' | 'refund-order' | 'refund-order-success' | 'refund-consignment'>(
    'detail',
  )
  const { formatMessage, formatDate } = useIntl()
  const { getDeliveryDate } = useGetOrderDeliveryDate()

  const {
    isFetching,
    data: deliveredDetailData,
    isError,
  } = useGetWebSaleOrdersOrderDetailOrderId(orderId, { Section: OrderServiceSectionEnum.Delivered })
  const [refundableProducts, setRefundableProducts] = useState<CommerceDetailOrderItem[]>([])

  /*
   * Const { exportToFile } = useExport({
   *   url: `${process.env.NEXT_PUBLIC_GATEWAY}/Web/Sale/Order/${deliveredDetailData?.data?.order?.id}/invoice/pdf`,
   *   method: 'get',
   *   accessToken: data?.accessToken,
   * })
   */

  const order = useMemo(() => deliveredDetailData?.data?.order, [deliveredDetailData])

  // Const { reShopOrder, reShopLoading } = useBasketManagement()

  /*
   * Const reShopping = (): void => {
   *   const productItems: ProductItems[] = []
   *   deliveredDetailData?.data?.order?.bundleItems?.forEach(
   *     item =>
   *       item.orderItems?.forEach(
   *         orderItem => orderItem.productId && productItems.push({ productId: orderItem.productId }),
   *       ),
   *   )
   *   reShopOrder(deliveredDetailData?.data?.order?.id, productItems)
   * }
   */

  const onRefund = (type: 'consignment' | 'order', consignmentProduct?: CommerceDetailOrderItem[]): void => {
    if (type === 'consignment') {
      setRefundableProducts(consignmentProduct || [])
      setVariant('refund-consignment')
    } else if (type === 'order') {
      if (deliveredDetailData?.data?.order?.bundleItems) {
        const temporaryProducts = deliveredDetailData?.data.order?.bundleItems?.flatMap(
          bundleItem => bundleItem?.orderItems ?? [],
        )
        setRefundableProducts([...temporaryProducts])
      }
      setVariant('refund-order')
    }
  }

  if (isFetching)
    return (
      <OrderTrackingDetailWrappers spacing={6}>
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </OrderTrackingDetailWrappers>
    )
  if (!isFetching && !isError)
    return (
      <OrderTrackingDetailBodyHOC>
        {variant === 'detail' ? (
          <>
            <ConsignmentDetailHeader
              shoppingCartId={order?.id ?? ''}
              status={ConsignmentStatusEnum.Delivered}
              transactions={order?.transactions ?? []}
              onClick={() => push('/profile/order-tracking/delivered')}
            >
              <Stack alignItems={{ xs: 'flex-start' }} direction={{ xs: 'column' }} flexWrap="wrap" gap={6}>
                {order?.createDate && (
                  <ConsignmentText
                    sx={{ gap: 2 }}
                    title={formatMessage({ ...OrderManagementMessages.orderDateTime })}
                    value={formatDate(order?.createDate)}
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
                spacing={4}
                alignItems={{ xs: 'flex-start' }}
                direction={{ xs: 'column' }}
                justifyContent="space-between"
              >
                <Stack alignItems="center" direction="row" flexWrap="wrap" gap={6}>
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
                      title={formatMessage({ ...OrderManagementMessages.orderAmount })}
                      value={`${order?.totalNetPrice?.toLocaleString()} ${glyphy(order?.currency)}`}
                    />
                  )}
                  {order?.voucherAmount ? (
                    <Typography sx={{ color: 'success.main', width: '100%' }} variant="subtitle2">
                      <FormattedMessage
                        {...OrderManagementMessages.discountCode}
                        values={{
                          code: order?.voucherAmount.toLocaleString(),
                          currency: glyphy(order.currency),
                        }}
                      />
                    </Typography>
                  ) : null}
                </Stack>

                <HBButton
                  sx={{
                    gap: 3,
                    color: 'secondary.dark',
                    height: 24,
                    p: 0,
                  }}
                  variant="link"
                  onClick={() => setOpenAccordion(!openAccordion)}
                >
                  <Typography fontWeight={fontWeights.fontWeightRegular} variant="body2">
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

              <OrderHistory
                expanded={openAccordion}
                transactions={deliveredDetailData?.data?.order?.transactions ?? []}
              />

              {/* <Stack alignItems="center" direction="row" justifyContent={{ sm: 'flex-end', xs: 'center' }} spacing={4}> */}
              {order?.canRefund && (
                <HBButton color="error" variant="secondary" onClick={() => onRefund('order')}>
                  <FormattedMessage {...OrderManagementMessages.refundOrder} />
                </HBButton>
              )}
              {/* {order?.stateCode === OrderStateCode.DeliveredOrder && (
                  <HBButton variant="secondary" onClick={() => exportToFile()}>
                    <FormattedMessage {...OrderManagementMessages.seeOrderFactor} />
                  </HBButton>
                )} */}

              {/* <HBButton loading={reShopLoading} variant="contained" onClick={() => reShopping()}>
                  <Typography variant="subtitle2">
                    <FormattedMessage {...OrderManagementMessages.buyAgain} />
                  </Typography>
                </HBButton> */}
              {/* </Stack> */}
            </ConsignmentDetailHeader>
            <ConsignmentDetailAddress
              address={order?.deliveryAddress?.streetLine}
              district={order?.deliveryAddress?.district}
              lat={order?.deliveryAddress?.geoCoordinate?.latitude}
              lng={order?.deliveryAddress?.geoCoordinate?.longitude}
              mobileNumber={order?.deliveryAddress?.recipientMobileNo}
              name={order?.deliveryAddress?.title}
              plaque={order?.deliveryAddress?.plaque}
              postalCode={order?.deliveryAddress?.postalCode}
              unit={order?.deliveryAddress?.unit}
              username={order?.deliveryAddress?.recipientName}
            />

            {order?.description && <ConsignmentDescription description={order?.description || ''} />}

            {order?.bundleItems?.map((bundleItem, index) => (
              <ConsignmentGroup
                bundleStateTitle={bundleItem?.bundleStateTitle ?? ''}
                cargoId={bundleItem?.bundleId ?? ''}
                displayRefundOrderItem={order?.canRefund}
                key={bundleItem?.bundleId}
                name={formatMessage({ ...OrderManagementMessages.consignmentNumber }, { number: index + 1 })}
                products={bundleItem?.orderItems ?? []}
                refundConsignment={() => onRefund('consignment', bundleItem?.orderItems || [])}
                shoppingCartId={orderId ?? ''}
                texts={[
                  {
                    key: formatMessage({ ...OrderManagementMessages.paidAmount }),
                    value: bundleItem?.totalPrice
                      ? `${bundleItem.totalPrice.toLocaleString()} ${glyphy(bundleItem?.currency)}`
                      : null,
                  },
                  {
                    key: formatMessage({ ...OrderManagementMessages.discount }),
                    value: bundleItem?.discount
                      ? `${bundleItem.discount.toLocaleString()} ${glyphy(bundleItem?.currency)}`
                      : null,
                  },
                  {
                    key: formatMessage({ ...OrderManagementMessages.shippingCost }),
                    value: bundleItem?.userPrice
                      ? formatMessage(
                          { ...OrderManagementMessages.priceWithCurrency },
                          {
                            currency: glyphy(bundleItem?.currency),
                            price: bundleItem.userPrice.toLocaleString(),
                          },
                        )
                      : formatMessage({ ...OrderManagementMessages.free }),
                  },
                  {
                    key: formatMessage({ ...OrderManagementMessages.howToDelivery }),
                    value: bundleItem?.deliveryText,
                  },
                  {
                    key: formatMessage({ ...OrderManagementMessages.deliveredDate }),
                    value: getDeliveryDate(order, bundleItem),
                  },
                ]}
              />
            ))}
          </>
        ) : (
          <RefundProvider>
            {variant === 'refund-order' || variant === 'refund-consignment' ? (
              <Refund
                back={() => setVariant('detail')}
                gotoSuccessPage={() => setVariant('refund-order-success')}
                products={refundableProducts}
                variant={variant}
              />
            ) : (
              <RefundedList back={() => setVariant('detail')} orderId={order?.id || ''} />
            )}
          </RefundProvider>
        )}
      </OrderTrackingDetailBodyHOC>
    )
  return (
    <OrderTrackingDetailWrappers spacing={6}>
      <NotFound />
    </OrderTrackingDetailWrappers>
  )
}
