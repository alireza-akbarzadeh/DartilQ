import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'

interface CancelReasonProps {
  title: string
  cancelReason?: string
  cancelReasonId?: string
  sx?: SxProps<Theme>
}

export const CancelReason = (props: CancelReasonProps): JSX.Element => {
  const {
    title,
    cancelReason,
    // CancelReasonId,
    sx,
  } = props
  // Const { pageType } = useConsignmentCancelation()

  /*
   * Const { data } = useGetWebSaleOrderGetReasonsTransitionFromStateCodeToStateCodeStateMachineCodeFactor({
   *   fromStateCode:
   *     pageType === OrderPageTypeEnum.Current ? OrderStateCode.Paid.toString() : OrderStateCode.AwaitPayment.toString(),
   *   toStateCode: OrderStateCode.CanceledByUser.toString(),
   *   stateMachineCode: CancelOrderStateCode.StateMachineCode,
   *   factor: CancelOrderStateCode.Factor,
   * })
   */

  return (
    <Box
      gap={2}
      sx={{
        border: theme => `1px solid ${theme.palette.primary.main}`,
        borderRadius: 2,
        padding: theme => theme.spacing(1.5, 4),
        display: 'flex',
        alignItems: 'center',
        mb: 4,
        height: 40,
        ...sx,
      }}
    >
      <Typography color="primary.main" typography="overline">
        {title}:
      </Typography>
      <Typography color="grey.900" typography="overline">
        {cancelReason && cancelReason}
        {/* {cancelReasonId && data?.data?.transitionsResult?.find(item => item.reasonId === cancelReasonId)?.reasonTitle} */}
      </Typography>
    </Box>
  )
}
