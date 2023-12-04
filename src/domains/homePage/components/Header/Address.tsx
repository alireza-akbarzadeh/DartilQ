'use client'
import { Box, RadioGroup, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'

import { HBBottomSheet, HBIcon } from '@/core/components'
import { useGetUserAddresses, usePutUserAddressAddressIdDefault } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { useDefaultAddress } from '@/shared/hooks/useDefaultAddress'

import { AddressItem } from './AddressItem'

type AddressProps = {
  onChangeDefaultAddress: (refreshDefaultAddressKey: string) => void
}

export const Address = ({ onChangeDefaultAddress }: AddressProps) => {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const { defaultAddress } = useDefaultAddress()
  const { data: addressData } = useGetUserAddresses()
  const { push } = useRouter()
  const { mutateAsync: updateDefaultAddress } = usePutUserAddressAddressIdDefault()
  const refreshDefaultAddressKey = useId()

  const handleChangeAddress = (addressId: string) => {
    updateDefaultAddress({ addressId }).then(res => {
      if (res?.success) {
        setOpenBottomSheet(false)
        onChangeDefaultAddress(refreshDefaultAddressKey)
      }
    })
  }

  if (!defaultAddress) return null
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'textAndIcon.lightest',
          gap: 1,
          height: 40,
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
          <Stack gap={4}>
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
                    {...{
                      id: address?.id ?? '',
                      address: `${address?.prefixAddress} پلاک ${address?.plaque} واحد ${address?.unit}`,
                      checked: address?.isDefault ?? false,
                      recipientName: address?.recipientName ?? '',
                      title: address?.title ?? '',
                      hasNeedToCorrection: address.hasNeedToCorrection ?? false,
                    }}
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
