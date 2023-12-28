import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'

interface ConsignmentDescriptionProps {
  description?: string | null
}

export const ConsignmentDescription = (props: ConsignmentDescriptionProps): JSX.Element => {
  const { description } = props
  const { formatMessage } = useIntl()

  return (
    <OrderTrackingDetailWrappers alignItems="flex-end" direction="row" justifyContent="start" spacing={13.5}>
      <Typography variant="h6">{formatMessage(OrderManagementMessages.description)}</Typography>
      <Typography color="text.primary" sx={{ userSelect: 'text !important' }} variant="subtitle2">
        <Box
          component="span"
          dangerouslySetInnerHTML={{
            __html: description?.replace(/(\r\n|\n|\r)/gm, '<br />') || '',
          }}
        />
      </Typography>
    </OrderTrackingDetailWrappers>
  )
}
