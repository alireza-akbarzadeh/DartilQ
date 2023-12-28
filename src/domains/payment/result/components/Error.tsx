'use client'

import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { HBButton, HBNextImage } from '@/core/components'

export const Error = () => {
  return (
    <Stack sx={{ justifyContent: 'flex-end', height: '100%' }}>
      <Stack sx={{ gap: 8 }}>
        <Box sx={{ display: 'flex', px: 8 }}>
          <HBNextImage src="/assets/png/error.png" alt="error" quality={100} width={96} height={96} isLocal />
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: 227,
            backgroundImage: 'url(/assets/png/errorBackground.png)',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Stack sx={{ display: 'flex', px: 8, gap: 2 }}>
            <Typography variant="titleMedium" color="textAndIcon.darker">
              پرداخت ناموفق بود!
            </Typography>
            <Typography variant="bodyMedium" color="textAndIcon.darker">
              متاسفانه در روند پرداخت مشکلی پیش آمده است. لطفا دوباره تلاش کنید.
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
        <Link href="/">
          <HBButton variant="secondary" sx={{ minWidth: 156 }}>
            بازگشت به خانه
          </HBButton>
        </Link>
        <Link href="/">
          <HBButton variant="primary" sx={{ minWidth: 156 }}>
            تلاش دوباره
          </HBButton>
        </Link>
      </Box>
    </Stack>
  )
}
