'use client'
import { Box, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { HBButton, HBIcon, HBTextFieldController } from '@/core/components'
import { usePostWebIDRCustomersIdBankAccounts } from '@/services/idr-services/idr'
import { regexps } from '@/shared/constants'

type AddBankCardProps = {
  onAddBankAccounts: () => void
  onClose: () => void
}

export const AddBankCard = (props: AddBankCardProps) => {
  const { onAddBankAccounts, onClose } = props
  const [addCard, setAddCard] = useState<boolean>(false)
  const [addSheba, setAddSheba] = useState<boolean>(false)
  const formProvider = useForm<{ cardNo: string }>({ mode: 'onChange' })
  const { data: userSession } = useSession()
  const { mutateAsync: addBankAccount } = usePostWebIDRCustomersIdBankAccounts()

  const handleSubmit = async () => {
    const response = await addBankAccount({
      id: userSession?.user.partyRoleId ?? '',
      data: { cardNo: formProvider.getValues('cardNo'), iban: '', latinSummaryName: '' },
    })
    if (response.success) {
      onAddBankAccounts()
      toast.success('شماره کارت با موفقیت ثبت شد')
    }
  }

  useEffect(() => {
    formProvider?.setValue('cardNo', formProvider?.watch('cardNo')?.slice(0, 16))
  }, [formProvider?.watch('cardNo')])

  return (
    <>
      {!addCard && !addSheba && (
        <Stack sx={{ gap: 6, p: 4 }}>
          <Stack sx={{ gap: 4, color: 'textAndIcon.darker' }}>
            <Typography variant="titleMedium">برداشت از کیف پول</Typography>
            <Typography variant="labelMedium">
              برای برداشت از کیف پول باید حداقل یک شماره شبا یا شماره کارت متعلق به خودتان ثبت کنید.
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            <HBButton variant="secondary" fullWidth onClick={() => setAddSheba(true)}>
              افزودن شماره شبا
            </HBButton>
            <HBButton variant="primary" fullWidth onClick={() => setAddCard(true)}>
              افزودن شماره کارت
            </HBButton>
          </Box>
        </Stack>
      )}
      {(addCard || addSheba) && (
        <FormProvider {...formProvider}>
          <form>
            <Stack sx={{ gap: 6, p: 4 }}>
              <Stack sx={{ gap: 4, color: 'textAndIcon.darker' }}>
                <Typography variant="bodyLarge">وارد کردن شماره کارت</Typography>
                <Stack sx={{ gap: 1 }}>
                  <HBTextFieldController
                    label="شماره کارت"
                    name="cardNo"
                    rules={{ required: true, pattern: new RegExp(regexps.cardNumber) }}
                    type="number"
                    inputProps={{
                      type: 'number',
                      inputMode: 'numeric',
                      pattern: regexps.cardNumber,
                      maxLength: 16,
                    }}
                    required={true}
                    dir="ltr"
                    error={!!formProvider.formState.errors.cardNo}
                  />
                  <Box sx={{ display: 'flex', gap: 1, px: 4, alignItems: 'start' }}>
                    <HBIcon name="exclamationTriangle" size="xSmall" />
                    <Typography variant="bodySmall">
                      توجه: شماره کارت/شبا و کد ملی وارد شده در حساب کاربری باید متعلق به یک شخص باشد.
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <HBButton variant="secondary" fullWidth onClick={onClose}>
                  انصراف
                </HBButton>
                <HBButton
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={formProvider.watch('cardNo')?.length < 16}
                >
                  افزودن
                </HBButton>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      )}
    </>
  )
}
