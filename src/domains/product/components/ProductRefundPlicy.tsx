import { ButtonBase, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { HBButton, HBIcon } from '@/core/components'
import { useGetWebGeneralDataProductRulesV2GetAllPublished } from '@/services/generalData-services/generalData'
import { ProcessEventEnum } from '@/shared/types/enums'

const HBBottomSheet = dynamic(() => import('@/core/components').then(mod => mod.HBBottomSheet))

const ProductRefundPolicy = () => {
  const [showSheet, setShowSheet] = useState(false)
  const { data } = useGetWebGeneralDataProductRulesV2GetAllPublished({
    ProcessEventName: ProcessEventEnum.RefundRule,
  })

  const handleOpenSheet = () => {
    if (data?.data?.totalItems) return setShowSheet(true)
    return toast('امکان مشاهده قوانین نمیباشید')
  }

  return (
    <>
      <ButtonBase
        onClick={handleOpenSheet}
        sx={{
          justifyContent: 'space-between',
          py: 3,
          border: theme => `1px solid ${theme.palette.border.lightest}`,
          borderRight: 'unset',
          borderLeft: 'unset',
        }}
      >
        <Stack direction="row" alignItems="center" columnGap={2}>
          <HBIcon name="infoCircle" sx={{ color: 'textAndIcon.darker' }} />
          <Typography variant="body2" sx={{ color: 'textAndIcon.darker' }}>
            مطالعه قوانین مرجوعی
          </Typography>
        </Stack>
        <HBIcon name="angleLeft" sx={{ color: 'textAndIcon.darker' }} />
      </ButtonBase>
      {showSheet && (
        <HBBottomSheet
          height={380}
          open
          onClose={() => setShowSheet(false)}
          hideDivider
          header={
            <Typography variant="subtitle1" sx={{ color: 'textAndIcon.darker', px: 2 }}>
              مطالعه قوانین مرجوعی
            </Typography>
          }
        >
          <Stack sx={{ px: 4, height: 'calc(100% - 55px)', py: 2 }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: data?.data?.items?.[0].description ?? '' }}
              variant="body2"
              sx={{ '& > p': { margin: 0 }, flex: 1, pb: 2, overflowY: 'auto' }}
            />
            <HBButton onClick={() => setShowSheet(false)} sx={{ marginTop: 'auto' }} variant="secondary">
              متوجه شدم
            </HBButton>
          </Stack>
        </HBBottomSheet>
      )}
    </>
  )
}

export { ProductRefundPolicy }
