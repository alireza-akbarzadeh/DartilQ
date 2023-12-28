import { Stack } from '@mui/material'

import { HBLoader } from '@/core/components'
import { useGetWebSaleOrdersOrderList } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { OrderServiceSectionEnum } from '../types'
import { RenderDeliveredList } from './render-items/RenderDeliveredList'

export const OrderTrackingDeliveredBody = (): JSX.Element => {
  const { data: deliveredData, isFetching: gettingLoading } = useGetWebSaleOrdersOrderList({
    Section: OrderServiceSectionEnum.Delivered,
  })

  if (gettingLoading)
    return (
      <Stack sx={{ height: '100%' }} alignItems="center" justifyContent="center">
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </Stack>
    )
  if (!gettingLoading && deliveredData?.data?.orders?.length)
    return <RenderDeliveredList orders={deliveredData.data.orders ?? []} />
  return <NotFound />
}
