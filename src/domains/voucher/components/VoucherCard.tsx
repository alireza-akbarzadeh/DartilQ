import { Box, Stack, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import { HBIcon, HBNextImage } from '@/core/components'
import { copyToClipboard, glyphy } from '@/core/utils'
import { VoucherDto } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

import { PriceValueEnum, StateType } from '../types'

type PropsType = Pick<
  VoucherDto,
  | 'voucherValue'
  | 'minPurchaseValue'
  | 'endDateCount'
  | 'totalUsedCount'
  | 'customerUsedCount'
  | 'remainedPriceValue'
  | 'code'
  | 'priceValueType'
  | 'currnecyTitle'
  | 'maxTotalPrice'
> & {
  state: StateType
}

const VoucherCard = (props: PropsType) => {
  const {
    code,
    customerUsedCount,
    endDateCount,
    minPurchaseValue,
    remainedPriceValue,
    totalUsedCount,
    voucherValue,
    priceValueType,
    currnecyTitle,
    maxTotalPrice,
    state,
  } = props

  const handleCopy = useCallback(async () => {
    if (state !== 'Active') return
    if (!code) return toast.error('کد تخفیف خالی میباشد')
    try {
      await copyToClipboard(code)
      toast.success('لینک کپی شد')
    } catch (error) {
      toast.error(error as string)
    }
  }, [code, state])

  const title = useMemo(() => {
    switch (priceValueType) {
      case PriceValueEnum.FixedPrice:
        return `${voucherValue?.toLocaleString()} ${glyphy(
          currnecyTitle,
        )}(حداقل ${minPurchaseValue?.toLocaleString()} ${glyphy(currnecyTitle)} خرید)`

      default:
        return `${voucherValue} درصد تا سقف ${maxTotalPrice?.toLocaleString()}(حداقل ${minPurchaseValue?.toLocaleString()} ${glyphy(
          currnecyTitle,
        )} خرید)`
    }
  }, [voucherValue, priceValueType, currnecyTitle, minPurchaseValue, maxTotalPrice])

  return (
    <Box sx={{ position: 'relative' }}>
      <Stack spacing={4} sx={{ borderRadius: 4, bgcolor: 'background.lightest', p: 4, pr: 8 }}>
        <Typography variant="titleSmall" color="textAndIcon.darker">
          {title}
        </Typography>
        {state === 'Active' && (
          <Stack direction="row" alignItems="center" columnGap={1.5}>
            <HBIcon sx={{ color: 'textAndIcon.light' }} name="calender" size="xSmall" />
            <Typography color="textAndIcon.dark" variant="bodySmall">
              قابل استفاده تا {endDateCount} روز دیگر
            </Typography>
          </Stack>
        )}

        <Stack direction="row" alignItems="center" columnGap={1.5}>
          <HBIcon sx={{ color: 'textAndIcon.light' }} name="tagAlt" size="xSmall" />
          <Typography color="textAndIcon.dark" variant="bodySmall">
            {totalUsedCount} بار مصرف{' '}
            {totalUsedCount !== customerUsedCount?.toString() && `(${customerUsedCount} بار استفاده شده)`}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" columnGap={1.5}>
          <HBIcon sx={{ color: 'textAndIcon.light' }} name="creditCard" size="xSmall" />
          <Typography color="textAndIcon.dark" variant="bodySmall">
            {remainedPriceValue?.toLocaleString()} {glyphy(currnecyTitle)} مانده
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: theme => `1px dashed ${theme.palette.primary.main}`,
            borderColor: state === 'Active' ? 'primary.main' : 'textAndIcon.lighter',
            px: 4,
            py: 2,
            color: state === 'Active' ? 'primary.main' : 'textAndIcon.lighter',
            borderRadius: 2,
          }}
        >
          <Typography variant="labelMedium">{code}</Typography>
          <Stack
            sx={{ cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}
            onClick={handleCopy}
            columnGap={1.5}
            direction="row"
            alignItems="center"
          >
            <HBIcon name="fileCopyAlt" size="small" />
            <Typography variant="bodySmall">کپی کردن</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 16, mt: 0 }}>
        <HBNextImage
          style={{ objectFit: 'cover' }}
          fill
          alt=""
          isLocal
          src={state === 'Active' ? '/assets/svg/voucher-border.svg' : '/assets/svg/voucher-border-grey.svg'}
        />
      </Box>
    </Box>
  )
}

export { VoucherCard }
