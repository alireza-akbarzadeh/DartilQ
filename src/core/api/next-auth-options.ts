/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
import { NextAuthOptions, Session, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { pick } from 'ramda'

import { ApiConstants, RefreshAccessTokenError } from '@/core/constants'
import { SessionAddress } from '@/domains/address'
import { AddressListApiResult } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import {
  AccessToken,
  AuthToken,
  CreateCustomerCredential,
  RefreshTokenCredential,
  SignInCredentials,
  SurrogateUser,
} from '@/shared/types/next-auth/next-auth-types'

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME
const ACCESS_TOKEN_URL = `${process.env.NEXT_PUBLIC_IDS}/connect/${TOKEN_NAME}`
const CREATE_CUSTOMER_URL = `${process.env.NEXT_PUBLIC_GATEWAY}/User/RegisterCustomer`
const CLIENT_ID = process.env.NEXTAUTH_CREDENTIAL_CLIENT_ID
const CLIENT_SECRET = process.env.NEXTAUTH_SECRET

const getUserAddress = async (accessToken: string): Promise<SessionAddress | undefined> => {
  try {
    const userAddressesResponse = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY}/User/Addresses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...ApiConstants,
      },
    })

    const userAddresses: AddressListApiResult = await userAddressesResponse.json()
    const defaultAddress = userAddresses.data?.find(address => address.isDefault)
    if (defaultAddress)
      return {
        cityId: defaultAddress?.cityId,
        latitude: defaultAddress?.latitude,
        longitude: defaultAddress?.longitude,
      }
    return undefined
  } catch {
    return undefined
  }
}

const tokenApi = async (
  data: AccessToken,
  type: 'signIn' | 'refreshToken',
  accessToken?: string,
): Promise<AuthToken> => {
  const response = await fetch(ACCESS_TOKEN_URL, {
    body: new URLSearchParams({
      client_id: `${CLIENT_ID}`,
      client_secret: `${CLIENT_SECRET}`,
      ...data,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      ...ApiConstants,
    },
    method: 'POST',
  })
  const tokenResponse: any = await response.json()

  if (type === 'signIn') {
    if (!response?.ok && tokenResponse?.error) {
      throw new Error(tokenResponse?.error_description || tokenResponse?.error)
    }
  }

  const selectToken = pick(['access_token', 'refresh_token', 'token_type', 'expires_in'], tokenResponse) as AuthToken

  selectToken.expires_in = Date.now() + selectToken.expires_in * 1000

  return selectToken
}

const getAvatarCustomer = async (accessToken: string, partyId: string): Promise<string> => {
  const userAvatar = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY}/web/cms/contents/${3001}/${partyId}/?factor=ProfileImage`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...ApiConstants,
      },
    },
  )

  if (userAvatar.ok) {
    const avatarData: any = await userAvatar.json()
    const temporaryData = avatarData?.data?.items
    const lastFile = avatarData?.data?.items?.[(temporaryData?.length || 1) - 1]
    return lastFile ? `${process.env.NEXT_PUBLIC_CDN}${lastFile.value}` : ''
  }
  return 'Error'
}

const fetchCustomer = async (accessToken: string, username?: string): Promise<Session['user']> => {
  const userDataResponse: any = await fetch(
    `${process.env.NEXT_PUBLIC_GATEWAY}/User/GetPartyByUserName/?userName=${username}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...ApiConstants,
      },
    },
  )

  let userData: Session['user'] | null = null

  if (userDataResponse?.ok) {
    const userDataJson = await userDataResponse.json()
    userData = userDataJson.data
  } else {
    throw new Error(`خطایی در دریافت اطلاعات رخ داده است. (${userDataResponse.status})`)
  }

  if (!userData) {
    throw new Error('خطایی در دریافت اطلاعات رخ داده است.')
  }

  const userAvatar = await getAvatarCustomer(accessToken, userData?.partyId || '')
  const userAddress = await getUserAddress(accessToken)
  userData.avatarUrl = userAvatar
  userData.address = userAddress
  return userData as Session['user']
}

const refreshAccessToken = async function refreshAccessToken(token: AuthToken): Promise<AuthToken> {
  try {
    const selectToken = await tokenApi(
      {
        refresh_token: token.refresh_token,
        grant_type: 'refresh_token',
      },
      'refreshToken',
    )

    return {
      ...token,
      ...selectToken,
    }
  } catch {
    return {
      ...token,
      error: RefreshAccessTokenError,
    }
  }
}

