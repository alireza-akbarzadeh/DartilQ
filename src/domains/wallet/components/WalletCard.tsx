import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { HBIcon, HBNextImage } from '@/core/components'
import { primary, secondary } from '@/core/providers/material/theme'
import { glyphy } from '@/core/utils'
import { GetCurrentUserWalletsResponse } from '@/services/wallet-services/wallet.schemas'
import { useIsInViewport } from '@/shared/hooks/useIsInViewport'
import { WalletDiscriminatorEnum } from '@/shared/types/enums'

type WalletCardProps = {
  wallet: GetCurrentUserWalletsResponse
  refreshWallet: () => void
  setSelectedWallet: Dispatch<SetStateAction<GetCurrentUserWalletsResponse | undefined>>
  sx?: SxProps<Theme>
}

export const WalletCard = (props: WalletCardProps) => {
  const { sx, wallet, refreshWallet, setSelectedWallet } = props
  const [walletRef, setWalletRef] = useState<HTMLElement>()
  const { isIntersecting: isWalletVisible } = useIsInViewport(walletRef ?? document.body, { threshold: 1.0 })

  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setWalletRef(node)
    }
  }, [])

  useEffect(() => {
    if (isWalletVisible) {
      setSelectedWallet(wallet)
    }
  }, [isWalletVisible])
  const mainColor = wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet ? primary[600] : secondary[600]
  const secondaryColor = wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet ? primary[100] : secondary[100]
  return (
    <Box sx={{ position: 'relative', ml: 4 }} ref={callbackRef}>
      <Box
        sx={{
          background: `linear-gradient(to bottom left, ${mainColor}, ${secondaryColor} 60%, transparent 60%),
                 linear-gradient(to top right, ${mainColor},  ${secondaryColor} 30%,  ${secondaryColor} 30%)`,
          borderRadius: 4,
          opacity: 0.2,
          width: 312,
          height: 156,
        }}
      />
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          width: 312,
          height: 156,
          px: 4,
          py: 2,
          gap: 2,
          ...sx,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Stack sx={{ justifyContent: 'space-between', width: '60%', height: 140 }}>
            <Box sx={{ py: 2 }}>
              <Typography variant="titleMedium">{wallet?.persianDiscriminator}</Typography>
            </Box>
            {wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet && (
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <HBNextImage alt="dartil" src="/assets/svg/dartil.svg" isLocal width={24} height={24} />
              </Box>
            )}
            {wallet.discriminatorEnum === WalletDiscriminatorEnum.creditCard && (
              <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Typography variant="titleSmall">{wallet?.companyName}</Typography>
              </Box>
            )}
          </Stack>
          <Stack sx={{ width: '40%', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2,
                px: 2,
                py: 1,
                bgcolor: 'rgba(225, 227, 229, 0.60)',
                height: 40,
              }}
            >
              <Typography variant="titleMedium">{wallet?.logicalBalance?.amount?.toLocaleString()}</Typography>
              <Typography variant="titleMedium">{glyphy(wallet?.logicalBalance?.unitTitle)}</Typography>
            </Box>
            {wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet && (wallet?.balance?.amount ?? 0) > 0 && (
              <Stack sx={{ alignItems: 'flex-end', px: 2, height: 40 }}>
                <Typography variant="smallCaption">موجودی قابل استفاده:</Typography>
                <Typography variant="titleSmall">
                  {`${wallet?.balance?.amount?.toLocaleString()} ${glyphy(wallet?.balance?.unitTitle)}`}
                </Typography>
              </Stack>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'end',
                p: 2,
                height: 40,
                cursor: 'pointer',
              }}
              onClick={refreshWallet}
            >
              <Typography variant="bodySmall">موجودی</Typography>
              <HBIcon name="redo" size="xSmall" />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
