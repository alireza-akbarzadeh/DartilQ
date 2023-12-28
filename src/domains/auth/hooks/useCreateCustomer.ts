import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { SignInResponse } from 'next-auth/react/types'
import { useCallback, useState } from 'react'

import { ProviderEnum } from '@/shared/types/enums'
import { CreateCustomerCredential } from '@/shared/types/next-auth/next-auth-types'

import { useAuthStore } from './useAuthStore'

export const useCreateCustomer = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const { changePasswordToken } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getProvider = (): number => {
    const provider = searchParams.get('provider')
    if (provider) {
      return Number(provider) as ProviderEnum
    }
    return ProviderEnum.CustomerCommerce
  }

  const handleCreateCustomer = useCallback(
    async (token: string, username: string, firstName?: string, lastName?: string) => {
      setError('')
      setLoading(true)

      const customerModel: CreateCustomerCredential = {
        username,
        firstName,
        lastName,
        provider: getProvider().toString(),
        otpToken: token,
      }

      Object.keys(customerModel).forEach(key => {
        if (
          customerModel[key as keyof CreateCustomerCredential] === null ||
          customerModel[key as keyof CreateCustomerCredential] === undefined
        ) {
          delete customerModel[key as keyof CreateCustomerCredential]
        }
      })

      const response: SignInResponse | undefined = await signIn('CREATE_CUSTOMER', {
        ...customerModel,
        redirect: false,
      })

      if (response?.error || !response?.ok) setError(response?.error || 'Unknown Error')
      else {
        const addressPath = '/address?step=navigation'
        replace(
          searchParams?.get('callbackUrl')
            ? `${addressPath}&callbackUrl=${searchParams?.get('callbackUrl')}`
            : addressPath,
        )
      }
      setLoading(false)
    },
    [changePasswordToken],
  )

  return { handleCreateCustomer, loading, error }
}
