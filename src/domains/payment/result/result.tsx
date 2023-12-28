'use client'
import { PaymentStatus } from '@/services/payment-services/payment.schemas'
import { PaymentBusinessEnum } from '@/shared/types/paymentType'

import { Error } from './components/Error'
import { Success } from './components/Success'

type ResultProps = {
  paymentStatus: string
  paymentBusiness: PaymentBusinessEnum
}

export const Result = (props: ResultProps) => {
  const { paymentBusiness, paymentStatus } = props
  return paymentStatus === PaymentStatus.NUMBER_1104003.toString() ? (
    <Success paymentBusiness={paymentBusiness} />
  ) : (
    <Error />
  )
}
