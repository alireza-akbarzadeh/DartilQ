'use client'
import { Box, inputBaseClasses, Stack, Typography } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { HBIcon, HBNextImage, HBTextField } from '@/core/components'
import { useDebounce } from '@/core/hooks'
import { StoreProductSkeleton } from '@/domains/store/components/StoreSkeleton'
import { useGetStoreData } from '@/domains/store/hooks/useGetStoreData'
import { CategoryCardStyle, CategoryWrapperStyle } from '@/domains/store/store.styles'
import { ProductCard } from '@/shared/components'

import { Basket } from '../basket/components'

export const StoreSearch = () => {
  const searchParam = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParam.get('search') || '')
  const { back, replace } = useRouter()
  const debouncedSearch = useDebounce(searchTerm, 1000)
  const params = useParams<{ latinName: string }>()

  const { categories, isFetching, store } = useGetStoreData(params.latinName, debouncedSearch.trim())
  const products = categories?.flatMap(category => category.children?.flatMap(child => child.products))

  return (
    <Stack sx={{ height: '100dvh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box display="flex" alignItems="flex-start" justifyContent="flex-start" pr={2} pl={3} py={2}>
          <HBIcon name="angleRight" sx={{ height: 48 }} onClick={back} />
          <Stack spacing={2} ml={2} width="100%">
            <HBTextField
              sx={{
                [`& > div.${inputBaseClasses.root}`]: {
                  background: theme => theme.palette.background.light,
                  borderRadius: 37,
                  '& fieldset': {
                    border: 'unset',
                  },
                },
              }}
              fullWidth
              onChange={event => setSearchTerm(event?.target?.value)}
              variant="outlined"
              value={searchTerm}
              placeholder="جستوجو در این فروشگاه"
              onKeyUp={event => {
                if (event.key === 'Enter') replace(`?name=${searchParam.get('name')}&search=${searchTerm}`)
              }}
              InputProps={{
                startAdornment: <HBIcon name="searchAlt" size="small" />,
                endAdornment: searchTerm ? <HBIcon name="timesCircle" onClick={() => setSearchTerm('')} /> : undefined,
              }}
              autoFocus
            />

            {products?.length && debouncedSearch && (
              <Typography variant="bodySmall" color="textAndIcon.dark" pl={1}>
                نتایح جستجو در فروشگاه {searchParam?.get('name')}
              </Typography>
            )}
          </Stack>
        </Box>

        <CategoryWrapperStyle
          mt={2}
          borderTop={theme => `1px solid ${theme.palette.border.lightest}`}
          mb={3}
          numbordernthchild={((products?.length || 0) & 1) === 1 ? 2 : 3}
        >
          {isFetching ? (
            <StoreProductSkeleton />
          ) : (
            products?.map(product => (
              <CategoryCardStyle key={product?.id} sx={{ height: 'unset' }}>
                <ProductCard
                  key={product?.id}
                  {...product}
                  sx={{ width: '100%' }}
                  priceSx={{ mt: 4 }}
                  imageSize={140}
                  storeId={store?.id || ''}
                />
              </CategoryCardStyle>
            ))
          )}
        </CategoryWrapperStyle>

        {!products?.length && !isFetching && debouncedSearch && (
          <Stack alignItems="center" justifyContent="center" gap={4} height="calc(100vh - 250px)">
            <HBNextImage alt="no-result" width={144} height={105} isLocal src="/assets/svg/no-result.svg" />
            <Typography variant="subtitle2">برای جستجوی شما نتیجه‌ای یافت نشد!</Typography>
          </Stack>
        )}
      </Box>

      <Basket storeId={store?.id ?? ''} />
    </Stack>
  )
}
