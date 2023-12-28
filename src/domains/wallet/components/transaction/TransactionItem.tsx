import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'
import { format } from 'date-fns-jalali'

import { HBIcon } from '@/core/components'
import { glyphy } from '@/core/utils'
import { GetMyWalletTransactionResponseItem } from '@/services/wallet-services/wallet.schemas'

type TransactionItemProps = {
  transaction?: GetMyWalletTransactionResponseItem
}

type RowItemProps = { title: string; value: string; valueColor?: string; sx?: SxProps<Theme> }
const RowItem = (props: RowItemProps): JSX.Element => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      ...props?.sx,
    }}
  >
    <Typography color="textAndIcon.light" variant="labelMedium">
      {props.title}
    </Typography>
    <Typography color={props.valueColor ?? 'textAndIcon.light'} variant="labelMedium">
      {props.value}
    </Typography>
  </Box>
)

export const TransactionItem = (props: TransactionItemProps): JSX.Element => {
  const { transaction } = props
  const isDeposit = (transaction?.amount?.amount ?? 0) > 0

  return (
    <Stack
      sx={{
        borderRadius: 6,
        border: '1px solid',
        borderColor: 'border.lightest',
        p: 4,
        gap: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: isDeposit ? 'success.dark' : 'error.dark' }}>
        <Typography variant="labelMedium">{isDeposit ? 'واریز' : 'برداشت'}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography variant="labelLarge">
            {`${transaction?.amount?.amount?.toLocaleString().replace('-', '')} ${glyphy(
              transaction?.amount?.unitTitle,
            )}`}
          </Typography>
          <HBIcon name={isDeposit ? 'arrowUp' : 'arrowDown'} size="small" />
        </Box>
      </Box>
      <RowItem title="دلیل" value={transaction?.discriminator ?? ''} valueColor="textAndIcon.darker" />
      <RowItem title="تاریخ واریز" value={format(new Date(transaction?.actualDate ?? ''), ' hh:mm  ،yyyy/MM/dd')} />
      {transaction?.effectiveDate && (
        <RowItem title=" تاریخ شروع استفاده" value={format(new Date(transaction?.effectiveDate ?? ''), 'yyyy/MM/dd')} />
      )}
      {transaction?.expireDate && (
        <RowItem title=" تاریخ انقضا اعتبار" value={format(new Date(transaction?.expireDate ?? ''), 'yyyy/MM/dd')} />
      )}
      {transaction?.description && (
        <RowItem title="توضیحات:" value={transaction?.description} sx={{ justifyContent: 'start', gap: 1 }} />
      )}
    </Stack>
  )
}
