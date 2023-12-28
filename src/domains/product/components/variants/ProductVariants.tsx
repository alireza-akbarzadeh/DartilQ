import { Stack } from '@mui/material'

import { useProduct } from '../../hooks'
import { ProductVariant } from './ProductVariant'

const ProductVariants = () => {
  const { product } = useProduct()

  if (!product?.productVariants?.length) return

  return (
    <Stack spacing={2}>
      {product?.productVariants?.map(variant => <ProductVariant key={variant.id} {...variant} />)}
    </Stack>
  )
}

export { ProductVariants }
