import { Stack } from '@mui/material'

import { HBLoader } from '@/core/components'
import { useGetWebSaleOrdersOrderList } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { OrderServiceSectionEnum } from '../types'
import { RenderCanceledList } from './render-items/RenderCanceledList'

export const OrderTrackingCanceledBody = (): JSX.Element => {
  const { isFetching: gettingLoading, data: cancelData } = useGetWebSaleOrdersOrderList({
    Section: OrderServiceSectionEnum.Canceled,
  })

  if (gettingLoading)
    return (
      <Stack sx={{ height: '100%' }} alignItems="center" justifyContent="center">
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </Stack>
    )
  if (!gettingLoading && cancelData?.data?.orders?.length)
    return <RenderCanceledList orders={cancelData.data.orders ?? []} />
  return <NotFound />
}
