import { Box, styled } from '@mui/material'

export const BannerStoreStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 140,
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    borderRadius: '0 90%  0 0',
    width: '100%',
    height: 20,
    backgroundColor: theme.palette.background.paper,
    bottom: -1,
    zIndex: 11,
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.darkest,
    opacity: 0.6,
    top: 0,
    zIndex: 10,
  },
}))

export const CategoryWrapperStyle = styled(Box)<{ numbordernthchild?: number }>(({ theme, numbordernthchild = 3 }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  [`& > div:nth-last-of-type(n + ${numbordernthchild})`]: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.border.lightest,
  },
  '& > div:nth-of-type(odd)': {
    borderRight: '1px solid',
    borderRightColor: theme.palette.border.lightest,
  },
}))
export const CategoryCardStyle = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 4),
  cursor: 'pointer',
}))
export const BlackCircleStyle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.background.darkest,
  borderRadius: theme.spacing(50),
  position: 'absolute',
  top: 52,
  display: 'flex',
  justifyContent: 'center',
  zIndex: 20,
}))
