import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { useRefundUpdater } from '../context/RefundContext'
import { ProductRefund } from './ProductRefund'

export const RefundBody = (): JSX.Element => {
  const { query } = useRouter()
  const orderId = query.profile ? query.profile[2] : ''
  const { setProductRefund } = useRefundUpdater()

  useEffect(() => {
    setProductRefund({ refundedProducts: [], orderId })
  }, [])

  return (
    <OrderTrackingDetailWrappers>
      <ProductRefund />
    </OrderTrackingDetailWrappers>
  )
}
