import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import { HBNextImage } from '@/core/components'
import { grey } from '@/core/providers/material/theme'
import { GetBanksQueryResult } from '@/services/generalData-services/generalData.schemas'
import { GetBankAccountModel } from '@/services/idr-services/idr.schemas'
import { GetCurrentUserWalletsResponse } from '@/services/wallet-services/wallet.schemas'
import { useIsInViewport } from '@/shared/hooks/useIsInViewport'

type BankCardProps = {
  bankAccount: GetBankAccountModel
  setSelectedBankAccount: Dispatch<SetStateAction<GetCurrentUserWalletsResponse | undefined>>
  bankInfo: GetBanksQueryResult
  sx?: SxProps<Theme>
}

export const BankCard = (props: BankCardProps) => {
  const { sx, setSelectedBankAccount, bankAccount, bankInfo } = props
  const [bankCardRef, setBankCardRef] = useState<HTMLElement>()
  const { isIntersecting: isBankCardVisible } = useIsInViewport(bankCardRef ?? document.body, { threshold: 1.0 })
  const cardNumber = bankAccount?.cardNumber?.match(/.{1,4}/g) ?? []

  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBankCardRef(node)
    }
  }, [])

  useEffect(() => {
    if (isBankCardVisible) {
      setSelectedBankAccount(bankAccount)
    }
  }, [isBankCardVisible])

  const mainColor = grey[700]
  const secondaryColor = grey[200]
  return (
    <Box sx={{ position: 'relative', ml: 4 }} ref={callbackRef}>
      <Box
        sx={{
          background: `linear-gradient(to bottom left, ${mainColor}, ${secondaryColor} 60%, transparent 60%),
                 linear-gradient(to top right, ${mainColor},  ${secondaryColor} 30%,  ${secondaryColor} 30%)`,
          borderRadius: 4,
          opacity: 0.2,
          width: 312,
          height: 123,
        }}
      />
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          width: 328,
          height: 123,
          px: 4,
          py: 2,
          gap: 2,
          ...sx,
        }}
      >
        <Box sx={{ display: 'flex', height: '100%' }}>
          {bankInfo?.path && (
            <Box>
              <HBNextImage alt="" width={24} height={24} src={`/${bankInfo?.path}`} />
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 230 }}>
            {bankAccount.cardNumber ? (
              cardNumber.reverse().map(item => (
                <Typography key={item} variant="titleMedium" color="common.black">
                  {item}
                </Typography>
              ))
            ) : (
              <Typography variant="titleMedium" color="common.black">
                {bankAccount.iban}
              </Typography>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
