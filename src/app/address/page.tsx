import { AddressWrapper } from '@/domains/address'
import { AddressStepsType } from '@/domains/address/address.types'

const Page = ({ searchParams }: { searchParams: { step: AddressStepsType; id: string } }) => {
  return <AddressWrapper step={searchParams.step} addressId={searchParams.id} />
}

export default Page
