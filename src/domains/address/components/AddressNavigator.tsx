'use client'

import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { HBButton, HBIcon } from '@/core/components'
import { useWindowHeight } from '@/core/hooks'
import { AddressFormType } from '@/domains/address/address.types'

const AddressNavigation = () => {
  const { setValue } = useFormContext<AddressFormType>()
  const windowHeight = useWindowHeight()
  const { push } = useRouter()
  const [navigatorLoading, setNavigatorLoading] = useState(false)
  if (!windowHeight) return null

  const nextStep = () => {
    push('/address?step=map')
  }

  const handleNavigation = (): void => {
    const successCallback = (position: GeolocationPosition) => {
      setValue('longitude', position.coords.longitude)
      setValue('latitude', position.coords.latitude)
      setNavigatorLoading(false)
      nextStep()
    }
    const errorCallback = () => {
      setNavigatorLoading(false)
      toast.error('درحال حاضر امکان دسترسی به موقعیت مکانی شما وجود ندارد. لطفا بصورت دستی آن را ثبت کنید')
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 5000,
    })
  }

  return (
    <Stack sx={{ height: windowHeight }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          flex: 1,
          bgcolor: 'primary.main',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            height: 25,
            width: '100%',
            bgcolor: 'common.white',
            borderRadius: '0 100% 0 0',
          }}
        />
        <Image alt="" height={80} src="/assets/svgs/dartil.svg" width={80} />
      </Stack>
      <Stack alignItems="center" spacing={6} sx={{ px: 4 }}>
        <Box sx={{ width: 154, height: 154, position: 'relative' }}>
          <Image alt="" fill quality={100} src="/assets/jpgs/navigation.jpg" />
        </Box>
        <Typography variant="bodyMedium">
          جهت پیدا کردن نزدیک‌ترین فروشنده، موقعیت یاب گوشی خود را فعال یا آدرس خود را وارد کنید.
        </Typography>
        <Stack direction="row" justifyContent="space-between" spacing={4} width="100%" py={4}>
          <HBButton onClick={nextStep} sx={{ flex: 1 }} variant="secondary">
            ثبت دستی
          </HBButton>
          <HBButton
            loading={navigatorLoading}
            sx={{ flex: 1 }}
            startIcon={<HBIcon name="crosshair" size="xSmall" />}
            variant="primary"
            onClick={() => {
              setNavigatorLoading(true)
              handleNavigation()
            }}
          >
            موقعیت یاب
          </HBButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export { AddressNavigation }