const nextAuthDefaultOptions = (): NextAuthOptions => {
  const defaultOptions: NextAuthOptions = {
    providers: [
      Credentials({
        id: 'SIGN_IN',
        name: 'SignIn',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials: SignInCredentials | undefined): Promise<User | null> {
          let selectToken = {
            access_token: '',
            refresh_token: '',
            token_type: '',
            expires_in: 0,
          }

          if (credentials?.accessToken) {
            selectToken.access_token = credentials.accessToken
            selectToken.refresh_token = credentials.refreshToken || ''
            selectToken.expires_in = 864_000
            selectToken.token_type = 'Bearer'
          } else {
            selectToken = await tokenApi(
              {
                grant_type: 'password',
                scope: 'offline_access',
                ...credentials,
              },
              'signIn',
            )
          }
          const userData = await fetchCustomer(selectToken.access_token, credentials?.username)

          return {
            ...selectToken,
            user: { ...userData, userName: credentials?.username || '' },
          }
        },
      }),
      Credentials({
        id: 'CREATE_CUSTOMER',
        name: 'CreateCustomer',
        credentials: {
          username: { label: 'userName', type: 'text' },
          password: { label: 'password', type: 'password' },
          firstName: { label: 'firstName', type: 'text' },
          lastName: { label: 'lastName', type: 'text' },
          nationalCode: { label: 'nationalCode', type: 'text' },
          provider: { label: 'provider', type: 'text' },
          otpToken: { label: 'otpToken', type: 'text' },
        },
        async authorize(credentials: CreateCustomerCredential | undefined): Promise<User | null> {
          const response = await fetch(`${CREATE_CUSTOMER_URL}`, {
            body: JSON.stringify({
              jsonBody: JSON.stringify({
                mobile: credentials?.username,
                firstName: credentials?.firstName,
                lastName: credentials?.lastName,
                nationalCode: credentials?.nationalCode,
                password: credentials?.password,
                provider: credentials?.provider,
                otpToken: credentials?.otpToken,
              }),
            }),

            headers: {
              'Content-Type': 'application/json',
              ...ApiConstants,
            },
            method: 'POST',
          })
          const response_: any = await response.json()
          console.log('response_', response_)
          if (!response?.ok && (response_?.error || !response_?.success)) {
            throw new Error(response_?.messages[0]?.message || response_?.error_description || response_?.error)
          }

          const selectToken = pick(
            ['access_token', 'refresh_token', 'token_type', 'expires_in'],
            response_?.data?.tokenInfo,
          ) as AuthToken

          selectToken.expires_in = Date.now() + selectToken.expires_in * 1000

          const userData = await fetchCustomer(selectToken?.access_token, credentials?.username)

          return {
            ...selectToken,
            user: { ...userData, userName: credentials?.username || '' },
          }
        },
      }),
      Credentials({
        id: 'token',
        name: 'Token',
        type: 'credentials',
        credentials: {
          tinyToken: { label: 'tinyToken', type: 'text' },
        },
        async authorize(credentials?: { tinyToken: string }): Promise<User | null> {
          try {
            const response = await fetch(ACCESS_TOKEN_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...ApiConstants,
              },
              body: new URLSearchParams(credentials),
            })
            const response_: any = await response.json()

            if (response_?.error) {
              throw new Error(response_?.error_description || response_?.error)
            }

            const selectToken = pick(
              ['access_token', 'refresh_token', 'token_type', 'expires_in'],
              response_,
            ) as AuthToken

            selectToken.expires_in = Date.now() + selectToken.expires_in * 1000

            const userData = pick(
              ['mobile', 'userId', 'userRoleId', 'firstName', 'lastName', 'isAdvocate'],
              response_?.extraInfo,
            ) as SurrogateUser

            const userAvatar = await getAvatarCustomer(selectToken?.access_token, userData?.userId || '')
            const userAddress = await getUserAddress(selectToken?.access_token)

            return {
              ...selectToken,
              user: {
                partyId: userData?.userId,
                partyRoleId: userData?.userRoleId,
                userName: userData?.mobile,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                isSurrogateUser: userData?.isAdvocate,
                avatarUrl: userAvatar,
                address: userAddress,
              },
            }
          } catch (error) {
            throw new Error(error as string)
          }
        },
      }),
      Credentials({
        id: 'REFRESH_TOKEN',
        name: 'Refresh_token',
        credentials: {
          accessToken: { label: 'AccessToken', type: 'password' },
          refreshToken: { label: 'RefreshToken', type: 'password' },
          username: { label: 'Username', type: 'text' },
        },
        async authorize(credentials?: RefreshTokenCredential): Promise<User | null> {
          const selectToken = await tokenApi(
            {
              refresh_token: credentials?.refreshToken,
              grant_type: 'refresh_token',
            },
            'refreshToken',
            credentials?.accessToken,
          )

          const userData = await fetchCustomer(selectToken.access_token, credentials?.username)

          return {
            ...selectToken,
            user: { ...userData, userName: credentials?.username || '' },
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_JWT_SECRET,
    callbacks: {
      async jwt({ token, user: signInToken, trigger, session }: any): Promise<AuthToken> {
        // Signing in
        if (signInToken?.access_token) {
          return signInToken
        }

        if (trigger === 'update') {
          if (session.firstName) token.user.firstName = session.firstName
          if (session.lastName) token.user.lastName = session.lastName
          if (session.userName) token.user.userName = session.userName
          if (session.address) token.user.address = session.address
          if (typeof session.avatarUrl === 'string') token.user.avatarUrl = session.avatarUrl
        }

        if (Date.now() < token.expires_in) {
          return token
        }

        return refreshAccessToken(token)
      },
      async session({ session, token }: any): Promise<any> {
        if (token) {
          session.user = token.user
          session.accessToken = token.access_token
          session.refreshToken = token.refresh_token
          session.expires = new Date(token.expires_in).toISOString()
          session.error = token.error || null
        }
        return session
      },
    },
    pages: { signIn: '/' },
    debug: false,
    /*
     * Events: {
     *   async signOut(message: string) {
     *     console.log(message, '[EVENT][SIGN_OUT]')
     *   },
     *   async session(message: string) {
     *     console.log(message, '[EVENT][SESSION]')
     *   },
     * },
     */
    /*
     * Logger: {
     *   error(code, metadata) {
     *     console.log(code, metadata, '[LOGGER][ERROR]')
     *   },
     *   warn(code) {
     *     console.log(code, '[LOGGER][WARN]')
     *   },
     *   debug(code, metadata) {
     *     console.log(code, metadata, '[LOGGER][DEBUG]')
     *   },
     * },
     */
  }
  return defaultOptions
}

export const nextAuthOptions = nextAuthDefaultOptions()
