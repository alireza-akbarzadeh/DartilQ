'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Ref, useEffect, useMemo, useRef, useState } from 'react'

import { StoreProductSkeleton } from '@/domains/store/components/StoreSkeleton'
import { useGetStoreData } from '@/domains/store/hooks/useGetStoreData'
import { CategoryCardStyle, CategoryWrapperStyle } from '@/domains/store/store.styles'
import { StoreCategoryHeader } from '@/domains/store/storeCategory/components/StoreCategoryHeader'
import {
  getGetViewStoreViewProductQueryKey,
  getViewStoreViewProduct,
} from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { ProductCard } from '@/shared/components'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'

import { Basket } from '../basket/components'

export const StoreCategory = () => {
  const refCategoryHeader = useRef<HTMLDivElement>()
  const [subCategoryId, setSubCategoryId] = useState('')

  const params = useParams<{ latinName: string; categoryLatinName: string }>()

  const { categories, isFetching, store } = useGetStoreData(params?.latinName)

  const serviceParameter = {
    CategoryLatinName: params.categoryLatinName,
    StoreLatinName: params.latinName,
    PageSize: 10,
  }

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: paginationProducts,
  } = useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return getViewStoreViewProduct({
        ...serviceParameter,
        PageNumber: pageParam,
      })
    },
    getNextPageParam: lastPage => (lastPage?.data?.products?.pageNumber || 0) + 1,
    initialPageParam: 2,
    enabled: false,
    queryKey: getGetViewStoreViewProductQueryKey(serviceParameter),
  })

  const [lastElementRef] = useInfiniteScroll(() => {
    fetchNextPage()
  })

  useEffect(() => {
    if (typeof window !== 'undefined') setSubCategoryId(window.location.hash.replace('#', ''))
  }, [params])

  const { subCategoryTitle, products } = useMemo(() => {
    const subCategory = categories
      ?.find(category => (category.latinName || 'offer') === params.categoryLatinName)
      ?.children?.find(sub => sub?.latinName === subCategoryId)

    return {
      products: subCategory?.products,
      subCategoryTitle: subCategory?.name,
    }
  }, [setSubCategoryId, params.categoryLatinName, subCategoryId, categories, paginationProducts])

  return (
    <Stack bgcolor="background.lightest" height="100dvh">
      <StoreCategoryHeader
        ref={refCategoryHeader as Ref<HTMLDivElement>}
        {...{ categories, isFetching, subCategoryId, title: store?.name || '' }}
      />

      <Stack height={`calc(100% - ${(refCategoryHeader.current?.clientHeight || 0) + 72}px)`}>
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {subCategoryTitle && (
            <Typography px={3} py={4} variant="titleLarge" color="textAndIcon.darker" mb={1.5}>
              {subCategoryTitle}
            </Typography>
          )}

          {isFetching ? (
            <StoreProductSkeleton />
          ) : (
            <CategoryWrapperStyle numbordernthchild={((products?.length || 0) & 1) === 1 ? 2 : 3}>
              {products?.map((product, index) => (
                <CategoryCardStyle
                  key={product.id}
                  sx={{ height: 'unset' }}
                  ref={
                    (paginationProducts?.pages?.length || 0) === 0 && index === products.length - 3
                      ? lastElementRef
                      : null
                  }
                >
                  <ProductCard
                    key={product?.id}
                    {...product}
                    sx={{ width: '100%' }}
                    priceSx={{ mt: 4 }}
                    imageSize={140}
                    storeId={store?.id || ''}
                  />
                </CategoryCardStyle>
              ))}
              {paginationProducts?.pages?.map(
                (page, pageIndex, pages) =>
                  page?.data?.products?.items?.map((product, index, productArray) => (
                    <CategoryCardStyle
                      key={product.id}
                      sx={{ height: 'unset' }}
                      ref={
                        ((pageIndex === pages.length - 1 && pages[pages.length - 1].data?.products?.items?.length) ||
                          0) >= 10 && index === productArray.length - 3
                          ? lastElementRef
                          : null
                      }
                    >
                      <ProductCard
                        key={product?.id}
                        {...product}
                        sx={{ width: '100%' }}
                        priceSx={{ mt: 4 }}
                        imageSize={140}
                        storeId={store?.id || ''}
                      />
                    </CategoryCardStyle>
                  )),
              )}
              {isFetchingNextPage && <StoreProductSkeleton />}
            </CategoryWrapperStyle>
          )}
        </Box>
        <Basket storeId={store?.id ?? ''} />
      </Stack>
    </Stack>
  )
}
