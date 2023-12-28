import { Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBButton, HBIcon, HBLoader } from '@/core/components'
import { glyphy } from '@/core/utils'
import { useGetWebSaleOrdersOrderDetailOrderId } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { ConsignmentText } from '../../components/ConsignmentText'
import { useGetOrderDeliveryDate } from '../../hooks/useGetOrderDeliveryDate'
import { useTimer } from '../../hooks/useTimer'
import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { ConsignmentStatusEnum, OrderServiceSectionEnum, OrderStateCode } from '../../types'
import { ConsignmentDescription } from './ConsignmentDescription'
import { ConsignmentDetailAddress } from './ConsignmentDetailAddress'
import { ConsignmentDetailHeader } from './ConsignmentDetailHeader'
import { ConsignmentGroup } from './ConsignmentGroup'
import { OrderHistory } from './OrderHistory'
import { OrderTrackingDetailBodyHOC } from './OrderTrackingDetailBodyHOC'

enum BundleStateCodeType {
  Draft = 1,
  Final = 2,
  WaitingForGathering = 3,
  Gathered = 4,
  DeliveredToProcessCenter = 5,
  ReadyToSend = 6,
  Sent = 7,
  Delivered = 8,
  DeliveryFailed = 9,
  Canceled = 10,
}

type PropsType = {
  orderId: string
}

