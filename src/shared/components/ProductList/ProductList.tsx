import { Box, Stack, Typography } from '@mui/material'

import { HBCarousel, HBIcon, HBRoundedBox } from '@/core/components'
import { ProductStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { ProductCard } from '@/shared/components/ProductCard/ProductCard'

interface ProductListProps {
  title?: string | null
  data?: ProductStoreView[] | null
  showMoreClick?: () => void
  storeId?: string
}

export const ProductList = (props: ProductListProps) => {
  const { data, title, showMoreClick, storeId } = props
  const showMore = (data?.length || 0) >= 10

  return (
    <Stack spacing={2}>
      {title && (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="titleLarge" color="textAndIcon.darker">
            {title}
          </Typography>

          <Box mr={4}>
            <HBRoundedBox size={40} sx={{ bgcolor: 'background.light' }} onClick={showMoreClick}>
              <HBIcon name="arrowLeft" sx={{ color: 'textAndIcon.darker' }} />
            </HBRoundedBox>
          </Box>
        </Box>
      )}
      <HBCarousel>
        {[
          data?.slice(0, 10)?.map(product => (
            <Box sx={{ mr: 2, '&:first-of-type': { ml: 2 }, '&:last-child': { mr: 2 } }} key={product?.id}>
              <ProductCard {...product} storeId={storeId} />
            </Box>
          )),
          showMore && (
            <Box mr={2}>
              <Stack
                key={`show-more-key${title}`}
                gap={1}
                sx={{
                  width: 140,
                  bgcolor: 'background.light',
                  height: '100%',
                  borderRadius: 4,
                  color: 'textAndIcon.darker',
                  cursor: 'pointer',
                }}
                alignItems="center"
                justifyContent="center"
                direction="row"
                onClick={showMoreClick}
              >
                <Typography variant="bodySmall">بیشتر</Typography>
                <HBIcon name="arrowLeft" size="xSmall" />
              </Stack>
            </Box>
          ),
        ]}
      </HBCarousel>
    </Stack>
  )
}
