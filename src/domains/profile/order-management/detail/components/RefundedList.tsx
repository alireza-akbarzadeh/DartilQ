import { Box, Stack, styled, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

import { HBButton, HBIcon } from '@/core/components'

import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'

interface CanceledConsignmentListProps {
  back: () => void
  orderId: string
}

const EmptySpace = styled(Box)(() => ({}))

export const RefundedList = (props: CanceledConsignmentListProps): JSX.Element => {
  const {
    back,
    // OrderId
  } = props
  // Const { formatMessage, formatDate } = useIntl()
  const { replace } = useRouter()
  /*
   * UseGetWebSaleOrdersByOrderIdRefundedProductsQuery
   *  const {} = useGetWebSaleOrd
   *  const { data: refundResult } = getOrdersRefundedProducts({
   *    orderId,
   *  })
   */

  return (
    <>
      <OrderTrackingDetailWrappers spacing={7.5}>
        <Stack alignItems="flex-end">
          <HBButton sx={{ gap: 3 }} variant="link" onClick={() => back()}>
            <Typography color="grey.700" variant="button">
              <FormattedMessage {...OrderManagementMessages.back} />
            </Typography>
            <HBIcon sx={{ color: 'grey.700', lineHeight: 0 }} name="arrowLeft" />
          </HBButton>
        </Stack>
        <Stack alignItems="center" spacing={2}>
          <HBIcon size="large" sx={{ color: 'success.main' }} name="check" />
          <EmptySpace />
          <Typography color="success.main" variant="h5">
            <FormattedMessage {...OrderManagementMessages.orderRefundSuccess} />
          </Typography>
          <EmptySpace />
          <EmptySpace />
          {/* <ConsignmentText
            title={formatMessage({ ...OrderManagementMessages.orderCode })}
            Value={refundResult?.data?.summaryCart?.shoppingCartId ?? ''}
          /> */}
          {/* <ConsignmentText
            title={formatMessage({ ...OrderManagementMessages.refundedDate })}
            value={
              refundResult?.data?.summaryCart?.canceleDate
                ? formatDate(refundResult.data.summaryCart.canceleDate, {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''
            }
          /> */}
          {/* <ConsignmentText
            title={formatMessage({ ...OrderManagementMessages.refundOrderPrice })}
            value={formatMessage(
              { ...OrderManagementMessages.priceWithCurrency },
              {
                price: refundResult?.data?.summaryCart?.totalAmount?.toLocaleString() ?? '' ?? '',
                currency: glyphy(refundResult?.data?.summaryCart?.currency),
              },
            )}
          /> */}
          {/* <ConsignmentText
            title={formatMessage({ ...OrderManagementMessages.paymentType })}
            value={refundResult?.data?.summaryCart?.paymentMethodTitle ?? ''}
          /> */}
          <EmptySpace />
          <HBButton onClick={() => replace('/profile/order-tracking')}>
            <FormattedMessage {...OrderManagementMessages.returnToOrder} />
          </HBButton>
        </Stack>
      </OrderTrackingDetailWrappers>
      <OrderTrackingDetailWrappers spacing={6}>
        <Typography variant="h6">
          <FormattedMessage {...OrderManagementMessages.refundedProducts} />
        </Typography>
        {/* {refundResult?.data?.products?.map(item => (
          <Stack key={item.id}>
            <RefundCard item={item} key={item.productId} readOnly />
            <Divider sx={{ borderColor: 'border.lighter' }} />
          </Stack>
        ))} */}
      </OrderTrackingDetailWrappers>
    </>
  )
}
