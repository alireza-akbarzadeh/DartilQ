import { Stack } from '@mui/material'

import { OrderManagementDetailPage } from '@/domains/profile/order-management/detail/components/OrderManagementDetailPage'
import { OrderType } from '@/domains/profile/order-management/types'
import { AppBarHeight, AppTopBar } from '@/shared/layout'

const Page = ({ params }: { params: { state: OrderType; id: string } }) => {
  return (
    <>
      <AppTopBar hasBackButton title="جزییات سفارش" />
      <Stack sx={{ height: '100dvh', pt: `${AppBarHeight}px` }}>
        <OrderManagementDetailPage id={params.id} state={params.state} />
      </Stack>
    </>
  )
}

export default Page
