'use client'
import { Box, Stack, SxProps, Typography } from '@mui/material'
import Link from 'next/link'

import { HBIcon, HBLoader } from '@/core/components'
import { HBNextImage } from '@/core/components/HBNextImage/HBNextImage'
import { neutral } from '@/core/providers/material/theme'
import { glyphy } from '@/core/utils'
import { ProductSearchView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { useBasket } from '@/shared/hooks/useBasket'

import { NewStoreConfirmation } from '../Basket/NewStoreConfirmation'

interface SearchCardProps
  extends Pick<
    ProductSearchView,
    | 'currency'
    | 'originalPrice'
    | 'finalPrice'
    | 'imageUrl'
    | 'name'
    | 'discount'
    | 'availability'
    | 'id'
    | 'hsin'
    | 'slug'
  > {
  hideAddToBasket?: boolean
  sx?: SxProps
  priceSx?: SxProps
  imageSize?: number
  addToBasket?: (productId: string) => void
  removeFromBasket?: (productId: string) => void
  basketLoading?: boolean
  storeId?: string
}

export const ProductCard = (props: SearchCardProps) => {
  const {
    availability,
    currency,
    discount,
    finalPrice,
    hideAddToBasket,
    imageUrl,
    name,
    originalPrice,
    sx,
    priceSx,
    imageSize = 124,
    id,
    storeId,
    hsin,
    slug,
  } = props
  const {
    addToBasket,
    removeFromBasket,
    loading,
    showConfirm,
    quantity: getQuantity,
    setShowConfirm,
    storeBasketLatinName,
  } = useBasket(storeId || '')

  const quantity = getQuantity(id ?? '')

  return (
    <Stack spacing={2} alignItems="center" p={2} sx={{ width: 140, ...sx }}>
      <Link href={`/store/${storeId}/product/${hsin}/${slug}`} style={{ width: '100%' }}>
        <Stack
          sx={{
            p: 2,
            position: 'relative',
            opacity: availability ? 'unset' : 0.4,
            width: '100%',
            alignItems: 'center',
          }}
        >
          {!!discount && availability && (
            <Stack
              alignItems="center"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                border: `1px solid ${neutral[100]}`,
                borderRadius: theme => theme.spacing(0, 0, 1, 1),
                bgcolor: 'primary.main',
                height: 20,
                minWidth: 28,
              }}
            >
              <Typography variant="overline" color="common.white">
                {discount}%
              </Typography>
            </Stack>
          )}
          {!hideAddToBasket && Boolean(availability) && (
            <Stack
              alignItems="center"
              direction="row"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                borderRadius: 50,
                bgcolor: quantity || loading ? 'primary.main' : 'primary.lighter',
                height: 28,
                minWidth: quantity || loading ? '100%' : 28,
                display: 'flex',
                justifyContent: quantity && !loading ? 'space-between' : 'center',
                px: quantity ? 3 : 0,
              }}
            >
              {loading ? (
                <HBLoader type="line" circleSx={{ bgcolor: 'background.lightest' }} />
              ) : (
                <>
                  <Box
                    onClick={event => {
                      event.stopPropagation()
                      event.preventDefault()
                      addToBasket?.(id || '')
                    }}
                  >
                    <HBIcon
                      name="plus"
                      size="xSmall"
                      sx={{ color: quantity ? 'textAndIcon.lightest' : 'primary.dark' }}
                    />
                  </Box>
                  {!!quantity && (
                    <>
                      <Typography color="textAndIcon.lightest" variant="labelLarge">
                        {quantity}
                      </Typography>
                      <Box
                        onClick={event => {
                          event.stopPropagation()
                          event.preventDefault()
                          removeFromBasket?.(id || '')
                        }}
                      >
                        <HBIcon
                          name="minus"
                          size="xSmall"
                          sx={{ color: quantity ? 'textAndIcon.lightest' : 'primary.dark' }}
                        />
                      </Box>
                    </>
                  )}
                </>
              )}
            </Stack>
          )}
          <HBNextImage
            width={imageSize}
            height={imageSize}
            src={imageUrl ?? ''}
            alt=""
            imageNotFound="/assets/svg/product-card-empty.svg"
          />
        </Stack>
        <Stack sx={{ width: '100%' }}>
          <Typography
            variant="bodySmall"
            color={neutral[800]}
            sx={{
              minHeight: 36,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {name}
          </Typography>
          {availability && (
            <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="flex-end" sx={priceSx}>
              {originalPrice && (
                <Typography
                  variant="labelSmall"
                  color={neutral[600]}
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: neutral[600],
                      transform: 'rotate(-11deg)',
                    },
                  }}
                >
                  {originalPrice.toLocaleString()}
                </Typography>
              )}
              <Typography variant="bodyLarge" color={neutral[800]}>
                {finalPrice?.toLocaleString()}
              </Typography>
              <Typography variant="bodyLarge" fontSize="7px">
                {glyphy(currency)}
              </Typography>
            </Stack>
          )}
        </Stack>

        {showConfirm && id && storeId && (
          <NewStoreConfirmation
            onClose={() => setShowConfirm(false)}
            addToBasket={() => addToBasket(id, true)}
            storeBasketLatinName={storeBasketLatinName}
          />
        )}
      </Link>
    </Stack>
  )
}
