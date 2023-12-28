import { Stack, styled } from '@mui/material'

export const HBLoaderRootStyle = styled(Stack)(({ theme }) => ({
  position: 'relative',
  height: '100dvh',
  backgroundColor: theme.palette.primary.main,
  '& .rounded-box-Loader': {
    position: 'absolute',
    top: '30%',
    right: '35%',
    animation: 'animation 2s linear infinite',
  },
  '@keyframes animation ': {
    '0%': {
      top: '30%',
    },
    '50%': {
      top: '27%',
    },
    '100%': {
      top: '30%',
    },
  },
}))
