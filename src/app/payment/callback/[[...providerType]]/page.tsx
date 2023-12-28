import { Callback } from '@/domains/payment/callback/callback'

const CallbackPage = ({
  params,
  searchParams,
}: {
  params: { providerType: string[] }
  searchParams?: { [key: string]: string }
}) => {
  const providerType = params.providerType[0]
  const payResult = JSON.stringify(searchParams)
  return <Callback {...{ providerType, payResult }} />
}

export default CallbackPage
