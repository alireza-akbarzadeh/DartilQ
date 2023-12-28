'use client'
import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import { HBCarousel } from '@/core/components/index'
import { useGetViewVendorWidget } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { SellerCard } from '@/shared/components'

interface SellerWidgetProps {
  metadata?: { queryId: string }
  title?: string | null
}

export const SellerWidget = (props: SellerWidgetProps) => {
  const { title, metadata } = props
  const { data: userSession } = useSession()

  const defaultAddress = userSession?.user.address

  const { data, isLoading, isFetched, status } = useGetViewVendorWidget(
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
      <Box display="flex" alignItems="center" mb={4} px={2}>
        <Typography color="textAndIcon.darker" variant="titleLarge" pl={2}>
          {title}
        </Typography>
      </Box>

      <Box overflow={'hidden'}>
        <HBCarousel>
          {(isLoading || status === 'pending') && !data && !isFetched
            ? [1, 2].map(_ => (
                <Stack
                  px={2}
                  mb={6}
                  height={130}
                  key={_}
                  sx={{ mr: 2, '&:first-of-type': { ml: 2 }, '&:last-child': { mr: 2 } }}
                >
                  <Skeleton variant="rounded" width={312} height={130} sx={{ mb: 2 }} />
                  <Skeleton variant="rounded" width={200} height={24} />
                </Stack>
              ))
            : data?.data?.items?.map(vendor => (
                <Box sx={{ mr: 2, '&:first-of-type': { ml: 2 }, '&:last-child': { mr: 2 } }} key={vendor.id}>
                  <SellerCard data={vendor} />
                </Box>
              ))}
        </HBCarousel>
      </Box>
    </Stack>
  )
}
