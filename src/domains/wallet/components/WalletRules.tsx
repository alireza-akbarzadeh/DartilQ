import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { HBBottomSheet, HBIcon } from '@/core/components'
import { useGetWebGeneralDataProductRulesV2GetAllPublished } from '@/services/generalData-services/generalData'
import { ProcessEventEnum } from '@/shared/types/enums'

export const WalletRules = () => {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const { data } = useGetWebGeneralDataProductRulesV2GetAllPublished({
    ProcessEventName: ProcessEventEnum.DepositWalletRule,
  })
  const handleClose = () => {
    setOpenBottomSheet(false)
  }

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Box sx={{ bgcolor: 'background.lightest', opacity: 0.5, height: 60, width: '100%' }} />
      <Box sx={{ position: 'absolute', top: 5, zIndex: 1, p: 4, color: 'textAndIcon.darker', width: '100%' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}
          onClick={() => setOpenBottomSheet(true)}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <HBIcon name="wallet" size="xSmall" />
            <Typography variant="labelLarge">قوانین کیف پول</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HBIcon name="angleLeft" size="small" />
          </Box>
        </Box>
      </Box>
      {openBottomSheet && (
        <HBBottomSheet open onClose={handleClose} fullScreen hidePuller>
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                color: 'textAndIcon.darker',
                height: 56,
                px: 4,
                py: 2,
                position: 'sticky',
                top: 0,
                zIndex: 100,
                bgcolor: 'background.lightest',
              }}
            >
              <HBIcon name="angleRight" onClick={handleClose} sx={{ cursor: 'pointer' }} />
              <Box>
                <Typography variant="titleMedium">قوانین کیف پول</Typography>
              </Box>
            </Box>
            <Box sx={{ p: 4 }}>
              <Typography dangerouslySetInnerHTML={{ __html: data?.data?.items?.[0].description ?? '' }} />
            </Box>
          </Box>
        </HBBottomSheet>
      )}
    </Box>
  )
}