const OrderTrackingCurrentDetail = (props: PropsType) => {
  const { orderId } = props
  const { data } = useSession()
  const { push } = useRouter()

  const [openAccordion, setOpenAccordion] = useState<boolean>(false)

  const { formatMessage, formatDate } = useIntl()
  // Const { reShopOrder, reShopLoading } = useBasketManagement()
  const { getDeliveryDate } = useGetOrderDeliveryDate()

  const {
    isFetching,
    data: currentDetailData,
    isError,
  } = useGetWebSaleOrdersOrderDetailOrderId(orderId, { Section: OrderServiceSectionEnum.Current })

  const [
    variant,
    // SetVariant
  ] = useState<'detail' | 'cancel-order' | 'cancel-consignment' | 'cancel-order-success'>('detail')

  const timeLeft = useTimer(Math.abs(currentDetailData?.data?.order?.reservationLeftMinutes ?? 0))

  // Const [cancelableProducts, setCancelableProducts] = useState<CommerceDetailOrderItem[]>([])

  /*
   * Const reShopping = (): void => {
   *   const productItems: ProductItems[] = []
   *   currentDetailData?.data?.order?.bundleItems?.forEach(
   *     item =>
   *       item.orderItems?.forEach(
   *         orderItem => orderItem.productId && productItems.push({ productId: orderItem.productId }),
   *       ),
   *   )
   *   // ReShopOrder(currentDetailData?.data?.order?.id, productItems)
   * }
   */
  /*
   * Const onCancel = (type: 'consignment' | 'order', consignmentProduct?: CommerceDetailOrderItem[]): void => {
   *   if (type === 'consignment') {
   *     setCancelableProducts(consignmentProduct || [])
   *     setVariant('cancel-consignment')
   *   } else if (type === 'order') {
   *     if (currentDetailData?.data?.order?.bundleItems) {
   *       const temporaryProducts = currentDetailData?.data.order?.bundleItems?.flatMap(
   *         bundleItem => bundleItem?.orderItems ?? [],
   *       )
   *       setCancelableProducts([...temporaryProducts])
   *     }
   *     setVariant('cancel-order')
   *   }
   * }
   */

  if (isFetching)
    return (
      <OrderTrackingDetailWrappers spacing={6}>
        <HBLoader type="line" circleSx={{ bgcolor: 'background.lightest' }} />
      </OrderTrackingDetailWrappers>
    )

  if (!isFetching && !isError)
    return (
      <OrderTrackingDetailBodyHOC>
        {variant === 'detail' && (
          <>
            <ConsignmentDetailHeader
              shoppingCartId={currentDetailData?.data?.order?.id ?? ''}
              status={ConsignmentStatusEnum.Paid}
              transactions={currentDetailData?.data?.order?.transactions ?? []}
              onClick={() => push('/profile/order-tracking/current/')}
            >
              {currentDetailData?.data?.order?.stateCode === OrderStateCode.AwaitPayment && (
                <Typography color="primary.main" sx={{ mt: '0 !important' }} variant="subtitle1">
                  <FormattedMessage {...OrderManagementMessages.paymentAwaitingWithTime} values={{ time: timeLeft }} />
                </Typography>
              )}

              <Stack
                alignItems={{ sm: 'center', xs: 'flex-start' }}
                direction={{ sm: 'row', xs: 'column' }}
                flexWrap="wrap"
                gap={6}
              >
                {currentDetailData?.data?.order?.createDate && (
                  <ConsignmentText
                    sx={{ gap: 2 }}
                    title={formatMessage({ ...OrderManagementMessages.orderDateTime })}
                    value={formatDate(currentDetailData?.data?.order?.createDate)}
                  />
                )}

                {currentDetailData?.data?.order?.number && (
                  <ConsignmentText
                    sx={{ gap: 2 }}
                    title={formatMessage({ ...OrderManagementMessages.orderCode })}
                    value={currentDetailData?.data?.order?.number}
                  />
                )}
              </Stack>
              <Divider sx={{ borderColor: 'border.lighter' }} />
              <Stack
                alignItems={{ sm: 'center', xs: 'flex-start' }}
                direction={{ sm: 'row', xs: 'column' }}
                justifyContent="space-between"
                sx={theme => ({ marginTop: `${theme.spacing(4)} !important` })}
              >
                <Stack
                  alignItems={{ sm: 'center', xs: 'flex-start' }}
                  direction={{ sm: 'row', xs: 'column' }}
                  flexWrap="wrap"
                  gap={6}
                >
                  {currentDetailData?.data?.order?.paymentInfo?.paymentMethodName && (
                    <ConsignmentText
                      sx={{ gap: 2 }}
                      title={formatMessage({ ...OrderManagementMessages.paymentType })}
                      value={currentDetailData.data.order.paymentInfo.paymentMethodName}
                    />
                  )}

                  {Boolean(currentDetailData?.data?.order?.totalNetPrice) && (
                    <ConsignmentText
                      sx={{ gap: 2 }}
                      title={formatMessage({ ...OrderManagementMessages.orderAmount })}
                      value={`${currentDetailData?.data?.order?.totalNetPrice?.toLocaleString()} ${glyphy(
                        currentDetailData?.data?.order?.currency,
                      )}`}
                    />
                  )}

                  {currentDetailData?.data?.order?.voucherAmount ? (
                    <Typography sx={{ color: 'success.main', width: '100%' }} variant="subtitle2">
                      <FormattedMessage
                        {...OrderManagementMessages.discountCode}
                        values={{
                          code: currentDetailData?.data?.order?.voucherAmount?.toLocaleString(),
                          currency: glyphy(currentDetailData?.data?.order?.currency),
                        }}
                      />
                    </Typography>
                  ) : null}
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
              <OrderHistory
                expanded={openAccordion}
                transactions={currentDetailData?.data?.order?.transactions ?? []}
              />
              {/* <Stack
                alignItems="center"
                direction="row"
                justifyContent={{ xs: 'space-between', sm: 'flex-end' }}
                spacing={4}
              > */}
              {/* {currentDetailData?.data?.order?.isCancelable && (
                  <HBButton
                    sx={{ width: { sm: 146, xs: '50%' } }}
                    variant="secondary"
                    onClick={() => onCancel('order')}
                  >
                    <FormattedMessage {...OrderManagementMessages.cancelOrder} />
                  </HBButton>
                )} */}
              {/* <HBButton
                  loading={reShopLoading}
                  sx={{ width: { sm: 146, xs: '50%' } }}
                  variant="contained"
                  onClick={() => reShopping()}
                >
                  <Typography variant="subtitle2">
                    <FormattedMessage {...OrderManagementMessages.buyAgain} />
                  </Typography>
                </HBButton> */}
              {/* </Stack> */}
            </ConsignmentDetailHeader>
            <ConsignmentDetailAddress
              address={currentDetailData?.data?.order?.deliveryAddress?.streetLine}
              district={currentDetailData?.data?.order?.deliveryAddress?.district}
              lat={currentDetailData?.data?.order?.deliveryAddress?.geoCoordinate?.latitude}
              lng={currentDetailData?.data?.order?.deliveryAddress?.geoCoordinate?.longitude}
              mobileNumber={currentDetailData?.data?.order?.deliveryAddress?.recipientMobileNo}
              name={currentDetailData?.data?.order?.deliveryAddress?.title}
              plaque={currentDetailData?.data?.order?.deliveryAddress?.plaque}
              postalCode={currentDetailData?.data?.order?.deliveryAddress?.postalCode}
              unit={currentDetailData?.data?.order?.deliveryAddress?.unit}
              username={currentDetailData?.data?.order?.deliveryAddress?.recipientName}
            />

            {currentDetailData?.data?.order?.description && (
              <ConsignmentDescription description={currentDetailData?.data?.order?.description || ''} />
            )}

            {currentDetailData?.data?.order?.bundleItems?.map((bundleItem, index) => (
              <ConsignmentGroup
                bundleNumber={bundleItem.bundleNumber!}
                bundleStateTitle={bundleItem?.bundleStateTitle ?? ''}
                // CancelConsignment={() => onCancel('consignment', bundleItem?.orderItems || [])}
                cargoId={bundleItem?.bundleId ?? ''}
                deliveryCode={bundleItem.deliveryCode!}
                displayCancelConsignment={currentDetailData?.data?.order?.isCancelable}
                isDisplayDeliveryCode={
                  bundleItem?.bundleStateCode ? Number(bundleItem?.bundleStateCode) === BundleStateCodeType.Sent : false
                }
                key={bundleItem?.bundleId}
                name={formatMessage({ ...OrderManagementMessages.consignmentNumber }, { number: index + 1 })}
                partyId={data?.user.partyId ?? ''}
                products={bundleItem?.orderItems ?? []}
                shoppingCartId={orderId ?? ''}
                texts={[
                  {
                    key: formatMessage({ ...OrderManagementMessages.consignmentAmount }),
                    value: bundleItem?.totalPrice
                      ? `${bundleItem?.totalPrice.toLocaleString()} ${glyphy(bundleItem?.currency)}`
                      : null,
                  },
                  {
                    key: 'سود شما از خرید:',
                    value: bundleItem?.discount
                      ? `${bundleItem?.discount?.toLocaleString()}${glyphy(bundleItem?.currency)}`
                      : '',
                  },

                  {
                    key: formatMessage({ ...OrderManagementMessages.shippingCost }),
                    value: bundleItem?.userPrice
                      ? formatMessage(
                          { ...OrderManagementMessages.priceWithCurrency },
                          {
                            currency: glyphy(bundleItem?.currency),
                            price: bundleItem?.userPrice.toLocaleString(),
                          },
                        )
                      : formatMessage({ ...OrderManagementMessages.free }),
                  },
                  {
                    key: formatMessage({ ...OrderManagementMessages.deliveredDate }),
                    value: getDeliveryDate(currentDetailData?.data?.order, bundleItem),
                  },
                ]}
              />
            ))}
          </>
        )}
        {/* {(variant === 'cancel-order' || variant === 'cancel-consignment') && (
          <ConsignmentCancelationProvider pageType={OrderPageTypeEnum.Current}>
            <CancelConsignment
              back={() => setVariant('detail')}
              gotoSuccessPage={() => setVariant('cancel-order-success')}
              products={cancelableProducts}
              totalNetPrice={currentDetailData?.data?.order?.totalNetPrice}
              type={currentDetailData?.data?.order?.stateCode === OrderStateCode.AwaitPayment ? 'waiting' : 'success'}
              variant={variant}
            />
          </ConsignmentCancelationProvider>
        )} */}
        {/* {variant === 'cancel-order-success' && <CanceledConsignmentList />} */}
      </OrderTrackingDetailBodyHOC>
    )
  return (
    <OrderTrackingDetailWrappers spacing={6}>
      <NotFound />
    </OrderTrackingDetailWrappers>
  )
}

export { BundleStateCodeType, OrderTrackingCurrentDetail }
