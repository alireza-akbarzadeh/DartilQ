/* eslint-disable no-nested-ternary */
import { Divider, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useIntl } from 'react-intl'

import { HBLoader } from '@/core/components'
import { glyphy } from '@/core/utils'
import { useGetWebSaleRefundOrderGetRefundRequestItemsRefundRequestId } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { ConsignmentText } from '../../components/ConsignmentText'
import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { ConsignmentStatusEnum, OrderRefundStates } from '../../types'
import { ConsignmentDescription } from './ConsignmentDescription'
import { ConsignmentDetailHeader } from './ConsignmentDetailHeader'
import { ConsignmentGroup } from './ConsignmentGroup'
import { OrderTrackingDetailBodyHOC } from './OrderTrackingDetailBodyHOC'

type PropsType = {
  orderId: string
}

export const OrderTrackingRefundDetail = (props: PropsType): JSX.Element => {
  const { orderId } = props
  const { data } = useSession()
  const { push } = useRouter()

  const { formatMessage } = useIntl()

  const {
    isFetching,
    data: deliveredDetailData,
    isError,
  } = useGetWebSaleRefundOrderGetRefundRequestItemsRefundRequestId(orderId)

  const order = deliveredDetailData?.data

  /*
   * Const reShopping = (): void => {
   *   if (order?.orderId) {
   *     const productItems: ProductItems[] =
   *       order?.items?.reduce<ProductItems[]>(
   *         (accumulator, item) => (item.productId ? [...accumulator, { productId: item.productId }] : [...accumulator]),
   *         [],
   *       ) ?? []
   *     reShopOrder(order?.orderId, productItems)
   *   }
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
          isRefund
          shoppingCartId={order?.id ?? ''}
          status={
            order?.refundRequestStateCode === OrderRefundStates.Confirmed
              ? ConsignmentStatusEnum.Returned
              : order?.refundRequestStateCode === OrderRefundStates.Requested
                ? ConsignmentStatusEnum.PendingReturned
                : ConsignmentStatusEnum.Rejected
          }
          transactions={[]}
          onClick={() => push('/profile/order-tracking/returned')}
        >
          <Stack alignItems="center" direction="row" flexWrap="wrap" gap={6}>
            {order?.createDate && (
              <ConsignmentText
                sx={{ gap: 2, '& .text-value': { direction: 'rtl' } }}
                title={formatMessage({ ...OrderManagementMessages.refundDate })}
                value={order?.createDate}
              />
            )}
            {order?.number && (
              <ConsignmentText
                sx={{ gap: 2 }}
                title={formatMessage({ ...OrderManagementMessages.refundCode })}
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
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={6}>
              {order?.totalFinalPrice && (
                <ConsignmentText
                  sx={{ gap: 2 }}
                  title={formatMessage({ ...OrderManagementMessages.refundPrice })}
                  value={`${order?.totalFinalPrice?.toLocaleString()} ${glyphy(order.currency)}`}
                />
              )}
            </Stack>
          </Stack>

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

        {order?.description && <ConsignmentDescription description={order?.description || ''} />}

        <ConsignmentGroup
          hideCommentButton
          isRefunded
          name={formatMessage({ ...OrderManagementMessages.consignmentNumber }, { number: 1 })}
          partyId={data?.user?.partyId ?? ''}
          products={order?.items ?? []}
          shoppingCartId={orderId ?? ''}
        />
      </OrderTrackingDetailBodyHOC>
    )
  return (
    <OrderTrackingDetailWrappers spacing={6}>
      <NotFound />
    </OrderTrackingDetailWrappers>
  )
}
