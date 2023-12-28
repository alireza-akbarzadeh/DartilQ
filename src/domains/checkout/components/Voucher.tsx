'use client'
import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { HBTextField } from '@/core/components'
import {
  useDeleteBasketUnAssignVoucher,
  usePutBasketAssignVoucher,
} from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { Basket } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type VoucherProps = {
  voucherCode?: string
  setBasket: Dispatch<SetStateAction<Basket | undefined>>
}

export const Voucher = (props: VoucherProps): JSX.Element => {
  const { voucherCode: voucherCodeProps, setBasket } = props

  const [voucherCode, setVoucherCode] = useState<string>(voucherCodeProps ?? '')
  const [hasVoucher, setHasVoucher] = useState<boolean>(!!voucherCodeProps)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const { mutateAsync: assignVoucher, isPending: assignIsPending } = usePutBasketAssignVoucher()
  const { mutateAsync: unAssignVoucher, isPending: unAssignIsPending } = useDeleteBasketUnAssignVoucher()

  useEffect(() => {
    setVoucherCode(voucherCodeProps ?? '')
    setHasVoucher(!!voucherCodeProps)
  }, [voucherCodeProps])

  const handleSubmit = async () => {
    try {
      if (!hasVoucher) {
        const response = await assignVoucher({ data: { voucherCode } })
        if (response.success) {
          setBasket(response.data)
          setHasVoucher(true)
          setShowSuccess(true)
        }
      } else {
        const response = await unAssignVoucher({ data: { voucherCode } })
        if (response.success) {
          setBasket(response.data)
          setHasVoucher(false)
          setShowSuccess(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack sx={{ gap: 4, pt: 4 }}>
      <Divider sx={{ color: 'border.lighter' }} />
      <Stack sx={{ gap: 2, px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
          <Box>
            <Typography variant="titleMedium">کد تخفیف</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <HBTextField
            placeholder="کد تخفیف خود را اینجا وارد کنید"
            fullWidth
            value={voucherCode}
            onChange={event => setVoucherCode(event?.target?.value)}
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    bgcolor: 'background.light',
                    color: 'info.main',
                    width: 50,
                    height: 48,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                  onClick={handleSubmit}
                >
                  {!assignIsPending && !unAssignIsPending && (
                    <Typography variant="bodyMedium">{hasVoucher ? 'حذف' : 'ثبت'}</Typography>
                  )}
                  {(assignIsPending || unAssignIsPending) && <CircularProgress color="primary" size={20} />}
                </Box>
              ),
            }}
          />
        </Box>
        {showSuccess && (
          <Typography variant="labelMedium" color="success.dark">
            کد تخفیف شما با موفقیت ثبت شد.
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
