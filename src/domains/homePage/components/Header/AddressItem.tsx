import { Box, Collapse, Divider, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { HBIcon } from '@/core/components'
import { HBRadioButton } from '@/core/components/HBRadioButton/HBRadioButton'

type AddressItemProps = {
  id: string
  title: string
  address: string
  recipientName: string
  checked: boolean
  hasNeedToCorrection: boolean
}

export const AddressItem = ({
  title,
  id,
  address,
  recipientName,
  checked,
  hasNeedToCorrection,
}: AddressItemProps): JSX.Element => {
  const [openDiscription, setOpenDiscription] = useState<boolean>(checked)

  return (
    <Stack gap={4}>
      <HBRadioButton
        title={
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: 'textAndIcon.dark' }}
            onClick={() => setOpenDiscription(value => !value)}
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
            <HBIcon name={openDiscription ? 'angleDown' : 'angleUp'} />
          </Box>
        }
        discription={
          <Collapse in={openDiscription}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, cursor: 'pointer' }}>
                  <HBIcon name="edit" size="xSmall" />
                  <Typography variant="bodyMedium">ویرایش</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, cursor: 'pointer' }}>
                  <HBIcon name="trashAlt" size="xSmall" />
                  <Typography variant="bodyMedium">حذف</Typography>
                </Box>
              </Box>
            </Stack>
          </Collapse>
        }
        value={id}
        checked={checked}
      />
      <Divider sx={{ mx: 2, color: 'border.lighter' }} />
    </Stack>
  )
}
