import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

import { HBBottomSheet, HBButton, HBIcon, HBLoader, HBRoundedBox } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'
import { useGetWebWalletWalletsetting } from '@/services/wallet-services/wallet'
import { GetWalletSettingResponse } from '@/services/wallet-services/wallet.schemas'
import { usePay } from '@/shared/hooks/usePay'
import { WalletDiscriminatorEnum } from '@/shared/types/enums'

const PRICES: number[] = [400000, 300000, 200000, 100000]
const PLUS_MINUS_VALUE: number = 50000

type DepositProps = {
  walletId: string
  sumOfDeposit: number
}

export const Deposit = (props: DepositProps) => {
  const { walletId, sumOfDeposit } = props
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const [selectedDepositValue, setSelectedDepositValue] = useState<number>(0)
  const [depositValue, setDepositValue] = useState<number>(0)
  const { depositWallet, isLoading: isPayLoading } = usePay()
  const { data: walletSetting, isLoading } = useGetWebWalletWalletsetting(
    { WalletSettingType: WalletDiscriminatorEnum.wallet },
    { query: { enabled: openBottomSheet } },
  )

  const validation = useMemo(() => {
    const { minTransaction, maxWalletBalance }: GetWalletSettingResponse = walletSetting?.data ?? {}

    switch (true) {
      case depositValue === 0:
        return { isDisabled: true, message: '' }
      case depositValue < (minTransaction?.amount ?? 0):
        return {
          isDisabled: true,
          message: `کاربر گرامی حداقل مبلغ برای افزایش موجودی کیف پول ${minTransaction?.amount} ${minTransaction?.unitTitle} است`,
        }
      case depositValue + sumOfDeposit > (maxWalletBalance?.amount ?? 0):
        return {
          isDisabled: true,
          message: `کاربر گرامی حداکثر مبلغ برای افزایش موجودی کیف پول ${
            (maxWalletBalance?.amount ?? 0) - depositValue
          } ${minTransaction?.unitTitle} است`,
        }

      default:
        return { isDisabled: false, message: '' }
    }
  }, [walletSetting, depositValue])

  const handleClose = () => {
    setOpenBottomSheet(false)
  }

  const handleSetDeposit = (value: number) => {
    setSelectedDepositValue(value)
    setDepositValue(value)
  }

  const handlePlusDeposit = () => {
    setDepositValue(value => value + PLUS_MINUS_VALUE)
  }

  const handleMinusDeposit = () => {
    if (depositValue > 0) {
      setDepositValue(value => (value - PLUS_MINUS_VALUE < 0 ? 0 : value - PLUS_MINUS_VALUE))
    }
  }

  const handleSubmit = () => {
    depositWallet({ payableAmountInRial: depositValue * 10, walletId })
  }

  const Loading = () => {
    return (
      <Stack sx={{ gap: 2, p: 4 }}>
        <Skeleton
          sx={{ borderRadius: 4, bgcolor: neutral[100] }}
          variant="rectangular"
          animation="wave"
          width={150}
          height={30}
        />
        <Skeleton
          sx={{ borderRadius: 4, bgcolor: neutral[100] }}
          variant="rectangular"
          animation="wave"
          width={200}
          height={30}
        />
        <Skeleton
          sx={{ borderRadius: 4, bgcolor: neutral[100] }}
          variant="rectangular"
          animation="wave"
          width={250}
          height={30}
        />
      </Stack>
    )
  }

  return (
    <>
      <HBButton
        variant="neutral2"
        startIcon={<HBIcon name="plus" />}
        fullWidth
        onClick={() => setOpenBottomSheet(true)}
      >
        {!isPayLoading ? (
          'افزایش موجودی'
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HBLoader type="line" circleSx={{ bgcolor: 'background.lightest' }} />
          </Box>
        )}
      </HBButton>
      {openBottomSheet && (
        <HBBottomSheet open onClose={handleClose}>
          {!isLoading ? (
            <Stack sx={{ gap: 6, p: 4 }}>
              <Stack sx={{ gap: 4, color: 'textAndIcon.darker' }}>
                <Typography variant="titleMedium">مبلغ افزایش موجودی</Typography>
                <Typography variant="labelMedium">موجودی کیف پول‌ خود را چقدر افزایش می‌دهید؟</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {PRICES.map(value => (
                    <Box
                      key={value}
                      sx={{
                        px: 1.5,
                        py: 2,
                        border: '1px solid',
                        borderColor: selectedDepositValue === value ? 'primary.main' : 'background.light',
                        backgroundColor: 'background.light',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSetDeposit(value)}
                    >
                      <Typography variant="labelMedium" noWrap>
                        {`${value.toLocaleString()} تومان`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <HBRoundedBox
                    size={40}
                    sx={{
                      bgcolor: 'background.light',
                      color: 'textAndIcon.darker',
                    }}
                    onClick={handlePlusDeposit}
                  >
                    <HBIcon name="plus" />
                  </HBRoundedBox>
                  <Typography variant="labelMedium" noWrap>
                    {depositValue > 0 ? `${depositValue.toLocaleString()} تومان` : 'سایر مبالغ'}
                  </Typography>
                  <HBRoundedBox
                    size={40}
                    sx={{
                      bgcolor: 'background.light',
                      color: depositValue > 0 ? 'textAndIcon.darker' : 'textAndIcon.lighter',
                    }}
                    onClick={handleMinusDeposit}
                  >
                    <HBIcon name="minus" />
                  </HBRoundedBox>
                </Box>
                {validation.message && (
                  <Box>
                    <Typography variant="labelMedium" color="error.main">
                      {validation.message}
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <HBButton variant="secondary" fullWidth onClick={handleClose}>
                  انصراف
                </HBButton>
                <HBButton variant="primary" fullWidth onClick={handleSubmit} disabled={validation.isDisabled}>
                  شارژ کیف پول
                </HBButton>
              </Box>
            </Stack>
          ) : (
            <Loading />
          )}
        </HBBottomSheet>
      )}
    </>
  )
}
