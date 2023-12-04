'use client'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import { HBCarousel, HBIcon, HBRoundedBox } from '@/core/components/index'
import { useGetViewVendorWidget } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

import { SellerCard } from './SellerCard'

interface SellerWidgetProps {
  metadata?: { queryId: string }
  title?: string | null
}

export const SellerWidget = (props: SellerWidgetProps) => {
  const { title, metadata } = props
  const { data: userSession } = useSession()
  const defaultAddress = userSession?.user.address
  const { data, isLoading, isFetched } = useGetViewVendorWidget(
    {
      CollectionId: metadata?.queryId || '',
      CityId: defaultAddress?.cityId,
      Latitude: defaultAddress?.latitude,
      Longitude: defaultAddress?.longitude,
    },
    { query: { staleTime: 0, enabled: !!defaultAddress?.cityId } },
  )

  if (!data && isFetched) return null
  return (
    <Stack>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} px={2}>
        <Typography color="textAndIcon.darker" variant="titleLarge">
          {title}
        </Typography>
        <HBRoundedBox
          size={40}
          sx={{
            backgroundColor: 'background.light',
          }}
        >
          <HBIcon name="arrowLeft" size="small" sx={{ color: 'textAndIcon.darker' }} />
        </HBRoundedBox>
      </Box>

      <Box overflow={'hidden'}>
        <HBCarousel slideSx={{ mr: 2, '&:first-of-type': { ml: 2 }, '&:last-child': { mr: 2 } }}>
          {isLoading && !data && !isFetched
            ? [1, 2].map(_ => (
                <Stack px={2} mb={6} height={130} key={_}>
                  <Skeleton variant="rounded" width={312} height={130} sx={{ mb: 2 }} />
                  <Skeleton variant="rounded" width={200} height={24} />
                </Stack>
              ))
            : data?.data?.items?.map(vendor => <SellerCard data={vendor} key={vendor.id} />)}
        </HBCarousel>
      </Box>
    </Stack>
  )
}
