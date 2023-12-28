import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CancelConsignmentResultWrapper } from '../../order-tracking.styles'
import { CanceledProduct, CancelForm } from '../../types'
import { CancelCount } from './CancelCount'
import { CancelReasonSelect } from './CancelReasonSelect'

interface RefundCardActions {
  readOnly?: boolean
  product: CanceledProduct
  updateItem?: (item: CanceledProduct) => void
}

export const CancelCardActions: FC<RefundCardActions> = ({ readOnly, product, updateItem }) => {
  const {
    formState: { isValid },
    getValues,
  } = useFormContext<CancelForm>()
  const reasonChanged = (reason: string): void => {
    if (!updateItem) return
    updateItem({
      ...product,
      cancelationReason: reason,
      cancelationReasonTitle: getValues('reasonTitle'),
    })
  }

  const updateCount = (count: number): void => {
    if (!updateItem) return
    updateItem({
      ...product,
      count,
      cancelationReason: getValues('reason'),
      cancelationReasonTitle: getValues('reasonTitle'),
      formValidation: isValid,
    })
  }

  useEffect(() => {
    if (!updateItem) return
    updateItem({
      ...product,
      formValidation: isValid,
      count: Number(getValues('count')),
      cancelationReason: getValues('reason'),
      cancelationReasonTitle: getValues('reasonTitle'),
    })
  }, [isValid])

  return (
    <CancelConsignmentResultWrapper spacing={4}>
      <CancelReasonSelect readOnly={readOnly} onChange={reasonChanged} />
      <CancelCount quantity={product.quantity} readOnly={readOnly} onChange={updateCount} />
    </CancelConsignmentResultWrapper>
  )
}
