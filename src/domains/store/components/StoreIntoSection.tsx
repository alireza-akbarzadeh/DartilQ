'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { HBIcon, HBNextImage } from '@/core/components'
import { BannerStoreStyle, BlackCircleStyle } from '@/domains/store/store.styles'
import { StoreStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

interface StoreIntoProps extends StoreStoreView {}

export const StoreIntoSection = (props: StoreIntoProps) => {
  const { dartilQImage, name, deliveryBadge } = props
  const { back } = useRouter()

  const handleShare = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    if (navigator.share) {
      return navigator.share({ title: name || '', url })
    } else if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(url)
        .then(() => toast.success('لینک کپی شد'))
        .catch(() => {
          return toast.error('مشکلی پیش آمده است')
        })
    }
    return toast.error('مشکلی پیش آمده است')
  }

  return (
    <Stack position="relative">
      <BlackCircleStyle onClick={() => back()} left={16}>
        <HBIcon name="angleRight" sx={{ color: 'textAndIcon.lightest' }} />
      </BlackCircleStyle>
      <BlackCircleStyle onClick={handleShare} right={16}>
        <HBIcon name="shareAlt" sx={{ color: 'textAndIcon.lightest' }} size="small" />
      </BlackCircleStyle>
      <BannerStoreStyle>
        <HBNextImage fill src={dartilQImage || ''} imageNotFound="/assets/png/store-placeholder.png" alt={name || ''} />
      </BannerStoreStyle>
      <Typography variant="titleMedium" color="textAndIcon.darker" mb={2} ml={4}>
        {name}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" px={4}>
        {deliveryBadge?.expressIcon && (
          <Box width={14} height={14} position="relative">
            <HBNextImage src={deliveryBadge?.expressIcon} alt="express-icon" fill />
          </Box>
        )}
        {deliveryBadge?.expressText && (
          <Typography variant="labelMedium" color="textAndIcon.darker">
            {deliveryBadge?.expressText}
          </Typography>
        )}
        {deliveryBadge?.shippingIcon && (
          <HBNextImage src={deliveryBadge?.shippingIcon} alt="shipping-icon" width={4} height={4} />
        )}
        {deliveryBadge?.shippingText && (
          <Typography variant="labelMedium" color="textAndIcon.darker">
            {deliveryBadge?.shippingText}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
