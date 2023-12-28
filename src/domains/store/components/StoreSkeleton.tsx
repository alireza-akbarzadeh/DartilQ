'use client'

import { Box, Skeleton, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBIcon } from '@/core/components'
import { CategoryCardStyle, CategoryWrapperStyle } from '@/domains/store/store.styles'

export const StoreSkeleton = () => {
  const { back } = useRouter()
  return (
    <Stack>
      <Box
        width={40}
        height={40}
        bgcolor="background.darkest"
        borderRadius={50}
        position="absolute"
        top={52}
        left={16}
        display="flex"
        justifyContent="center"
        onClick={() => back()}
      >
        <HBIcon name="angleRight" sx={{ color: 'textAndIcon.lightest' }} />
      </Box>
      <Skeleton
        width="100%"
        height={142}
        component="div"
        sx={{
          position: 'relative',
          transform: 'unset',
          '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            borderRadius: '0 90%  0 0',
            width: '100%',
            height: 20,
            backgroundColor: 'background.paper',
            bottom: -1,
            zIndex: 11,
          },
        }}
      />
      <Box px={4}>
        <Skeleton height={32} width={196} variant="rounded" sx={{ mb: 2 }} component="div" />
        <Skeleton height={24} width={235} variant="rounded" sx={{ mb: 5 }} component="div" />
      </Box>
      <CategoryWrapperStyle>
        {[1, 2, 3, 4].map(idx => (
          <CategoryCardStyle key={`${idx}category-skeleton`}>
            <Skeleton height={40} width={40} variant="rounded" sx={{ mr: 4 }} />
            <Skeleton height={21} width={91} variant="rounded" />
          </CategoryCardStyle>
        ))}
      </CategoryWrapperStyle>
      <Box pl={4} mt={8}>
        <Skeleton height={22} width={132} sx={{ mb: 4, px: 4 }} component="div" />
        <Stack direction="row" columnGap={4} sx={{ overflow: 'hidden' }}>
          {[1, 2, 3].map(idx => (
            <Stack spacing={2} key={`${idx}skeleton`}>
              <Skeleton height={132} width={132} component="div" sx={{ transform: 'unset' }} />
              <Skeleton height={20} width={132} component="div" />
              <Skeleton height={22} width={83} component="div" />
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

export const StoreProductSkeleton = () => {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" sx={{ '& > div:nth-of-type(odd)': { mr: 2 } }} mx={2}>
      {[1, 2, 3, 4].map(idx => (
        <Stack spacing={2} key={`skeleton-price-index${idx}`} width={'calc(50% - 8px)'} mb={4}>
          <Skeleton height={140} key={`product-skeleton-card${idx}`} variant="rounded" />
          <Skeleton height={40} width={130} variant="rounded" />
          <Box display="flex" justifyContent="flex-end">
            <Skeleton height={20} width={90} variant="rounded" />
          </Box>
        </Stack>
      ))}
    </Box>
  )
}
