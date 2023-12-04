import { QueryClient } from '@tanstack/react-query'

export const getQueryClientSsr = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 0,
      },
    },
  })
