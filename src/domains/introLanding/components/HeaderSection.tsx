'use client'
import { Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

import { HBIcon, HBNextImage, HBRoundedBox } from '@/core/components'

type HeaderSectionProps = {
  setOpenBottomSheet: Dispatch<SetStateAction<boolean>>
}

export const HeaderSection = ({ setOpenBottomSheet }: HeaderSectionProps): JSX.Element => {
  const { spacing } = useTheme()
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
        <HBNextImage isLocal alt="logo" height={17} src="/assets/svg/dartilLogo.svg" width={60} />
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
          pt: 3,
          height: 384,
          backgroundColor: 'primary.main',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            background: 'url(/assets/png/logo3.png) no-repeat ',
            width: '100%',
            height: 315,
            backgroundSize: '100% 100%',
            flexDirection: 'column',
            px: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Box sx={{ color: 'common.white' }}>
              <Typography variant="titleMedium">خرید از نزدیکترین فروشگاه!</Typography>
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
              onClick={() => setOpenBottomSheet(true)}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <HBIcon name="locationPoint" />
                <Typography variant="bodySmall">ابتدا آدرس خود را وارد کنید</Typography>
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
      </Box>
    </>
  )
}
