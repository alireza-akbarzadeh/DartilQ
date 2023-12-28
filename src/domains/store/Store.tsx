'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'

import { HBIcon } from '@/core/components'
import { StoreCategorySection } from '@/domains/store/components/StoreCategorySection'
import { StoreIntoSection } from '@/domains/store/components/StoreIntoSection'
import { StoreSkeleton } from '@/domains/store/components/StoreSkeleton'
import { useGetStoreData } from '@/domains/store/hooks/useGetStoreData'
import { ProductStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { ProductList } from '@/shared/components'

import { Basket } from './basket/components'

export const Store = () => {
  const params = useParams<{ latinName: string }>()
  const { push } = useRouter()

  const { categories, isFetching, store } = useGetStoreData(params?.latinName)

  if (isFetching) return <StoreSkeleton />
  return (
    <Stack sx={{ height: '100dvh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <StoreIntoSection {...store} />
        <Box
          display="flex"
          alignItems="center"
          bgcolor="background.light"
          px={4}
          py={3.5}
          mx={4}
          borderRadius={9}
          mt={4}
          sx={{ cursor: 'pointer' }}
          onClick={() => push(`/store/${params.latinName}/search`)}
        >
          <HBIcon name="searchAlt" sx={{ color: 'textAndIcon.light' }} />
          <Typography variant="labelMedium" color="textAndIcon.light" ml={2.5}>
            جستجو کالا...
          </Typography>
        </Box>
        <StoreCategorySection data={categories} />
        <Stack spacing={6} pl={4} my={6}>
          {categories?.map(category => (
            <ProductList
              data={category?.children?.flatMap(child => child.products as ProductStoreView[])}
              storeId={store?.id || ''}
              title={category?.name}
              key={category.id}
              showMoreClick={() =>
                push(
                  `/store/${params.latinName}/category/${category.latinName || 'offer'}#${category?.children?.[0]
                    ?.latinName}`,
                )
              }
            />
          ))}
        </Stack>
      </Box>
      <Basket storeId={store?.id ?? ''} />
    </Stack>
  )
}
