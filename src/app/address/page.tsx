import { AddressWrapper } from '@/domains/address'
import { AddressStepsType } from '@/domains/address/address.types'

const Page = ({ searchParams }: { searchParams: { step: AddressStepsType } }) => {
  return <AddressWrapper step={searchParams.step} />
}

export default Page
