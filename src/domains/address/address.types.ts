import { AddAddress, Address } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type SessionAddress = Pick<Address, 'id' | 'cityId' | 'latitude' | 'longitude'>

type AddressStepsType = 'map' | 'form' | 'navigation'

type AddressFormType = Omit<AddAddress, 'cityId' | 'countryId' | 'provinceId'> & {
  cityId?: string
  countryId?: string
  provinceId?: string
}

export type { AddressFormType, AddressStepsType, SessionAddress }
