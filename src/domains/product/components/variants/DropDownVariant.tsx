import { Box, ButtonBase, Divider, Stack, Typography } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import { HBButton, HBIcon, HBNextImage } from '@/core/components'
import { ProductVariant, ProductVariantValue } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

const HBBottomSheet = dynamic(() => import('@/core/components').then(mod => mod.HBBottomSheet))

import dynamic from 'next/dynamic'

import { useProduct } from '../../hooks'
import { updateCurrentVariants } from '../../product-util'
type Props = ProductVariant

const renderDynamicPart = (variant?: ProductVariantValue) => {
  const { color, icon } = { ...variant }
  if (color) return <Box sx={{ width: 20, height: 20, borderRadius: '100', bgcolor: color }} />
  else if (icon) return <HBNextImage width={18} height={18} alt="" src={icon} />
}

const DropDownVariant = (props: Props) => {
  const { name, values } = props
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const { variants } = useProduct()
  const { currentVariants } = { ...variants }

  const activeVariant = useMemo(() => {
    return props.values?.find(value => value.id === currentVariants?.[props.id ?? ''])
  }, [currentVariants, props.id, props.values])

  const [selectedVariant, setSelectedVariant] = useState(activeVariant?.id ?? '')

  const handleCloseSheet = () => {
    setOpenBottomSheet(false)
    setSelectedVariant(activeVariant?.id ?? '')
  }

  const handleSelectVariant = useCallback(() => {
    updateCurrentVariants(props.id ?? '', selectedVariant)
    setOpenBottomSheet(false)
  }, [selectedVariant, setOpenBottomSheet, props.id])

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="textAndIcon.darker">
        {props.name}
      </Typography>
      <ButtonBase
        onClick={() => setOpenBottomSheet(true)}
        sx={{ px: 4, py: 3, justifyContent: 'space-between', borderRadius: 3, bgcolor: 'background.lightest' }}
      >
        <Stack direction="row" alignItems="center" columnGap={2}>
          {renderDynamicPart(activeVariant)}
          <Typography variant="body2" color="textAndIcon.darker">
            {activeVariant?.value}
          </Typography>
        </Stack>
        <HBIcon name="angleDown" sx={{ color: 'textAndColor.light' }} />
      </ButtonBase>
      {openBottomSheet && (
        <HBBottomSheet
          hideDivider
          height={400}
          header={
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2 }}>
              <Typography variant="bodyLarge" color="textAndIcon.darker">
                {name}
              </Typography>
              <ButtonBase sx={{ borderRadius: '100%' }} onClick={handleCloseSheet}>
                <HBIcon name="timesCircle" sx={{ color: 'textAndIcon.light' }} />
              </ButtonBase>
            </Stack>
          }
          open
          onClose={handleCloseSheet}
        >
          <Stack sx={{ height: 'calc(100% - 64px)' }}>
            <Stack sx={{ overflowY: 'auto', flex: 1, px: 4, mt: 4, mb: 4 }}>
              {values?.map((value, index) => (
                <>
                  <ButtonBase
                    onClick={() => setSelectedVariant(value.id ?? '')}
                    sx={{ alignItems: 'center', justifyContent: 'space-between', py: 4 }}
                  >
                    <Stack key={value.id} direction="row" alignItems="center" columnGap={2}>
                      {renderDynamicPart(value)}
                      <Typography variant="body2" color="textAndIcon.darker">
                        {activeVariant?.value}
                      </Typography>
                    </Stack>
                    {selectedVariant === value.id && <HBIcon name="check" sx={{ color: 'primary.main' }} />}
                  </ButtonBase>

                  {index !== values.length - 1 && <Divider sx={{ borderColor: 'border.lightest' }} />}
                </>
              ))}
            </Stack>
            <Stack sx={{ px: 4, mt: 'auto' }} direction="row" alignItems="center" spacing={4}>
              <HBButton onClick={handleCloseSheet} fullWidth variant="secondary">
                انصراف
              </HBButton>
              <HBButton onClick={handleSelectVariant} fullWidth variant="primary">
                انتخاب
              </HBButton>
            </Stack>
          </Stack>
        </HBBottomSheet>
      )}
    </Stack>
  )
}

export { DropDownVariant }
