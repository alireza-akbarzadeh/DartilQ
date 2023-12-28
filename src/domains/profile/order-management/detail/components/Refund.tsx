import { Stack, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'

import { HBButton, HBIcon } from '@/core/components'
import { usePostWebSaleRefundOrderCreateRefundRequest } from '@/services/sale-services/sale'
import {
  CommerceDetailOrderItem,
  RefundRequestItemFile,
  RefundRequestItemModel,
} from '@/services/sale-services/sale.schemas'

import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { useRefund, useRefundUpdater } from '../context/RefundContext'
import { RefundBody } from './RefundBody'

interface CancelConsignmentProps {
  back: () => void
  gotoSuccessPage: () => void
  products: CommerceDetailOrderItem[]
  variant: 'refund-order' | 'refund-consignment'
}

export const Refund = (props: CancelConsignmentProps): JSX.Element => {
  const { back, gotoSuccessPage, products } = props
  const { setProducts } = useRefundUpdater()
  const { productRefund, refundFiles } = useRefund()
  const {
    isPending: isLoading,
    data: refundResponse,
    mutateAsync: refundMutation,
  } = usePostWebSaleRefundOrderCreateRefundRequest()

  useEffect(() => {
    if (products.length > 0) {
      setProducts(products)
    }
  }, [products])

  const handleRefundRequests = (): void => {
    const refundRequestItems: RefundRequestItemModel[] = []
    productRefund?.refundedProducts.forEach(item => {
      const ids = item.orderItemIds?.split(',')
      const itemFiles: RefundRequestItemFile[] = []
      refundFiles?.forEach(refundFile => {
        if (refundFile.productId === item.productId) {
          refundFile.files.map(files => itemFiles.push({ id: files.id, value: files.link }))
        }
      })

      const count = item?.refundedCount || 0
      for (let index = 0; index < count; index++) {
        refundRequestItems.push({
          orderItemId: ids[index] || '',
          reasonId: item.refundReason || '',
          description: item.complaint || '',
          files: itemFiles || [],
        })
      }
    })

    refundMutation({
      data: {
        orderId: productRefund?.orderId,
        refundRequestItems,
      },
    })
  }

  useEffect(() => {
    if (refundResponse?.success) {
      gotoSuccessPage()
    }
  }, [refundResponse, gotoSuccessPage])

  const handleDisable = useMemo(() => {
    if (
      productRefund &&
      Boolean(productRefund) &&
      (!productRefund.refundedProducts.some(Boolean) ||
        productRefund.refundedProducts.some(item => !item.formValidation))
    ) {
      return true
    }
  }, [productRefund])

  return (
    <>
      <OrderTrackingDetailWrappers spacing={6}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Typography color="common.black" variant="subtitle1">
            <FormattedMessage {...OrderManagementMessages.refundOrder} />
          </Typography>
          <HBButton sx={{ gap: 3 }} variant="link" onClick={() => back()}>
            <Typography color="info.main" variant="button">
              <FormattedMessage {...OrderManagementMessages.back} />
            </Typography>
            <HBIcon sx={{ color: 'grey.700', lineHeight: 0 }} name="arrowLeft" />
          </HBButton>
        </Stack>
        <Typography color="primary.main" variant="h6">
          <FormattedMessage {...OrderManagementMessages.refundCondition} />
        </Typography>
      </OrderTrackingDetailWrappers>
      <OrderTrackingDetailWrappers>
        <Stack spacing={6}>
          <RefundBody />
          <Stack alignItems="center" direction="row" justifyContent={{ xs: 'center', sm: 'flex-end' }} spacing={4}>
            <HBButton
              variant="secondary"
              onClick={() => {
                back()
              }}
            >
              انصراف
            </HBButton>
            <HBButton
              disabled={handleDisable}
              loading={isLoading}
              onClick={() => {
                handleRefundRequests()
              }}
            >
              <FormattedMessage {...OrderManagementMessages.checkRefundOrder} />
            </HBButton>
          </Stack>
        </Stack>
      </OrderTrackingDetailWrappers>
    </>
  )
}
