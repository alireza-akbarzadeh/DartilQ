import { Box, Skeleton, Stack, Typography } from '@mui/material'

import { neutral } from '@/core/providers/material/theme'
import { GetMyWalletTransactionResponseItem } from '@/services/wallet-services/wallet.schemas'

import { TransactionItem } from './TransactionItem'

type WalletTransactionProps = {
  transactions: GetMyWalletTransactionResponseItem[]
  isLoading: boolean
}

export const WalletTransaction = (props: WalletTransactionProps): JSX.Element => {
  const { transactions, isLoading } = props

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Skeleton
          sx={{ borderRadius: 6, bgcolor: neutral[100] }}
          variant="rectangular"
          animation="wave"
          width={312}
          height={200}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ bgcolor: 'background.lightest', opacity: 0.5, height: 50, width: '100%' }} />
      <Box sx={{ bgcolor: 'background.light' }}>
        <Stack
          sx={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            px: 4,
            pt: 4,
            bgcolor: 'background.lightest',
            gap: 4,
            position: 'absolute',
            top: 0,
            width: '100%',
            pb: 4,
          }}
        >
          <Typography variant="labelLarge" color="textAndIcon.darker" px={2}>
            تاریخچه تراکنش‌های کیف پول
          </Typography>
          {transactions?.map(transaction => <TransactionItem transaction={transaction} key={transaction.id} />)}
        </Stack>
      </Box>
    </Box>
  )
}
