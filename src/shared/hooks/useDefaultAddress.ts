import { useCallback, useEffect, useMemo, useState } from 'react'

import { useGetUserAddresses } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { Address } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

export const useDefaultAddress = (): {
  defaultAddress: Address | null
  updateDefaultAddress: (value: Address) => void
  isLoading: boolean
} => {
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null)
  const { refetch: getUserAddresses, isLoading } = useGetUserAddresses({ query: { staleTime: 40000 } })
  useEffect(() => {
    getUserAddresses().then(respons => {
      const defaultAddress = respons.data?.data?.find(item => item.isDefault) ?? null
      setDefaultAddress(defaultAddress)
    })
  }, [])

  const updateDefaultAddress = useCallback((address: Address) => {
    setDefaultAddress(address)
  }, [])

  const memorizedValue = useMemo(() => {
    return {
      defaultAddress,
      updateDefaultAddress,
      isLoading,
    }
  }, [defaultAddress, updateDefaultAddress])

  return memorizedValue
}
