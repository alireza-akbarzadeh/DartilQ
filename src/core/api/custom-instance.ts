import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getServerSession } from 'next-auth'
import { getSession, signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

import { ApiConstants } from '../constants'
import { nextAuthOptions } from './next-auth-options'

const axiosInstance = Axios.create({ baseURL: process.env.NEXT_PUBLIC_GATEWAY })

const isServer = typeof window === 'undefined'

axiosInstance.interceptors.request.use(
  async config => {
    const session = isServer ? await getServerSession(nextAuthOptions) : await getSession()
    const tokenType = 'Bearer'

    if (config.headers) {
      if (session?.accessToken) {
        config.headers.authorization = `${tokenType} ${session?.accessToken}`
      }

      config.headers['client-name'] = ApiConstants['client-name']
      config.headers['client-version'] = ApiConstants['client-version']
    }

    return config
  },
  (error: AxiosError) => {
    // eslint-disable-next-line no-console
    console.warn(error)
  },
)

// Add a second `options` argument here if you want to pass extra options to each generated query
const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = axiosInstance({
    ...config,
    ...options,
  })
    .then(({ data }) => {
      return data
    })
    .catch(error => {
      if (typeof window !== 'undefined' && Number(error?.response?.status)) {
        const expectedError =
          error?.response?.status && Number(error?.response?.status) >= 400 && Number(error?.response?.status) < 500

        if (error?.response?.status === 401) {
          signOut({ callbackUrl: '/' })
        } else if (expectedError) {
          if (error?.code === 'exception' || error?.code === 'ERR_BAD_REQUEST') {
            toast(error?.response?.data?.messages?.[0]?.message)
          }
        } else {
          toast('مشکلی در سرور به وجود آمده است')
        }
      }
    })

  /*
   * @ts-ignore
   * promise.cancel = () => {
   *   source.cancel('Query was cancelled')
   * }
   */

  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
type ErrorType<Error> = AxiosError<Error>

type BodyType<BodyData> = BodyData

export { axiosInstance, customInstance }
export type { BodyType, ErrorType }
