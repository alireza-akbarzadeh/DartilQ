import { Stack, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { useIntl } from 'react-intl'

import { HBLoader } from '@/core/components'
import { useGetWebCMSContentsEntityTypeIdEntityId } from '@/services/cms-services/cms'

import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { EntityTypeEnums } from '../../types'
import { ProductRefundImage } from './ProductRefundImage'

interface RefundCardProps {
  reason: string
  complaint: string
}

export const ProductRefundInformation = ({ reason, complaint }: RefundCardProps): JSX.Element => {
  const { formatMessage } = useIntl()
  const params = useParams()

  console.log('params', params)

  const shoppingCartId = '10'

  const { isLoading, data: refundImageData } = useGetWebCMSContentsEntityTypeIdEntityId(
    EntityTypeEnums.RefundFile,
    shoppingCartId,
    { factor: 'file' },
  )

  if (isLoading)
    return (
      <OrderTrackingDetailWrappers spacing={6}>
        <HBLoader type="line" circleSx={{ bgcolor: 'primary.main' }} />
      </OrderTrackingDetailWrappers>
    )

  return (
    <>
      {reason && (
        <Stack direction="row" gap={2}>
          <Typography color="primary.main" variant="subtitle2">
            {formatMessage({ ...OrderManagementMessages.refundProductReason })}:
          </Typography>
          <Typography color="grey.900" variant="subtitle2">
            {reason}
          </Typography>
        </Stack>
      )}
      {complaint && (
        <Stack direction="row" gap={2} mt={2}>
          <Typography color="primary.main" variant="subtitle2">
            {formatMessage({ ...OrderManagementMessages.refundComplaint })}:
          </Typography>
          <Typography color="grey.900" variant="subtitle2">
            {complaint}
          </Typography>
        </Stack>
      )}
      {refundImageData?.data?.items?.map(item => (
        <ProductRefundImage fileUrl={item.value ?? ''} key={item.id} type={item.contentType} />
      ))}
    </>
  )
}
