'use client'

import { Stack, styled, Tab, tabClasses, Tabs } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { SyntheticEvent } from 'react'
import { IntlProvider } from 'react-intl'

import { OrderType } from '../types'
import { OrderTrackingCanceledBody } from './OrderTrackingCanceledBody'
import { OrderTrackingDeliveredBody } from './OrderTrackingDeliveredBody'
import { OrderTrackingRefundedBody } from './OrderTrackingRefundedBody'

const OrderTrackingCurrentBody = dynamic(() =>
  import('./OrderTrackingCurrentBody').then(item => item.OrderTrackingCurrentBody),
)

const CustomTab = styled(Tab)(({ theme }) => ({
  [`&.${tabClasses.root}`]: { color: theme.palette.textAndIcon.dark },
  '&.Mui-selected': { color: theme.palette.textAndIcon.darker },
}))

type PropsType = {
  state: OrderType
}

const orderTackingBody: Record<OrderType, JSX.Element> = {
  current: <OrderTrackingCurrentBody />,
  canceled: <OrderTrackingCanceledBody />,
  delivered: <OrderTrackingDeliveredBody />,
  returned: <OrderTrackingRefundedBody />,
}

const OrderManagementPage = (props: PropsType) => {
  const { state } = props
  const { replace } = useRouter()
  const handleChange = (_: SyntheticEvent, newValue: OrderType) => {
    replace(`/profile/order-management/${newValue}`)
  }
  return (
    <Stack spacing={2} sx={{ height: '100%' }}>
      <Tabs value={state} onChange={handleChange} sx={{ px: 4 }}>
        <CustomTab value="current" label="جاری" />
        <CustomTab value="delivered" label="تحویل شده" />
        <CustomTab value="returned" label="مرجوع شده" />
        <CustomTab value="canceled" label="لغو شده" />
      </Tabs>
      <Stack
        spacing={2}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 4,
        }}
      >
        <IntlProvider locale="fa">{orderTackingBody[state]}</IntlProvider>
      </Stack>
    </Stack>
  )
}

export { OrderManagementPage }
