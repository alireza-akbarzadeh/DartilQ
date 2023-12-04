'use client'
import { Box, Stack, Typography } from '@mui/material'

import { HBButton, HBIcon } from '@/core/components/index'
import { Basket } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

interface BasketDEtailProps {
  data?: Basket
}

export const BasketDetail = (props: BasketDEtailProps) => {
  const { data } = props
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
        <Typography variant="titleLarge" color="label.medium">
          {data?.storeName}
        </Typography>
        <HBButton
          size="small"
          variant="primary"
          sx={{ pr: 3 }}
          startIcon={<HBIcon name="shoppingCart" size="small" sx={{ color: 'background.lightest' }} />}
        >
          {data?.itemCount} کالا
        </HBButton>
      </Box>
    </Stack>
  )
}
