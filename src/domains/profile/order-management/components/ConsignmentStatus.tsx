import { Stack, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { HBIcon, HBIconType } from '@/core/components'

import { OrderManagementMessages } from '../order-management.messages'
import { ConsignmentStatusEnum } from '../types'

const statuses: Record<ConsignmentStatusEnum, { icon: HBIconType; color: string }> = {
  [ConsignmentStatusEnum.AwaitPayment]: { icon: 'hourglass', color: 'primary.main' },
  [ConsignmentStatusEnum.SystemCancel]: { icon: 'infoCircle', color: 'error.main' },
  [ConsignmentStatusEnum.Canceled]: { icon: 'infoCircle', color: 'error.main' },
  [ConsignmentStatusEnum.Delivered]: { icon: 'check', color: 'info.dark' },
  [ConsignmentStatusEnum.Paid]: { icon: 'check', color: 'success.main' },
  [ConsignmentStatusEnum.Returned]: { icon: 'times', color: 'warning.main' },
  [ConsignmentStatusEnum.PendingReturned]: { icon: 'clockTwo', color: 'warning.main' },
  [ConsignmentStatusEnum.AwaitPartialPayment]: { icon: 'hourglass', color: 'primary.main' },
  [ConsignmentStatusEnum.Rejected]: { icon: 'infoCircle', color: 'warning.main' },
}

export const withIcon = (type: ConsignmentStatusEnum): JSX.Element => (
  <Stack
    alignItems="center"
    justifyContent="center"
    sx={{ bgcolor: statuses[type].color, borderRadius: '100%', p: 0.25 }}
  >
    <HBIcon
      size="small"
      sx={{
        color: 'common.white',
        fontSize: 20,
        lineHeight: 0,
        transform: statuses[type].icon === 'infoCircle' ? 'rotate(180deg)' : 'unset',
      }}
      name={statuses[type].icon}
    />
  </Stack>
)

export const withText = (type: ConsignmentStatusEnum, breakpointDownSm?: boolean): JSX.Element => (
  <Typography color={statuses[type].color} variant={breakpointDownSm ? 'subtitle2' : 'subtitle1'}>
    <FormattedMessage {...OrderManagementMessages[type]} />
  </Typography>
)
