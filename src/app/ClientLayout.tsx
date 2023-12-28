'use client'
import '../../public/styles.css'

import createCache, { EmotionCache } from '@emotion/cache'
import { Container } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import rtlPlugin from 'stylis-plugin-rtl'

import { CustomStyledProvider, MaterialProvider } from '@/core/providers/material/MaterialProvider'
import { getQueryClient } from '@/core/utils/getClientQuery'

import { fnUseSW } from '../../public/pwa-sw'

// Create rtl cachex
const createEmotionCache = (isRtl?: boolean): EmotionCache =>
  createCache({
    key: isRtl ? 'muirtl' : 'muiltr',
    stylisPlugins: isRtl ? [rtlPlugin] : [],
    prepend: true,
  })

fnUseSW(process.env.NEXT_PUBLIC_CDN)

const ClientLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const clientSideEmotionCache = useMemo(() => createEmotionCache(true), [])

  return (
    <MaterialProvider
      hasLeaflet={false}
      theme={themeOptions => ({
        ...themeOptions,
        components: {
          ...themeOptions.components,
        },
      })}
    >
      <Script src="/liveStreamScript.js" />
      <Container
        maxWidth="sm"
        sx={{ minHeight: '100dvh', height: '100dvh', py: { xs: 0 }, px: { xs: 0 }, width: '100%' }}
        id="root"
      >
        <SessionProvider refetchInterval={3 * 60}>
          <QueryClientProvider client={getQueryClient()}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
            <CustomStyledProvider cache={clientSideEmotionCache}>{children}</CustomStyledProvider>
          </QueryClientProvider>
        </SessionProvider>
      </Container>
    </MaterialProvider>
  )
}

export { ClientLayout }
