'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'

import { HBIcon } from '@/core/components'
import { Address as AddressInfo } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type AddressProps = {
  addressInfo: AddressInfo | undefined
}
export const Address = ({ addressInfo }: AddressProps): JSX.Element => {
  return (
    <Stack sx={{ gap: 4, pt: 4 }}>
      <Divider sx={{ color: 'border.lighter' }} />
      <Stack sx={{ gap: 2, px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: 40 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="titleMedium">تحویل به</Typography>
            <Typography variant="bodySmall" color="textAndIcon.light">
              {addressInfo?.title}
            </Typography>
          </Box>
          {addressInfo?.hasNeedToCorrection && (
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
                color: 'textAndIcon.darker',
                height: 40,
              }}
            >
              <HBIcon name="editAlt" size="xSmall" />
              <Typography variant="bodySmall">نیاز به بروزرسانی</Typography>
            </Box>
          )}
        </Box>
        <Box>
          <Typography
            variant="bodySmall"
            color="textAndIcon.light"
          >{`${addressInfo?.prefixAddress} پلاک ${addressInfo?.plaque} واحد ${addressInfo?.unit}`}</Typography>
        </Box>
      </Stack>
    </Stack>
  )
}
