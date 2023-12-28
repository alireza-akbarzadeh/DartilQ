import { Box, Skeleton } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

import { HBCarousel } from '@/core/components'
import { primary } from '@/core/providers/material/theme'
import { useGetWebWalletWalletsMeWallets } from '@/services/wallet-services/wallet'
import { GetCurrentUserWalletsResponse } from '@/services/wallet-services/wallet.schemas'
import { WalletDiscriminatorEnum } from '@/shared/types/enums'

import { Deposit } from './Deposit'
import { WalletCard } from './WalletCard'
import { Withdraw } from './Withdraw'

type WalletListProps = {
  setSelectedWallet: Dispatch<SetStateAction<GetCurrentUserWalletsResponse | undefined>>
  selectedWallet: GetCurrentUserWalletsResponse | undefined
  sumOfDeposit: number
  updateTransaction: () => void
}

export const WalletList = (props: WalletListProps) => {
  const { setSelectedWallet, selectedWallet, sumOfDeposit, updateTransaction } = props
  const { data: walletsData, refetch, isLoading } = useGetWebWalletWalletsMeWallets()
  const refreshWallet = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', py: 4 }}>
        <Skeleton
          sx={{ borderRadius: 4, bgcolor: primary[50] }}
          variant="rectangular"
          animation="wave"
          width={312}
          height={156}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <HBCarousel options={{ direction: 'rtl' }}>
        {walletsData?.data?.map(wallet => (
          <WalletCard key={wallet.id} {...{ wallet, refreshWallet, setSelectedWallet }} />
        ))}
      </HBCarousel>
      {selectedWallet?.discriminatorEnum === WalletDiscriminatorEnum.wallet && (
        <Box sx={{ display: 'flex', gap: 4, pt: 4, px: 4 }}>
          <Deposit walletId={selectedWallet?.id ?? ''} sumOfDeposit={sumOfDeposit} />
          <Withdraw
            selectedWallet={selectedWallet}
            updateTransaction={updateTransaction}
            refreshWallet={refreshWallet}
          />
        </Box>
      )}
    </Box>
  )
}
