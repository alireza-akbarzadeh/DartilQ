import { Box, styled } from '@mui/material'

export const HBLoaderRootStyle = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  padding: 6,
  justifyContent: 'center',
  gap: 10,
  flexWrap: 'wrap',
  '& div': {
    width: 12,
    height: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .circle': {
    width: 12,
    height: 12,
    borderRadius: '51%',
    animation: 'circle-animation 1.5s linear infinite',
  },
  '&  .circle-Delay1': {
    animationDelay: '-0.5s',
  },
  '&  .circle-Delay2': {
    animationDelay: '0.25s',
  },
  '&  .circle-Delay3': {
    animationDelay: '0s',
  },

  '@keyframes circle-animation ': {
    '0%': {
      width: 0,
      height: 0,
    },
    '50%': {
      width: 12,
      height: 12,
    },
    '100%': {
      width: 0,
      height: 0,
    },
  },
}))
