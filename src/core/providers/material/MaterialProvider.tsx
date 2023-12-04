import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createTheme, StyledEngineProvider, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { FC, PropsWithChildren, ReactNode, useMemo } from 'react'

import { themeOptions } from './theme'

const CustomStyledProvider = ({ children, cache }: { children?: ReactNode; cache: EmotionCache }): JSX.Element => {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </StyledEngineProvider>
  )
}

const MaterialProvider: FC<
  PropsWithChildren<{
    theme?(themeOptions: ThemeOptions): Partial<ThemeOptions>
    hasLeaflet?: boolean
  }>
> = ({ theme, children, hasLeaflet = true }) => {
  const cdnURL = process.env['NEXT_PUBLIC_CDN']
  const innerTheme = theme?.(themeOptions)

  const usedTheme = useMemo(() => createTheme(innerTheme ?? themeOptions), [innerTheme])
  return (
    <ThemeProvider theme={usedTheme}>
      <link rel="stylesheet" href={`${cdnURL}/cdn/fonts/iranYekanX/Farsi_numerals/Webfonts/fontiran.css`} />
      <link rel="stylesheet" href={`${cdnURL}/cdn/fonts/unicons/css/line.css`} />

      {hasLeaflet && (
        <>
          <link rel="stylesheet" href={`${cdnURL}/cdn/leaflet.min.css`} />
          <link rel="stylesheet" href={`${cdnURL}/cdn/leaflet.draw.min.css`} />
        </>
      )}

      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export { CustomStyledProvider, MaterialProvider }
