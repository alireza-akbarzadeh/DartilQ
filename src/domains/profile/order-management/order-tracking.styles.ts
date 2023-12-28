import { Box, Stack, styled, Typography } from '@mui/material'

export const OrderTrackingConsignmentBodyStyles = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.spacing(4),
    border: `1px solid ${theme.palette.background.default}`,
    padding: theme.spacing(4, 4),
  },
}))

export const OrderTrackingConsignmentHeaderTextWrapper = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  display: 'flex',
}))

export const OrderTrackingConsignmentHeaderSubText = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
}))

export const OrderTrackingDetailWrappers = styled(Stack)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.common.white,
}))

export const OrderTRackingBody = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(6, 3),
  [theme.breakpoints.up('sm')]: {
    borderRadius: 8,
  },
}))

export const CancelConsignmentResultWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '100%',
    width: '100%',
  },
}))

export const RefundActionWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '100%',
    width: 384,
  },
}))

export const Bullet = styled(Box)<{ type: 'success' | 'info' | 'secondary' | 'error' }>(({ theme, type }) => ({
  width: 5,
  height: 5,
  backgroundColor: theme.palette[type].main,
  borderRadius: 50,
}))

export const ImageWrapperStyle = styled(Box)(() => ({
  position: 'relative',
  overflow: 'hidden',
  flexShrink: 0,
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export const QuantityWrapperStyle = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(0.5),
  width: 20,
  height: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: -20,
  bottom: 0,
}))

export const QuantityWrapperStyles = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  bottom: 0,
  left: 0,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 0.5,
  padding: theme.spacing(0, 1.25),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
}))

export const ImageWrapperStyles = styled(Box)(() => ({
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
