import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import type { FC } from 'react'

import { HBCarousel, HBNextImage } from '@/core/components'

import type { ConsignmentCardProduct } from './ConsignmentCard'

interface ConsignmentCardProductsProps {
  items: ConsignmentCardProduct[]
}

export const ConsignmentCardProducts: FC<ConsignmentCardProductsProps> = props => {
  const { items } = props

  return (
    <Box>
      <HBCarousel>
        {items?.map(item => (
          <Box
            key={item.productId}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              mr: 4,
              flex: '0 0 120px',
            }}
          >
            <Link target="_blank" href={`/store/product/${item?.hsin}/${item?.slug}`}>
              <HBNextImage
                alt={item?.productName ?? 'Product Picture'}
                height={120}
                src={item.src ?? ''}
                width={120}
                style={{ objectFit: 'contain' }}
              />
            </Link>

            <Box
              sx={{
                bgcolor: 'grey.100',
                p: 2,
                position: 'absolute',
                left: 16,
                bottom: 16,
                borderRadius: 2,
              }}
            >
              <Typography color="primary.main" variant="subtitle1">
                {item.count}
              </Typography>
            </Box>
          </Box>
        ))}
      </HBCarousel>
    </Box>
  )
}
