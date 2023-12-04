import { CallbacksOptions, NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type AuthToken = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  user: Session['user']
  error?: string | null
} & JWT

type f = Omit<Parameters<CallbacksOptions['jwt']>[0], 'session' | 'token' | 'user'>

export type JWTCallbackParameterType = f & {
  token: AuthToken
  user: Partial<AuthToken>
  session: Partial<Session['user']>
}

type SessionType = Omit<Parameters<CallbacksOptions['session']>[0], 'token'>

export type SessionCallbackParameterType = Omit<SessionType, 'token'> & {
  token: AuthToken
}

export type SignInCredentials = {
  username: string
  password?: string
  captcha?: string
  loginType?: string
  otp?: string
  otpToken?: string
  clientSessionId?: string
  recentSearches?: string
  accessToken?: string
  refreshToken?: string
}

export type SurrogateUser = {
  mobile: string
  userId: string
  userRoleId: string
  firstName: string
  lastName: string
  isAdvocate: boolean
  advocateFullName: string
}

export type NextAuthParameterOptions =
  | NextAuthOptions
  | Record<string, unknown>
  | ((defaultOptions: NextAuthOptions) => NextAuthOptions | Record<string, unknown>)

export type CreateCustomerCredential = {
  username: string
  password?: string
  firstName?: string
  lastName?: string
  nationalCode?: string
  provider?: string
  otpToken?: string
  recentSearches?: string
  clientSessionId?: string | null
}

export type RefreshTokenCredential = {
  accessToken: string
  refreshToken: string
  username: string
}

export type AccessToken = {
  grant_type?: 'password' | 'refresh_token'
  scope?: 'offline_access'
  username?: string
  password?: string
  refresh_token?: string
  tinyToken?: string
}
