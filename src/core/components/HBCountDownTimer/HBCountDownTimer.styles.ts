import { styled, Typography } from '@mui/material'

export const HBCountDownTimerRootStyle = styled('span')(({ theme }) => ({
  color: theme.palette.textAndIcon.darker,
  display: 'flex',
  alignItems: 'center',
  direction: 'rtl',
  '& h5,& p': {
    marginRight: theme.spacing(2),
  },
}))

export const RefreshCodeStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&.refresh-btn': {
    color: theme.palette.info.main,
    cursor: 'pointer',
  },
  '&.refresh-btn-disabled': {
    color: theme.palette.grey[400],
  },
  '.resend-code': {
    marginLeft: theme.spacing(1.8),
  },
  i: {
    fontSize: '1.5rem',
    display: 'flex',
  },
}))
