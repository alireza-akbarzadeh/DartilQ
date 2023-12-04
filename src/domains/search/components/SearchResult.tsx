import { Box, Stack, styled, Typography } from '@mui/material'
import useEmblaCarousel from 'embla-carousel-react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useEffect, useState } from 'react'

import { HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'
import { useGetViewSearchView } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { StoreSearchView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { useInfiniteScroll } from '@/shared/hooks'

import { useSearch } from '../hooks'
import { SearchCard } from './SearchCard'
import { SearchedVendor } from './SearchedVendor'
import { SearchNotFound } from './SearchNotFound'
import { SearchSkeleton } from './SearchSkeleton'

const CarouselProductBox = styled(Box)(({ theme }) => ({
  minWidth: 0,
  flex: '0 0 auto',
  maxWidth: '100%',
  '&:first-of-type': {
    paddingLeft: theme.spacing(2),
  },
  '&:last-child': {
    paddingRight: theme.spacing(2),
  },
}))

const CarouselRender = (props: PropsWithChildren) => {
  const [emblaRef] = useEmblaCarousel({ direction: 'rtl', dragFree: true })
  return (
    <Box sx={{ overflow: 'hidden' }} className="embla" ref={emblaRef}>
      <Stack direction="row">{props.children}</Stack>
    </Box>
  )
}

type SearchResultProps = {
  scrollableElementRef: React.RefObject<HTMLDivElement>
}

const productsRenderCount = 10

const SearchResult = (props: SearchResultProps) => {
  const { data: userSession } = useSession()
  const defaultAddress = userSession?.user.address
  const params = useSearchParams()
  const searched = params.get('searched')
  const categoryId = params.get('categoryId')
  const [pageNumber, setPageNumber] = useState(1)
  const { updateRecentSearches } = useSearch()

  const [items, setItems] = useState<StoreSearchView[]>([])

  const handleLoadMore = () => {
    setPageNumber(prev => prev + 1)
  }

  const [setLastElement] = useInfiniteScroll(handleLoadMore, props.scrollableElementRef)

  const { data: searchData, isLoading } = useGetViewSearchView(
    {
      CityId: defaultAddress?.cityId,
      Latitude: defaultAddress?.latitude,
      Longitude: defaultAddress?.longitude,
      Term: searched ?? '',
      PageNumber: pageNumber,
      ...(categoryId && { CategoryId: categoryId }),
      PageSize: 10,
    },
    { query: { enabled: !!searched && !!defaultAddress?.latitude && !!defaultAddress?.longitude, retry: false } },
  )

  const { result, searchStores, totalProductItems } = searchData?.data || {}

  useEffect(() => {
    if (!result?.items) return
    setItems(prev => [...prev, ...(result?.items ?? [])])
  }, [result?.items])

  useEffect(() => {
    if (searched) updateRecentSearches(searched, 'add')
  }, [searched])

  if (isLoading && !items.length) return <SearchSkeleton />

  if (!isLoading && !!searchData && !searchStores?.length && !items.length) return <SearchNotFound />

  return (
    <Stack spacing={6}>
      {!!searchStores?.length && (
        <Stack spacing={4}>
          <Typography sx={{ px: 4 }} color={neutral[800]} variant="titleMedium">
            {searchStores?.length} فروشگاه
          </Typography>
          <CarouselRender>
            {searchStores?.map(store => (
              <Box
                key={store.id}
                sx={{
                  minWidth: 0,
                  flex: '0 0 95%',
                  maxWidth: '100%',
                  px: 2,
                  '&:first-of-type': {
                    pl: 4,
                  },
                  '&:last-child': {
                    pr: 4,
                  },
                }}
              >
                <SearchedVendor hasBorder {...store} />
              </Box>
            ))}
          </CarouselRender>
        </Stack>
      )}

      {!!items.length && (
        <Stack spacing={4}>
          <Typography px={4} variant="titleMedium">
            {totalProductItems} محصول در {result?.totalItems} فروشگاه
          </Typography>
          {items?.map((store, index) => (
            <Stack ref={index === (result?.items?.length ?? 0) - 1 ? setLastElement : null} key={store.id} spacing={3}>
              <Box sx={{ px: 4 }}>
                <SearchedVendor {...store} />
              </Box>
              <CarouselRender>
                {store.products?.slice(0, productsRenderCount).map(product => (
                  <CarouselProductBox key={product.id}>
                    <SearchCard {...product} />
                  </CarouselProductBox>
                ))}
                {(store?.products?.length ?? 0) > productsRenderCount && (
                  <CarouselProductBox>
                    <Stack
                      gap={1}
                      sx={{
                        width: 140,
                        bgcolor: neutral[100],
                        height: '100%',
                        borderRadius: 4,
                        color: neutral[800],
                        cursor: 'pointer',
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="bodySmall">بیشتر</Typography>
                      <HBIcon name="arrowLeft" size="xSmall" />
                    </Stack>
                  </CarouselProductBox>
                )}
              </CarouselRender>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  )
}

export { SearchResult }
