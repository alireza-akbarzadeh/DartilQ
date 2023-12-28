import { Stack, SxProps } from '@mui/material'

import { OrderTrackingConsignmentHeaderSubText } from '../order-tracking.styles'

interface ConsignmentTextProps {
  title: string
  value: string
  sx?: SxProps
}

export const ConsignmentText = (props: ConsignmentTextProps) => {
  const { title, value, sx } = props
  return (
    <Stack direction="row" sx={sx}>
      <OrderTrackingConsignmentHeaderSubText color="grey.700" variant="subtitle2">
        {title}
      </OrderTrackingConsignmentHeaderSubText>

      <OrderTrackingConsignmentHeaderSubText
        className="text-value"
        color="text.primary"
        sx={{ userSelect: 'text !important' }}
        variant="subtitle2"
      >
        {value}
      </OrderTrackingConsignmentHeaderSubText>
    </Stack>
  )
}
