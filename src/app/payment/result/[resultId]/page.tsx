import { Result } from '@/domains/payment/result/result'
import { PaymentBusinessEnum } from '@/shared/types/paymentType'

const ResultPage = ({
  params,
  searchParams,
}: {
  params: { resultId: string }
  searchParams?: { [key: string]: string }
}) => {
  return (
    <Result
      paymentStatus={params.resultId}
      paymentBusiness={Number(searchParams?.paymentBusiness) as PaymentBusinessEnum}
    />
  )
}

export default ResultPage
