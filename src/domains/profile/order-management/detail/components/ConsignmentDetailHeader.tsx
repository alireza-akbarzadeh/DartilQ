import { Box, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { PropsWithChildren } from 'react'
import { FormattedMessage } from 'react-intl'

import { HBButton, HBIcon } from '@/core/components'
import { CommerceDetailTransaction } from '@/services/sale-services/sale.schemas'

import { withIcon, withText } from '../../components/ConsignmentStatus'
import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { ConsignmentStatusEnum } from '../../types'

interface ConsignmentHeaderProps {
  status: ConsignmentStatusEnum
  onClick: () => void
  removeOrderHistory?: boolean
  shoppingCartId: string
  transactions: CommerceDetailTransaction[]
  isRefund?: boolean
}

export const ConsignmentDetailHeader = (props: PropsWithChildren<ConsignmentHeaderProps>): JSX.Element => {
  const breakpointDownSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const { status, onClick, children, isRefund } = props

  return (
    <OrderTrackingDetailWrappers spacing={6}>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Typography color="common.black" variant={breakpointDownSm ? 'subtitle2' : 'subtitle1'}>
          <FormattedMessage {...OrderManagementMessages[isRefund ? 'requestDetail' : 'orderDetail']} />
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <HBButton sx={{ gap: 3, color: 'grey.700', pr: 0 }} variant="link" onClick={() => onClick()}>
            <Typography color="info.main" variant={breakpointDownSm ? 'body2' : 'button'}>
              <FormattedMessage {...OrderManagementMessages.back} />
            </Typography>
            <HBIcon sx={{ display: 'flex', color: 'info.main' }} name="arrowLeft" />
          </HBButton>
        </Box>
      </Stack>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Stack alignItems="center" direction="row" spacing={1}>
          {withIcon(status)}
          {withText(status, breakpointDownSm)}
        </Stack>
      </Stack>

      {children}
    </OrderTrackingDetailWrappers>
  )
}
