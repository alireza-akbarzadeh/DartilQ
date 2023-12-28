/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { HBNextImage } from '@/core/components'
import { glyphy } from '@/core/utils'

import { AttributeHandler } from '../AttributeHandler'
import { TextWithHBIcon } from './TextWithHBIcon'

interface ProductWithVoucher {
  voucherFee?: number | null
  finalPriceWithVoucher?: number
}
interface CargoProductItemProps {
  // ProductCartItem: ProductBundleDto & ProductWithVoucher
  productCartItem: any
}

const CargoProductItem = ({ productCartItem }: CargoProductItemProps): JSX.Element => {
  const {
    imageUrl,
    finalPrice,
    shoppingCartQuantity,
    productName,
    specificAttributes,
    attribute,
    currency,
    vendor,
    hsin,
    slug,
  } = productCartItem

  return (
    <Link color="text.primary" href={`/store/product/${hsin}/${slug}`} target="_blank">
      <Stack direction={{ sm: 'row', md: 'column' }} gap={2} height="100%" justifyContent="space-between">
        <Stack direction="row" spacing={4}>
          <Box
            sx={{
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              width: 100,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Boolean(shoppingCartQuantity) && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                  bottom: 0,
                  left: 0,
                  border: '1px solid',
                  borderRadius: 1,
                  py: 0,
                  px: 1.25,
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                }}
              >
                <Typography sx={{ lineHeight: 1, pt: 0.5 }} variant="subtitle2">
                  {shoppingCartQuantity}
                </Typography>
              </Box>
            )}

            <HBNextImage
              alt="Product Picture"
              height={70}
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              src={imageUrl}
              width={70}
            />
          </Box>
          <Stack spacing={2}>
            <Typography variant="subtitle1">{productName}</Typography>

            <Stack spacing={2}>
              <AttributeHandler attributes={attribute ?? []} specificAttributes={specificAttributes ?? []} />
              {vendor?.storeName && (
                <TextWithHBIcon
                  alignItems="center"
                  customVariant="subtitle1"
                  iconColor="grey.900"
                  iconType="store"
                  size="small"
                  text={vendor.storeName}
                  textColor="text.primary"
                />
              )}
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ whiteSpace: 'nowrap', alignSelf: { sm: 'flex-start', md: 'flex-end' } }}>
          <Stack alignItems="flex-end" spacing={1}>
            <Typography variant="subtitle2">
              {`قیمت نهایی: ${finalPrice.toLocaleString()} ${glyphy(currency)}`}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Link>
  )
}
export type { ProductWithVoucher }
export { CargoProductItem }
