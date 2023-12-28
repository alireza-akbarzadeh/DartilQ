import { create } from 'zustand'

import { Product, UniqueProduct } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

import { ProductVariants } from '../product.types'

type State = {
  activeProduct: UniqueProduct | null
  variants: ProductVariants | null
  activeProductETAText: string | null
  product: Product | null
  setVariants: (value: ProductVariants) => void
  setCurrentVariants: (value: ProductVariants['currentVariants']) => void
  setProduct: (value: Product) => void
  setActiveProduct: (value: UniqueProduct) => void
}

export const useProduct = create<State>()(set => ({
  setVariants: value => set(() => ({ variants: value })),
  setCurrentVariants: value =>
    set(state => {
      if (!state.variants) return { variants: null }
      return { variants: { allVariants: state.variants?.allVariants, currentVariants: value } }
    }),
  setProduct: value => set(() => ({ product: value })),
  setActiveProduct: value => set(() => ({ activeProduct: value })),
  activeProduct: null,
  variants: null,
  product: null,
  specificSelectedValues: null,
  activeProductETAText: null,
}))
