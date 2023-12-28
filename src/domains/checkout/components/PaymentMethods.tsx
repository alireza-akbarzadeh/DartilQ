'use client'
import { Box, Divider, RadioGroup, Stack, Switch, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { HBIcon, HBNextImage, HBRadioButton } from '@/core/components'
import { glyphy } from '@/core/utils'
import { PaymentMethod as PaymentMethodInfo } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { useGetWebWalletWalletsMeWallets } from '@/services/wallet-services/wallet'
import { WalletDiscriminatorEnum } from '@/shared/types/enums'
import { PaymentMethodTypeEnum, PaymentProvider } from '@/shared/types/paymentType'

type PaymentMethodsProps = {
  paymentMethodInfo: PaymentMethodInfo[]
  onChangeProvider: (paymentProvider: PaymentProvider) => void
  totalAmount: number
}
export const PaymentMethods = (props: PaymentMethodsProps): JSX.Element => {
  const { paymentMethodInfo, onChangeProvider, totalAmount } = props
  const [showMore, setShowMore] = useState<boolean>(false)
  const [walletId, setWalletId] = useState<string>('')
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<string>('')

  const { data: walletsData } = useGetWebWalletWalletsMeWallets()
  const paymentProviders = useMemo(
    () =>
      paymentMethodInfo
        ?.filter(paymentMethod => paymentMethod?.paymentMethodType !== PaymentMethodTypeEnum.Wallet)
        .map(item => item.paymentProviders)
        ?.flat(),
    [paymentMethodInfo],
  )
  const walletProviderId = useMemo(
    () =>
      paymentMethodInfo?.filter(paymentMethod => paymentMethod?.paymentMethodType === PaymentMethodTypeEnum.Wallet)?.[0]
        ?.paymentProviders?.[0].id ?? '',
    [paymentMethodInfo],
  )

  useEffect(() => {
    if (paymentProviders) {
      const paymentProviderId = paymentProviders?.[0]?.id ?? ''
      setSelectedPaymentProvider(paymentProviderId)
    }
  }, [paymentProviders])

  const handleChangePaymentProvider = (paymentProvidersId: string) => {
    setSelectedPaymentProvider(paymentProvidersId)
    onChangeProvider({ PaymentProviderId: paymentProvidersId })
  }

  return (
    <Stack sx={{ gap: 4, pt: 4 }}>
      <Divider sx={{ color: 'border.lighter' }} />
      <Stack sx={{ px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="titleMedium">روشهای پرداخت</Typography>
          </Box>
        </Box>
        {walletsData?.data
          ?.sort((a, b) => (a.discriminatorEnum ?? 0) - (b.discriminatorEnum ?? 0))
          ?.map(wallet => (
            <Box key={wallet.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', paddingY: 4 }}>
                <HBIcon name={wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet ? 'wallet' : 'creditCard'} />
                <Typography variant="labelMedium" color="textAndIcon.darker">
                  {wallet?.persianDiscriminator}
                </Typography>
                <Typography variant="labelMedium" color="textAndIcon.darker">
                  {`${wallet?.balance?.amount?.toLocaleString()} ${glyphy(wallet?.balance?.unitTitle)}`}
                </Typography>
              </Box>
              <Switch
                disabled={
                  (wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet
                    ? (wallet?.balance?.amount ?? 0) === 0
                    : (wallet?.balance?.amount ?? 0) < totalAmount) ||
                  (walletId !== wallet?.id && !!walletId)
                }
                onChange={(_, checked) => {
                  if (checked) {
                    onChangeProvider({ PaymentProviderId: walletProviderId, PaymentProviderOption: wallet?.id })
                    setSelectedPaymentProvider('')
                    setWalletId(wallet?.id ?? '')
                  } else {
                    onChangeProvider({ PaymentProviderId: '', PaymentProviderOption: undefined })
                    setSelectedPaymentProvider(paymentProviders?.[0]?.id ?? '')
                    setWalletId('')
                  }
                }}
              />
            </Box>
          ))}
        <Divider sx={{ color: 'border.lighter' }} />
        <RadioGroup
          value={selectedPaymentProvider}
          onChange={(_, value) => {
            handleChangePaymentProvider(value)
          }}
        >
          {paymentProviders.map((paymentProvider, index) => {
            if (!showMore && index > 0) {
              return null
            }
            return (
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                key={paymentProvider?.id}
                onClick={() => {
                  if (!walletId) {
                    handleChangePaymentProvider(paymentProvider?.id ?? '')
                  }
                }}
              >
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', paddingY: 4 }}>
                  <HBNextImage src={paymentProvider?.icon ?? ''} alt="" width={18} height={18} />
                  <Typography variant="labelMedium" color="textAndIcon.darker">
                    {paymentProvider?.title}
                  </Typography>
                </Box>
                <HBRadioButton title="" value={paymentProvider?.id} type="check" disabled={!!walletId} />
              </Box>
            )
          })}
        </RadioGroup>
        {!showMore && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 2,
                pr: 3,
                pl: 2,
                borderRadius: 10,
                bgcolor: 'background.light',
                color: 'textAndIcon.darker',
                height: 40,
              }}
              onClick={() => setShowMore(true)}
            >
              <Typography variant="bodySmall">درگاه‌های دیگر</Typography>
            </Box>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}
