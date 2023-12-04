import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getSession, signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

import { ApiConstants } from '../constants'

const axiosInstance = Axios.create({ baseURL: process.env.NEXT_PUBLIC_GATEWAY })

axiosInstance.interceptors.request.use(
  async config => {
    const session = await getSession()
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
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  })
    .then(({ data }) => {
      return data
    })
    .catch(error => {
      if (typeof window !== 'undefined' && Number(error?.status)) {
        const expectedError = error?.status && Number(error?.status) >= 400 && Number(error?.status) < 500

        if (error?.status === 401) {
          signOut()
        } else if (expectedError) {
          if (error?.Code === 'exception' || error?.Code === 'BadRequest') {
            toast(error.messages)
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
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData
