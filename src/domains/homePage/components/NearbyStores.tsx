'use client'

import { Box, Stack, Typography } from '@mui/material'

import { HomePageViewStore } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { SellerCard } from '@/shared/components'

interface NearbyStoresProps {
  stores?: HomePageViewStore[] | null
}
export const NearbyStores = (props: NearbyStoresProps) => {
  const { stores } = props

  return (
    <Stack bgcolor="background.paper" px={2} mt={3} py={4} spacing={4}>
      <Box display="flex" pl={2} mb={4}>
        {/* <Box width={40} height={40} position="relative">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: CardAnimationJson,
              renderer: 'svg'
            }}
            autoplay
            loop
            speed={1}
            style={{
              top: '30%',
              right: '10%',
              zIndex: -1,
              overflow: 'hidden',
              position: 'fixed',
            }}
          />
        </Box> */}
        <Typography variant="titleLarge" color="textAndIcon.darker">
          فروشگاه‌های نزدیک به شما
        </Typography>
      </Box>
      {stores?.map(store => <SellerCard data={store} key={store.id} fullWidth />)}
    </Stack>
  )
}
