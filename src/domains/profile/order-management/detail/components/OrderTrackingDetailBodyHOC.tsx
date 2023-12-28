import { Stack } from '@mui/material'
import { PropsWithChildren } from 'react'

export const OrderTrackingDetailBodyHOC = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <Stack
      spacing={4}
      sx={theme => ({
        [theme.breakpoints.down('sm')]: {
          backgroundColor: 'common.white',
        },
      })}
    >
      {children}
    </Stack>
  )
}
