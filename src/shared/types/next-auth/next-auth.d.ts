import { DefaultSession, DefaultUser } from 'next-auth'

import { AuthToken, UserType } from '@/shared/types/next-auth/next-auth-types'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user: UserType
    accessToken: string
    refreshToken: string
    error: string | null
  } & Omit<DefaultSession, 'user'>

  type User = {
    id?: string
  } & Omit<DefaultUser, 'id'> &
    AuthToken
}

declare module 'next-auth/jwt' {
  type JWT = {
    user: UserType
  }
}
