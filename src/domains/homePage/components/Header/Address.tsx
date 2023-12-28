'use client'
import { Box, RadioGroup, Stack, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useId, useState } from 'react'
import toast from 'react-hot-toast'

import { HBBottomSheet, HBIcon } from '@/core/components'
import {
  getGetUserAddressesQueryKey,
  useGetUserAddresses,
  usePutUserAddressAddressIdDefault,
} from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { useDefaultAddress } from '@/shared/hooks/useDefaultAddress'

import { AddressItem } from './AddressItem'

type AddressProps = {
  onChangeDefaultAddress: (refreshDefaultAddressKey: string) => void
  isVisible: boolean
}

export const Address = (props: AddressProps) => {
  const { onChangeDefaultAddress, isVisible } = props
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const { defaultAddress } = useDefaultAddress()
  const { data: addressData } = useGetUserAddresses()
  const { push } = useRouter()
  const { mutateAsync: updateDefaultAddress, isPending: changeDefaultPending } = usePutUserAddressAddressIdDefault()
  const refreshDefaultAddressKey = useId()
  const queryClient = useQueryClient()
  const { update } = useSession()

  const handleChangeAddress = (addressId: string) => {
    if (changeDefaultPending || defaultAddress?.id === addressId) return
    updateDefaultAddress({ addressId }).then(async res => {
      const newDefaultAddress = addressData?.data?.find(address => address.id === addressId)
      if (res?.success) {
        if (newDefaultAddress)
          await update({
            address: {
              id: newDefaultAddress.id,
              cityId: newDefaultAddress.cityId,
              latitude: newDefaultAddress.latitude,
              longitude: newDefaultAddress.longitude,
            },
          })
        onChangeDefaultAddress(refreshDefaultAddressKey)
        toast.success('تغییر آدرس پیشفرض با موفقیت انجام شد')
      }
    })
  }

  const removeCliently = (id: string) => {
    queryClient.setQueryData(getGetUserAddressesQueryKey(), {
      ...addressData,
      data: addressData?.data?.filter(address => address.id !== id),
    })
  }

  if (!defaultAddress) return null
  return (
    <>
      <Box
        sx={{
          display: isVisible ? 'flex' : 'none',
          alignItems: 'center',
          color: 'textAndIcon.lightest',
          gap: 1,
          height: 40,
          userSelect: 'none',
          cursor: 'pointer',
        }}
        onClick={() => setOpenBottomSheet(true)}
      >
        <Typography variant="titleMedium">{`${defaultAddress?.cityName ?? ''} ،`}</Typography>
        <Typography variant="labelLarge">{defaultAddress?.title ?? ''}</Typography>
        <HBIcon name="angleDown" />
      </Box>
      {openBottomSheet && (
        <HBBottomSheet open={openBottomSheet} onClose={() => setOpenBottomSheet(false)} height="75%">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <HBIcon name="mapMarker" />
              <Typography variant="titleLarge">تغییر آدرس</Typography>
            </Box>
            <HBIcon
              name="mapMarkerPlus"
              sx={{ color: 'info.main', cursor: 'pointer' }}
              onClick={() => push('/address')}
            />
          </Box>
          <Stack sx={{ height: 'calc(100% - 90px)', overflowY: 'auto' }} gap={4}>
            <Box
              sx={{ bgcolor: 'background.light', color: 'textAndIcon.darker', borderRadius: 2, py: 1, px: 2, mx: 4 }}
            >
              <Typography variant="labelMedium">برای تغییر آدرس پیش‌فرض کافیست یک آدرس را انتخاب کنید.</Typography>
            </Box>
            <RadioGroup
              value={defaultAddress?.id || ''}
              onChange={(_, value) => {
                handleChangeAddress(value)
              }}
            >
              <Stack sx={{ px: 2, gap: 4 }}>
                {addressData?.data?.map(address => (
                  <AddressItem
                    disabled={changeDefaultPending}
                    {...{
                      id: address?.id ?? '',
                      address: `${address?.prefixAddress} پلاک ${address?.plaque} واحد ${address?.unit}`,
                      checked: address?.isDefault ?? false,
                      recipientName: address?.recipientName ?? '',
                      title: address?.title ?? '',
                      hasNeedToCorrection: address.hasNeedToCorrection ?? false,
                    }}
                    removeSuccess={removeCliently}
                    key={address?.id}
                  />
                ))}
              </Stack>
            </RadioGroup>
          </Stack>
        </HBBottomSheet>
      )}
    </>
  )
}
