/* eslint-disable no-nested-ternary */
'use client'

import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { HBButton, HBIcon, HBNextImage } from '@/core/components'
import { SortOptions } from '@/domains/storeList/components/SortOptions'
import { StoreListHeader } from '@/domains/storeList/components/StoreListHeader'
import { useGetStoreGroupedStoreList } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { SortOption } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { SellerCard } from '@/shared/components'
import { PageOwnerTypeEnum } from '@/shared/types/enums'

export const StoreList = ({ latinName }: { latinName: string }) => {
  const { data: userSession } = useSession()
  const [categoryIdActive, setCategoryIdActive] = useState<string | null>()
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [sort, setSort] = useState<SortOption | null>()

  const { data, isFetching } = useGetStoreGroupedStoreList({
    LatinName: latinName,
    PageOwnerType: PageOwnerTypeEnum?.Category,
    CityId: userSession?.user?.address?.cityId,
    Latitude: userSession?.user?.address?.latitude,
    Longitude: userSession?.user?.address?.longitude,
    PageNumber: 1,
    SortOption: sort !== undefined ? (sort === 1 ? SortOption.NUMBER_1 : SortOption.NUMBER_0) : undefined,
  })

  useEffect(() => {
    if (Boolean(data?.data?.categories?.items?.length) && !categoryIdActive)
      setCategoryIdActive(data?.data?.categories?.items?.[0]?.id)
  }, [data])

  return (
    <Box bgcolor="background.paper" minHeight="100vh" pb={6}>
      <StoreListHeader
        categoryActive={categoryIdActive}
        categoryOnClick={id => setCategoryIdActive(id)}
        filterOnClick={() => setOpenBottomSheet(true)}
        loading={isFetching}
        title={data?.data?.parentCategoryName || ''}
        hasFilter={sort !== undefined}
        data={data?.data?.categories?.items}
      />
      <Stack px={2}>
        {isFetching ? (
          <Stack spacing={7}>
            {[1, 2, 3].map(i => (
              <Stack key={i} spacing={4}>
                <Skeleton animation="wave" width="100%" height={130} variant="rounded" />
                <Skeleton animation="wave" width={170} height={24} variant="rounded" />
              </Stack>
            ))}
          </Stack>
        ) : (
          <Box>
            {!data?.data?.categories?.items?.length ? (
              <Stack maxWidth={150} m="0 auto" spacing={4} mt={16} alignItems="center">
                <HBNextImage isLocal src="/assets/svg/not-found.svg" width={144} height={105} alt="no-fount" />
                <Typography variant="titleMedium" color="textAndColor.darker">
                  نتیجه ای یافت نشد
                </Typography>
                <HBButton startIcon={<HBIcon name="home" />} variant="secondary">
                  بازگشت به خانه
                </HBButton>
              </Stack>
            ) : (
              <Stack spacing={4}>
                {data?.data?.categories?.items
                  ?.find(item => item.id === categoryIdActive)
                  ?.stores?.map(item => <SellerCard data={item} fullWidth key={item.id} />)}
              </Stack>
            )}
          </Box>
        )}
      </Stack>

      {openBottomSheet && (
        <SortOptions
          onClose={() => setOpenBottomSheet(false)}
          categories={data?.data?.categories?.items}
          options={data?.data?.sortOptions}
          categoryIdActive={categoryIdActive}
          onSubmit={(categoryId, sort) => {
            setCategoryIdActive(categoryId)
            setSort(sort)
            setOpenBottomSheet(false)
          }}
          sort={sort}
        />
      )}
    </Box>
  )
}
