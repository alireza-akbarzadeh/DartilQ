'use client'

import { Skeleton, Stack } from '@mui/material'

import { neutral } from '@/core/providers/material/theme'

const SearchSkeleton = () => {
  return (
    <Stack spacing={2} px={4}>
      <Skeleton
        sx={{ borderRadius: 9, bgcolor: neutral[100] }}
        variant="rectangular"
        animation="wave"
        width={126}
        height={32}
      />
      <Skeleton
        sx={{ borderRadius: 9, bgcolor: neutral[100] }}
        variant="rectangular"
        animation="wave"
        width={126}
        height={32}
      />
    </Stack>
  )
}

export { SearchSkeleton }
