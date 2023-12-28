'use client'

import { Stack } from '@mui/material'
import { IntlProvider } from 'react-intl'

import { OrderType } from '../../types'
import { OrderTrackingCanceledDetail } from './OrderTrackingCanceledDetail'
import { OrderTrackingCurrentDetail } from './OrderTrackingCurrentDetail'
import { OrderTrackingDeliveredDetail } from './OrderTrackingDeliveredDetail'
import { OrderTrackingRefundDetail } from './OrderTrackingRefundDetail'

const renderFunction = (orderId: string): Record<OrderType, JSX.Element> => {
  return {
    current: <OrderTrackingCurrentDetail orderId={orderId} />,
    canceled: <OrderTrackingCanceledDetail orderId={orderId} />,
    delivered: <OrderTrackingDeliveredDetail orderId={orderId} />,
    returned: <OrderTrackingRefundDetail orderId={orderId} />,
  }
}

type PropsType = {
  state: OrderType
  id: string
}

const OrderManagementDetailPage = (props: PropsType) => {
  const { id, state } = props
  return (
    <Stack
      spacing={2}
      sx={{
        flex: 1,
        overflowY: 'auto',
        px: 4,
        py: 2,
      }}
    >
      <IntlProvider locale="fa">{renderFunction(id)[state]}</IntlProvider>
    </Stack>
  )
}

export { OrderManagementDetailPage }
