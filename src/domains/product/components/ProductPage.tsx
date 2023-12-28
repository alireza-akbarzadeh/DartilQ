'use client'

import { Box, Stack } from '@mui/material'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { HBIcon } from '@/core/components'
import { useGetProductDetailHsin } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { AppBarHeight, AppTopBar } from '@/shared/layout'

import { useProduct } from '../hooks'
import { ProductPageType } from '../product.types'
import { valuingPossibleAndSpecific } from '../product-util'
import { ProductAttributes } from './ProductAttributes'
import { ProductBuy } from './ProductBuy'
import { ProductDescription } from './ProductDescription'
import { ProductMediaList } from './ProductMediaList'
import { ProductRefundPolicy } from './ProductRefundPlicy'
import { ProductVariants } from './variants'

const ProductPage = (props: ProductPageType) => {
  const { params } = props
  const hsin = params[0]
  const { data: productData } = useGetProductDetailHsin(hsin)
  const { setActiveProduct, setProduct, setVariants, activeProduct, product } = useProduct()

  const handleShare = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    if (navigator.share) {
      return navigator.share({ title: activeProduct?.slug || '', url })
    } else if (navigator.clipboard) {
      //TODO(sahand): use copyToClipboard function
      return navigator.clipboard
        .writeText(url)
        .then(() => toast.success('لینک کپی شد'))
        .catch(() => {
          return toast.error('مشکلی پیش آمده است')
        })
    }
    return toast.error('مشکلی پیش آمده است')
  }

  useEffect(() => {
    const product = productData?.data
    if (!!hsin && !!product) {
      setProduct(product)
      const activeProduct = product.uniqueProducts?.find(product => product.hsin === hsin)
      if (activeProduct) {
        setActiveProduct(activeProduct)

        if (activeProduct) {
          const variants = valuingPossibleAndSpecific(product, activeProduct)
          setVariants(variants)
        }
      }
    }
  }, [hsin])

  if (!activeProduct) return null

  return (
    <Box
      sx={{
        height: '100dvh',
        pt: `${AppBarHeight}px`,
        ...((!activeProduct?.availability || !activeProduct?.inventory) && {
          filter: 'grayscale(100%)',
        }),
      }}
    >
      <AppTopBar backUrl={`/store/${product?.latinName}`} hasBackButton title={activeProduct?.name ?? ''}>
        <Stack sx={{ flex: 1 }} alignItems="flex-end">
          <HBIcon onClick={() => handleShare()} size="xSmall" name="shareAlt" sx={{ color: 'textAndIcon.darker' }} />
        </Stack>
      </AppTopBar>
      <Stack
        sx={{
          height: '100%',
        }}
      >
        <Stack spacing={4} sx={{ flex: 1, overflowY: 'auto' }}>
          {!!activeProduct?.mediaList?.length && <ProductMediaList />}

          <Stack spacing={4} sx={{ px: 4 }}>
            <ProductRefundPolicy />
            <ProductVariants />
            <ProductDescription />
            <ProductAttributes />
          </Stack>
        </Stack>
        <ProductBuy />
      </Stack>
    </Box>
  )
}

export { ProductPage }
