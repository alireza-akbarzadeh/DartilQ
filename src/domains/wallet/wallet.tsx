'use client'
import { Box } from '@mui/material'
import { useState } from 'react'

import { useGetWebWalletWalletsMeTransactions } from '@/services/wallet-services/wallet'
import { GetCurrentUserWalletsResponse } from '@/services/wallet-services/wallet.schemas'

import { Header } from './components/Header'
import { WalletTransaction } from './components/transaction/WalletTransaction'
import { WalletList } from './components/WalletList'
import { WalletRules } from './components/WalletRules'

export const Wallet = () => {
  const [selectedWallet, setSelectedWallet] = useState<GetCurrentUserWalletsResponse>()
  const {
    data: walletTransactions,
    isLoading,
    refetch,
  } = useGetWebWalletWalletsMeTransactions(
    { WalletId: selectedWallet?.id, PageNumber: 1, PageSize: 100 },
    { query: { enabled: !!selectedWallet?.id } },
  )

  const updateTransaction = () => {
    refetch()
  }

  return (
    <Box sx={{ bgcolor: 'background.light' }}>
      <Header />
      <WalletList
        {...{
          setSelectedWallet,
          selectedWallet,
          sumOfDeposit: walletTransactions?.data?.sumOfDeposit?.amount ?? 0,
          updateTransaction,
        }}
      />
      <WalletRules />
      <WalletTransaction transactions={walletTransactions?.data?.transactions?.items ?? []} isLoading={isLoading} />
    </Box>
  )
}
