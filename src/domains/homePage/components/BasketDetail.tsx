'use client'
import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBButton, HBIcon } from '@/core/components/index'
import { Basket } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

interface BasketDEtailProps {
  data?: Basket
}

export const BasketDetail = (props: BasketDEtailProps) => {
  const { data } = props
  const { push } = useRouter()
  return (
    <Stack spacing={4} bgcolor="background.light" py={4} px={6}>
      <Typography variant="titleLarge" color="textAndIcon.darker">
        خریدتو ادامه بده
      </Typography>
      <Box
        bgcolor="background.lightest"
        borderRadius={6}
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="labelMedium" color="textAndIcon.darker">
          {data?.storeName}
        </Typography>
        <HBButton
          size="small"
          variant="primary"
          sx={{ pr: 3 }}
          startIcon={<HBIcon name="shoppingCart" size="small" sx={{ color: 'background.lightest' }} />}
          onClick={() => push(`store/${data?.latinName}?openBasket=true`)}
        >
          {data?.itemCount} کالا
        </HBButton>
      </Box>
    </Stack>
  )
}
