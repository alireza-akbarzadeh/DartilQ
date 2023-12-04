'use client'
import { Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'

import { HBIcon, HBRoundedBox } from '@/core/components'
import { HBNextImage } from '@/core/components'

import { introLandingMessages } from '../introLanding.messages'

export const HeaderSection = (): JSX.Element => {
  const { spacing } = useTheme()
  const { formatMessage } = useIntl()
  const { push } = useRouter()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: spacing(2, 4),
          backgroundColor: 'primary.main',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <HBNextImage isLocal alt="logo" height={38} src="/assets/png/logoDartil.png" width={38} />
        <HBRoundedBox
          size={40}
          sx={{ backgroundColor: 'primary.dark', color: 'common.white' }}
          onClick={() => push('/auth/signin')}
        >
          <HBIcon name="user" />
        </HBRoundedBox>
      </Box>
      <Box
        sx={{
          display: 'flex',
          padding: spacing(6, 4, 2, 4),
          height: 364,
          backgroundColor: 'primary.main',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingX: spacing(4),
          }}
        >
          <HBNextImage isLocal alt="logo" height={178} src="/assets/png/logo.png" width={328} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Box sx={{ color: 'common.white' }}>
            <Typography variant="titleMedium">{formatMessage(introLandingMessages.nearStore)}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              padding: spacing(0, 2),
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '12px',
              backgroundColor: 'common.white',
              height: 48,
              cursor: 'pointer',
            }}
            onClick={() => push('/auth/signin')}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <HBIcon name="locationPoint" />
              <Typography variant="bodySmall">{formatMessage(introLandingMessages.chooseAddress)}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '24px 8px 8px 8px',
                backgroundColor: 'primary.dark',
                color: 'common.white',
                width: 43,
                height: 40,
              }}
            >
              <HBIcon name="search" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
