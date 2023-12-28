import { Product, UniqueProduct } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

import { useProduct } from './hooks'
import { ProductVariants } from './product.types'

const valuingPossibleAndSpecific = (product: Product, activeProduct: UniqueProduct): ProductVariants => {
  const allVariants =
    product.uniqueProducts?.map(uniqueProduct => {
      const variants =
        uniqueProduct.variants?.reduce<Record<string, string>[]>((variantAcc, variant) => {
          if (variant.id && variant.valueId) {
            const pushedVariant = { [variant.id]: variant.valueId }
            variantAcc.push(pushedVariant)
          }
          return variantAcc
        }, []) ?? []
      return variants
    }) ?? []

  const currentVariants: Record<string, string> = {}
  activeProduct.variants?.forEach(variant => {
    if (variant.id && variant.valueId) currentVariants[variant.id] = variant.valueId
  })

  return { allVariants, currentVariants }
}

const replaceSpecifAttributes = (key: string, value: string): void => {
  const allVariants = useProduct.getState().variants?.allVariants.find(item => item.find(index => index[key] === value))
  let temporaryValue: Record<string, string> = {}
  allVariants?.forEach(attribute => {
    temporaryValue = { ...temporaryValue, ...attribute }
  })
  if (allVariants) {
    useProduct.getState().setCurrentVariants({ ...temporaryValue })
    valuingActiveProduct(temporaryValue)
  }
}

const valuingActiveProduct = (variants: Record<string, string>, key?: string, value?: string): void => {
  let tempUniqueProduct: UniqueProduct | null = null
  const uniqueProduct = useProduct.getState().product?.uniqueProducts
  uniqueProduct?.forEach(product => {
    let flag = true
    product.variants?.forEach(variant => {
      if (variant.id) {
        if (variant.valueId !== variants[variant.id]) {
          flag = false
        }
      } else {
        flag = false
      }
    })
    if (flag) {
      tempUniqueProduct = product
    }
  })
  if (tempUniqueProduct) useProduct.getState().setActiveProduct(tempUniqueProduct)
  else if (!tempUniqueProduct && key && value) {
    replaceSpecifAttributes(key, value)
  }
}

const updateCurrentVariants = (key: string, value: string): void => {
  const activeVariants = useProduct.getState().variants?.currentVariants
  const temporaryValue = { ...activeVariants }
  temporaryValue[key] = value
  useProduct.getState().setCurrentVariants(temporaryValue)
  valuingActiveProduct(temporaryValue, key, value)
}

export { updateCurrentVariants, valuingActiveProduct, valuingPossibleAndSpecific }
