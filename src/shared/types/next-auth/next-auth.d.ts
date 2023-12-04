import { DefaultSession, DefaultUser } from 'next-auth'

import { SessionAddress } from '@/domains/address'
import { AuthToken } from '@/shared/types/next-auth/next-auth-types'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user: {
      firstName: string
      lastName: string
      partyId: string
      partyRoleId: string
      userName: string
      isSurrogateUser: boolean
      avatarUrl?: string
      address?: SessionAddress
    }
    accessToken: string
    refreshToken: string
    error: string | null
  } & Omit<DefaultSession, 'user'>

  type User = {
    id?: string
  } & Omit<DefaultUser, 'id'> &
    AuthToken
}
