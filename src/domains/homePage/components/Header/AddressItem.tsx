import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
const HBBottomSheet = dynamic(() => import('@/core/components').then(mod => mod.HBBottomSheet))

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { HBButton, HBIcon } from '@/core/components'
import { HBRadioButton } from '@/core/components/HBRadioButton/HBRadioButton'
import { useDeleteUserAddressAddressId as useDeleteAddress } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

type AddressItemProps = {
  id: string
  title: string
  address: string
  recipientName: string
  checked: boolean
  hasNeedToCorrection: boolean
  removeSuccess: (id: string) => void
  disabled?: boolean
}

export const AddressItem = (props: AddressItemProps): JSX.Element => {
  const { title, id, address, recipientName, checked, hasNeedToCorrection, removeSuccess, disabled } = props
  const [openDescription, setOpenDescription] = useState<boolean>(checked)
  const [showConfirm, setShowConfirm] = useState(false)
  const { mutateAsync: deleteMutate, isPending } = useDeleteAddress()
  const { push } = useRouter()

  const navigateToEditAddress = () => {
    push(`/address?step=map&id=${id}`)
  }

  const agreeDelete = async () => {
    try {
      const response = await deleteMutate({ addressId: id })
      if (response.success) toast.success('حدف آدرس با موفقیت انجام شد')
      removeSuccess(id)
    } catch {
      toast.error('حذف با مشکل مواجه شد')
    } finally {
      setShowConfirm(false)
    }
  }

  return (
    <Stack gap={4}>
      <HBRadioButton
        disabled={disabled}
        title={
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: 'textAndIcon.dark' }}
            onClick={() => setOpenDescription(value => !value)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Typography variant="titleSmall">{title}</Typography>
              {hasNeedToCorrection && (
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
                    color: 'textAndIcon.dark',
                  }}
                >
                  <HBIcon name="editAlt" size="xSmall" />
                  <Typography variant="bodySmall">نیاز به بروزرسانی</Typography>
                </Box>
              )}
            </Box>
            <HBIcon name={openDescription ? 'angleDown' : 'angleUp'} />
          </Box>
        }
        description={
          <Collapse in={openDescription}>
            <Stack sx={{ color: 'textAndIcon.darker', gap: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2 }}>
                <HBIcon name="mapMarker" size="small" sx={{ color: 'textAndIcon.light' }} />
                <Typography variant="bodyMedium">{address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2 }}>
                <HBIcon name="user" size="xSmall" sx={{ color: 'textAndIcon.light' }} />
                <Typography variant="bodyMedium">{recipientName}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, color: 'info.main' }}>
                <Box
                  onClick={navigateToEditAddress}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, cursor: 'pointer' }}
                >
                  <HBIcon name="edit" size="xSmall" />
                  <Typography variant="bodyMedium">ویرایش</Typography>
                </Box>
                {!checked && (
                  <Box
                    onClick={() => setShowConfirm(true)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, cursor: 'pointer' }}
                  >
                    <HBIcon name="trashAlt" size="xSmall" />
                    <Typography variant="bodyMedium">حذف</Typography>
                  </Box>
                )}
              </Box>
            </Stack>
          </Collapse>
        }
        value={id}
        checked={checked}
      />
      <Divider sx={{ mx: 2, color: 'border.lighter' }} />
      {showConfirm && (
        <HBBottomSheet hidePuller open onClose={() => setShowConfirm(false)} height="auto">
          <Box sx={{ px: 4 }}>
            <Stack sx={{ pb: 6, pt: 4 }} direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="titleLarge" color="textAndIcon.darker">
                حذف آدرس
              </Typography>
              <HBIcon
                onClick={() => setShowConfirm(false)}
                name="timesCircle"
                sx={{ color: 'textAndIcon.light', cursor: 'pointer' }}
              />
            </Stack>
            <Stack spacing={4.5}>
              <Typography color="textAndIcon.darker" variant="bodyMedium">
                آیا از حذف این آدرس اطمینان دارید؟
              </Typography>
              <Stack direction="row" alignItems="center" spacing={4}>
                <HBButton onClick={() => setShowConfirm(false)} fullWidth variant="secondary">
                  انصراف
                </HBButton>
                <HBButton loading={isPending} onClick={agreeDelete} fullWidth variant="primary">
                  حذف آدرس
                </HBButton>
              </Stack>
            </Stack>
          </Box>
        </HBBottomSheet>
      )}
    </Stack>
  )
}
