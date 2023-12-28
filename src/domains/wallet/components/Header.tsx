'use client'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBIcon } from '@/core/components'

export const Header = (): JSX.Element => {
  const { back } = useRouter()
  const backRoute = () => {
    back()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        color: 'textAndIcon.darker',
        height: 56,
        px: 4,
        py: 2,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: 'background.lightest',
      }}
    >
      <HBIcon name="angleRight" onClick={backRoute} sx={{ cursor: 'pointer' }} />
      <Box>
        <Typography variant="titleMedium">کیف پول</Typography>
      </Box>
    </Box>
  )
}
