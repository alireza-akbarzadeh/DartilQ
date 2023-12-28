import { Box, styled } from '@mui/material'

export const WrapperInstallAppButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: 144,
  height: 48,
  padding: '8px 16px 8px 10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
}))
