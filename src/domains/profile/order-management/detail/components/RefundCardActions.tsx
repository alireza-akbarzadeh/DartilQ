import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { RefundActionWrapper } from '../../order-tracking.styles'
import { RefundForm } from '../../types'
import { RefundedProduct } from '../context/RefundContext'
import { RefundComplaint } from './RefundComplaint'
import { RefundCount } from './RefundCount'
import { RefundFileUploader } from './RefundFileUploader'
import { RefundReasonSelect } from './RefundReasonSelect'

interface RefundCardActionsProps {
  readOnly?: boolean
  product: RefundedProduct
  updateItem?: (item: RefundedProduct) => void
}

export const RefundCardActions = ({ readOnly, product, updateItem }: RefundCardActionsProps): JSX.Element => {
  const {
    formState: { isValid, isDirty },
    getValues,
  } = useFormContext<RefundForm>()
  const reasonChanged = (reason: string): void => {
    if (!updateItem || !isDirty) return
    updateItem({ ...product, refundReason: reason })
  }

  const updateComplaint = (complaint: string): void => {
    if (!updateItem || !isDirty) return
    updateItem({
      ...product,
      complaint,
      refundedCount: Number(getValues('count')),
      refundReason: getValues('reason'),
      formValidation: isValid,
    })
  }

  const updateCount = (count: number): void => {
    if (!updateItem || !isDirty) return
    updateItem({
      ...product,
      refundedCount: count,
      complaint: getValues('complain'),
      refundReason: getValues('reason'),
      formValidation: isValid,
    })
  }

  useEffect(() => {
    if (!updateItem || !isDirty) return
    updateItem({
      ...product,
      formValidation: isValid,
      complaint: getValues('complain'),
      refundedCount: Number(getValues('count')),
      refundReason: getValues('reason'),
    })
  }, [isValid, isDirty])

  return (
    <RefundActionWrapper spacing={4}>
      <RefundReasonSelect readOnly={readOnly} onChange={reasonChanged} />
      <RefundCount quantity={product.quantity} readOnly={readOnly} onChange={updateCount} />
      <RefundComplaint readOnly={readOnly} onChange={updateComplaint} />
      <RefundFileUploader orderItemId={product.orderItemIds.split(',')[0]} productId={product.productId} />
    </RefundActionWrapper>
  )
}
