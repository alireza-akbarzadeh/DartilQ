import { Stack } from '@mui/material'

import { HBLoader } from '@/core/components'
import { useGetWebSaleRefundOrderGetRefundRequests } from '@/services/sale-services/sale'
import { NotFound } from '@/shared/components'

import { RenderRefundedList } from './render-items/RenderRefundedList'

export const OrderTrackingRefundedBody = (): JSX.Element => {
  const { data: deliveredData, isFetching: gettingLoading } = useGetWebSaleRefundOrderGetRefundRequests()

  const orders = deliveredData?.data?.items

  if (gettingLoading)
    return (
      <Stack sx={{ height: '100%' }} alignItems="center" justifyContent="center">
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </Stack>
    )
  if (!gettingLoading && orders?.length) return <RenderRefundedList orders={orders ?? []} />
  return <NotFound />
}
