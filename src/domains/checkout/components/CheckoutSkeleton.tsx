'use client'

import { Box, Divider, Skeleton, Stack } from '@mui/material'

import { neutral } from '@/core/providers/material/theme'

export const CheckoutSkeleton = () => {
  return (
    <>
      <Stack sx={{ gap: 2, mt: 22, px: 4 }}>
        {[1, 2, 3].map(item => (
          <Box sx={{ display: 'flex', gap: 2 }} key={item}>
            <Skeleton
              sx={{ borderRadius: 4, bgcolor: neutral[100] }}
              variant="rectangular"
              animation="wave"
              width={30}
              height={30}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'background.light',
                alignSelf: 'start',
                height: 53,
                minWidth: 53,
              }}
            >
              <Skeleton
                sx={{ borderRadius: 2, bgcolor: neutral[100] }}
                variant="rectangular"
                animation="wave"
                width={53}
                height={53}
              />
            </Box>
            <Stack sx={{ gap: 2, flexGrow: 1 }}>
              <Skeleton
                sx={{ borderRadius: 2, bgcolor: neutral[100] }}
                variant="rectangular"
                animation="wave"
                height={43}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton
                  sx={{ borderRadius: 4, bgcolor: neutral[100] }}
                  variant="rectangular"
                  animation="wave"
                  width={70}
                  height={20}
                />
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Stack sx={{ gap: 4, pt: 4 }}>
        <Divider sx={{ color: 'border.lighter' }} />
        <Stack sx={{ gap: 2, px: 4 }}>
          <Box>
            <Skeleton
              sx={{ borderRadius: 2, bgcolor: neutral[100] }}
              variant="rectangular"
              animation="wave"
              width={120}
              height={30}
            />
          </Box>
          <Box>
            <Skeleton
              sx={{ borderRadius: 2, bgcolor: neutral[100] }}
              variant="rectangular"
              animation="wave"
              height={60}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  )
}
