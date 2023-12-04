import { Box } from '@mui/material'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ bgcolor: 'common.white' }}>{children}</Box>
}

export default Layout
