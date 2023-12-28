'use client'

import { Box, Typography } from '@mui/material'

import { HBBottomSheet, HBIcon } from '@/core/components/index'
import { useGetWebGeneralDataProductRulesV2GetAllPublished } from '@/services/generalData-services/generalData'

export const TermsAndRules = ({ onClose }: { onClose: () => void }) => {
  const { data } = useGetWebGeneralDataProductRulesV2GetAllPublished({
    ProcessEventName: 'IDS_UserSignUpRule_DartilPrivacyAggrement',
    Filter: 'ProcessEventName_Equal_--ProcessEventName',
  })

  return (
    <HBBottomSheet
      onClose={onClose}
      open
      header={
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="bodyLarge" color={'textAndIcon.darker'}>
            {data?.data?.items?.[0]?.name}
          </Typography>

          <HBIcon name="timesCircle" sx={{ color: 'textAndIcon.light' }} onClick={onClose} />
        </Box>
      }
      hidePuller
    >
      <Box px={4} sx={{ height: '75vh', overflowY: 'auto' }}>
        <Typography
          variant="bodyMedium"
          color={'textAndIcon.darker'}
          dangerouslySetInnerHTML={{
            __html: data?.data?.items?.[0]?.description || '',
          }}
        />
      </Box>
    </HBBottomSheet>
  )
}
