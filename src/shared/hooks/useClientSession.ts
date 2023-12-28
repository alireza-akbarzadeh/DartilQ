import { useEffect, useMemo, useState } from 'react'

const clientSessionStorageKey = 'client-session'

export const useClientSession = (): string | null => {
  const [clientSession, setClientSession] = useState<string | null>(null)
  useEffect(() => {
    const valuingClientSession = (): void => {
      if (typeof window !== 'undefined') {
        if (localStorage.getItem(clientSessionStorageKey)) {
          setClientSession(localStorage.getItem(clientSessionStorageKey))
        } else {
          setClientSession('')
        }
      }
    }

    valuingClientSession()
  }, [])

  const memorizedValue = useMemo(() => clientSession, [clientSession])

  return memorizedValue
}
