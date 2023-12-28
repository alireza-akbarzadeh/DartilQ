import { Stack } from '@mui/material'

import { HBLoader } from '@/core/components'
import { useGetWebSaleOrdersOrderList } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { OrderServiceSectionEnum } from '../types'
import { RenderCurrentList } from './render-items/RenderCurrentList'
export const OrderTrackingCurrentBody = (): JSX.Element => {
  const { data: currentData, isFetching: gettingLoading } = useGetWebSaleOrdersOrderList({
    Section: OrderServiceSectionEnum.Current,
  })

  if (gettingLoading)
    return (
      <Stack sx={{ height: '100%' }} alignItems="center" justifyContent="center">
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </Stack>
    )
  if (!gettingLoading && currentData?.data?.orders?.length)
    return <RenderCurrentList orders={currentData?.data?.orders ?? []} />
  return <NotFound />
}
