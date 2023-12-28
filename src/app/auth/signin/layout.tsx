'use client'
import { Box } from '@mui/material'

import { HBNextImage } from '@/core/components/index'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      bgcolor="primary.main"
      minHeight={'100vh'}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        flexGrow={1}
        sx={{
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            borderRadius: '0 90%  0 0',
            width: '100%',
            height: 20,
            backgroundColor: 'background.paper',
            bottom: -1,
          },
        }}
      >
        <HBNextImage
          isLocal
          src={'/assets/svg/logoWhite.svg'}
          alt="logo"
          width={80}
          height={80}
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(50%, -50%)',
          }}
        />
      </Box>

      <Box bgcolor={'background.lightest'} bottom={0} px={4} pb={6} pt={3}>
        {children}
      </Box>
    </Box>
  )
}
