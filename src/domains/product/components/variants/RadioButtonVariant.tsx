import { Box, ButtonBase, Stack, Typography } from '@mui/material'
import { useCallback } from 'react'

import { HBCarousel, HBNextImage } from '@/core/components'
import { ProductVariant, ProductVariantValue } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

import { useProduct } from '../../hooks'
import { updateCurrentVariants } from '../../product-util'

type Props = ProductVariant

const renderDynamicPart = (variant: ProductVariantValue) => {
  const { color, icon } = variant
  if (variant.color) return <Box sx={{ width: 20, height: 20, borderRadius: '100%', bgcolor: color }} />
  else if (icon) return <HBNextImage width={18} height={18} alt="" src={icon} />
}

const RadioButtonVariant = (props: Props) => {
  const { id, name, values } = props
  const { variants } = useProduct()
  const { currentVariants } = { ...variants }

  const handleSelectVariant = useCallback(
    (variantId: string) => {
      updateCurrentVariants(props.id ?? '', variantId)
    },
    [id],
  )

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" color="textAndIcon.darker">
        {name}
      </Typography>
      <HBCarousel>
        {values?.map(variant => (
          <Box sx={{ pr: 2 }} key={variant.id}>
            <ButtonBase
              onClick={() => handleSelectVariant(variant.id ?? '')}
              sx={{
                p: theme => theme.spacing(2, 3, 2, 4),
                borderRadius: 7,
                ...(variant.id === currentVariants?.[id ?? ''] && {
                  border: theme => `1px solid ${theme.palette.primary.main}`,
                }),
                columnGap: theme => theme.spacing(2),
              }}
            >
              {renderDynamicPart(variant)}
              <Typography variant="body2" color="textAndIcon.darker">
                {variant.value}
              </Typography>
            </ButtonBase>
          </Box>
        ))}
      </HBCarousel>
    </Stack>
  )
}

export { RadioButtonVariant }
