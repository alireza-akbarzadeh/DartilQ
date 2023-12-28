import { Stack } from '@mui/material'

import { OrderManagementPage } from '@/domains/profile/order-management/components/OrderManagementPage'
import { OrderType } from '@/domains/profile/order-management/types'
import { AppBarHeight, AppTopBar } from '@/shared/layout'

const Page = ({ params }: { params: { state: OrderType } }) => {
  return (
    <>
      <AppTopBar hasBackButton title="سفارش ها" />
      <Stack sx={{ height: '100dvh', pt: `${AppBarHeight}px` }}>
        <OrderManagementPage state={params.state} />
      </Stack>
    </>
  )
}

export default Page
