import { Stack, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

import { HBButton, HBIcon } from '@/core/components'

import { ConsignmentStatusEnum } from '../types'
import { withIcon, withText } from './ConsignmentStatus'

type ConsignmentHeaderProps = {
  status: ConsignmentStatusEnum
  onClick: () => void
  isRefund?: boolean
}

export const ConsignmentHeader = (props: PropsWithChildren<ConsignmentHeaderProps>): JSX.Element => {
  const { status, onClick, children, isRefund } = props

  return (
    <Stack spacing={4}>
      <Stack alignItems="center" direction="row" justifyContent="space-between" mb={2}>
        <Stack alignItems="center" direction="row" spacing={1}>
          {withIcon(status)}
          {withText(status)}
        </Stack>
        <HBButton sx={{ pr: '0!important' }} variant="link" onClick={() => onClick()}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography color="common.black" variant="subtitle1">
              {isRefund ? 'جزئیات درخواست' : 'جزئیات سفارش'}
            </Typography>
            <HBIcon sx={{ color: 'grey.700', display: 'flex' }} name="angleLeft" />
          </Stack>
        </HBButton>
      </Stack>
      {children}
    </Stack>
  )
}
