import { Box, Stack } from '@mui/material'

import { SearchTopBar } from '@/domains/search'
import { AppTopBar } from '@/shared/layout'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ bgcolor: 'common.white', height: '100%' }}>
      <AppTopBar hasBackButton>
        <Stack sx={{ pl: 2, flex: 1 }}>
          <SearchTopBar />
        </Stack>
      </AppTopBar>
      <Box sx={{ pt: 18 }}>{children}</Box>
    </Box>
  )
}

export default Layout
