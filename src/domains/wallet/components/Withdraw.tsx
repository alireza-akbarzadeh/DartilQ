import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NumericFormat } from 'react-number-format'
import { number, object } from 'yup'

import { HBBottomSheet, HBButton, HBCarousel, HBIcon, HBNextImage, HBTextField } from '@/core/components'
import { useYupValidationResolver } from '@/core/hooks'
import { neutral } from '@/core/providers/material/theme'
import { useGetWebGeneralDataBankV2 } from '@/services/generalData-services/generalData'
import { useGetWebIDRCustomersIdBankAccounts } from '@/services/idr-services/idr'
import { GetBankAccountModel } from '@/services/idr-services/idr.schemas'
import { usePostWebWalletWalletsMeRequestWithdrawal } from '@/services/wallet-services/wallet'
import { GetCurrentUserWalletsResponse } from '@/services/wallet-services/wallet.schemas'

import { AddBankCard } from './AddBankCard'
import { BankCard } from './BankCard'

type WithdrawProps = {
  selectedWallet: GetCurrentUserWalletsResponse | undefined
  updateTransaction: () => void
  refreshWallet: () => void
}

export const Withdraw = (props: WithdrawProps) => {
  const { selectedWallet, updateTransaction, refreshWallet } = props
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const [selectedBankAccount, setSelectedBankAccount] = useState<GetBankAccountModel>()
  const { data: userSession } = useSession()
  const {
    data: bankAccounts,
    refetch: getBankAccounts,
    isLoading,
  } = useGetWebIDRCustomersIdBankAccounts(userSession?.user.partyRoleId ?? '', { query: { enabled: openBottomSheet } })
  const hasBankAccounts = (bankAccounts?.data?.items?.length ?? 0) > 0

  const schema = object().shape({
    amount: number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .required('')
      .max(
        selectedWallet?.balance?.amount ?? 0,
        `کاربر گرامی حداکثر مبلغ قابل برداشت  ${selectedWallet?.balance?.amount?.toLocaleString()} تومان  است.`,
      ),
  })
  const resolver = useYupValidationResolver(schema)
  const formProvider = useForm<{ amount: string }>({ mode: 'onChange', resolver })
  const { data: bankData } = useGetWebGeneralDataBankV2({
    Filter: selectedBankAccount?.cardNumber ? 'CardPrefix==@CardPrefix' : 'Iban==@Iban',
    ...(selectedBankAccount?.cardNumber && { cardPrefix: selectedBankAccount?.cardNumber.substring(0, 6) }),
    ...(selectedBankAccount?.iban && { iban: selectedBankAccount.iban.substring(0, 6) }),
  })

  const { mutateAsync: addWithdrawal } = usePostWebWalletWalletsMeRequestWithdrawal()

  const handleClose = () => {
    formProvider.setValue('amount', '')
    setOpenBottomSheet(false)
  }

  const handleAddBankAccounts = () => {
    getBankAccounts()
  }

  const handleSubmit = () => {
    addWithdrawal({
      data: {
        walletId: selectedWallet?.id,
        amount: Number(formProvider.getValues('amount')) * 10,
        cardNumber: selectedBankAccount?.cardNumber,
        iban: selectedBankAccount?.iban,
      },
    }).then(() => {
      updateTransaction()
      refreshWallet()
      setOpenBottomSheet(false)
      formProvider.setValue('amount', '')
      toast.success('برداشت از کیف پول با موفقیت ثبت شد')
    })
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
        startIcon={<HBIcon name="arrowUp" />}
        fullWidth
        onClick={() => setOpenBottomSheet(true)}
      >
        برداشت
      </HBButton>
      {openBottomSheet && (
        <HBBottomSheet open onClose={handleClose} fullScreen={hasBankAccounts} hidePuller={hasBankAccounts}>
          {!isLoading ? (
            <>
              {hasBankAccounts && (
                <Box sx={{ position: 'relative', height: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      color: 'textAndIcon.darker',
                      height: 56,
                      px: 4,
                      py: 2,
                      position: 'sticky',
                      top: 0,
                      zIndex: 100,
                      bgcolor: 'background.lightest',
                    }}
                  >
                    <HBIcon name="angleRight" sx={{ cursor: 'pointer' }} onClick={handleClose} />
                    <Box>
                      <Typography variant="titleMedium">برداشت از کیف پول</Typography>
                    </Box>
                  </Box>
                  <Stack sx={{ gap: 6, p: 4 }}>
                    <Stack sx={{ gap: 4, color: 'textAndIcon.darker' }}>
                      <Typography variant="bodyLarge">کارت بانکی</Typography>
                      <Typography variant="labelMedium">
                        کارت بانکی مورد نظر برای واریز پول را لطفا انتخاب کنید.
                      </Typography>
                      <HBCarousel options={{ direction: 'rtl' }}>
                        {bankAccounts?.data?.items?.map(bankAccount => (
                          <BankCard
                            key={bankAccount.id}
                            setSelectedBankAccount={setSelectedBankAccount}
                            bankAccount={bankAccount}
                            bankInfo={bankData?.data?.items?.[0] ?? {}}
                          />
                        ))}
                      </HBCarousel>
                      <Stack sx={{ gap: 2 }}>
                        <Stack sx={{ gap: 1 }}>
                          <Typography variant="bodyLarge">مبلغ برداشت موجودی</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                            <Typography variant="labelLarge">مبلغ وارد شده به شماره کارت</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {selectedBankAccount?.cardNumber ? (
                                selectedBankAccount?.cardNumber
                                  ?.match(/.{1,4}/g)
                                  ?.reverse()
                                  .map(item => (
                                    <Typography key={item} variant="labelLarge" color="common.black">
                                      {item}
                                    </Typography>
                                  ))
                              ) : (
                                <Typography variant="titleMedium" color="common.black">
                                  {selectedBankAccount?.iban}
                                </Typography>
                              )}
                            </Box>
                            <HBNextImage alt="" width={24} height={24} src={`/${bankData?.data?.items?.[0]?.path}`} />
                            <Typography variant="labelLarge">
                              {`نزد بانک ${bankData?.data?.items?.[0]?.name} واریز خواهد شد. `}
                            </Typography>
                          </Box>
                        </Stack>
                        <FormProvider {...formProvider}>
                          <form>
                            <Stack sx={{ gap: 3 }}>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography variant="labelLarge">مبلغ قابل برداشت:</Typography>
                                <Typography variant="labelLarge" color="primary.main">
                                  {`${selectedWallet?.balance?.amount?.toLocaleString()} ${selectedWallet?.balance
                                    ?.unitTitle}`}
                                </Typography>
                              </Box>
                              <Controller
                                control={formProvider.control}
                                name="amount"
                                render={({ field: { onChange, value, ...rest }, fieldState }) => (
                                  <NumericFormat
                                    autoComplete="off"
                                    placeholder="قیمت"
                                    label="قیمت"
                                    onValueChange={values => {
                                      console.log(values)
                                      onChange(values?.value)
                                    }}
                                    {...rest}
                                    customInput={HBTextField}
                                    error={Boolean(fieldState.error?.message)}
                                    size="small"
                                    sx={{ width: '100%' }}
                                    thousandSeparator=","
                                    value={value ?? ''}
                                  />
                                )}
                              />
                              <Typography variant="bodySmall" color="error.main">
                                {formProvider?.formState?.errors?.amount?.message}
                              </Typography>
                            </Stack>
                          </form>
                        </FormProvider>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      p: 4,
                      gap: 4,
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                    }}
                  >
                    <HBButton variant="secondary" fullWidth onClick={handleClose}>
                      انصراف
                    </HBButton>
                    <HBButton
                      variant="primary"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!!formProvider?.formState?.errors?.amount || !formProvider.watch('amount')}
                    >
                      برداشت
                    </HBButton>
                  </Box>
                </Box>
              )}
              {!hasBankAccounts && <AddBankCard onAddBankAccounts={handleAddBankAccounts} onClose={handleClose} />}
            </>
          ) : (
            <Loading />
          )}
        </HBBottomSheet>
      )}
    </>
  )
}
