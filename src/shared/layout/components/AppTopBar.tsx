'use client'

import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'

import { AppBarHeight } from '../constants'

type AppBarProps = {
  title?: string
  hasBackButton?: boolean
  backUrl?: string
}

const AppTopBar = (props: React.PropsWithChildren<AppBarProps>) => {
  const router = useRouter()
  const goBack = () => (props.backUrl ? router.replace(props.backUrl) : router.back())
  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={4}
      sx={{
        px: 4,
        position: 'fixed',
        top: 0,
        outline: '1px solid',
        outlineColor: neutral[100],
        bgcolor: 'common.white',
        width: '100%',
        maxWidth: theme => theme.breakpoints.values.sm,
        zIndex: theme => theme.zIndex.appBar,
        minHeight: AppBarHeight,
      }}
    >
      {props.hasBackButton && (
        <HBIcon onClick={goBack} size="small" sx={{ color: 'common.black', cursor: 'pointer' }} name="angleRight" />
      )}

      {props.title && (
        <Typography noWrap variant="titleMedium" color={neutral[800]}>
          {props.title}
        </Typography>
      )}

      {props.children}
    </Stack>
  )
}

export { AppTopBar }
