/* eslint-disable func-style */
/* eslint-disable import/exports-last */
import React, { createContext, ReactNode, useMemo, useState } from 'react'

import { CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'

interface AllCancelationProps {
  shoppingCartId: string
  cancelationReason: string
  cancelationReasonTitle: string
}

export interface CanceledProduct extends Required<Pick<CommerceDetailOrderItem, 'quantity'>> {
  productId: string
  cancelationReason?: string
  cancelationReasonTitle?: string
  count?: number
  formValidation?: boolean
}

export enum OrderPageTypeEnum {
  Await = 'await',
  Current = 'current',
}

export interface ProductCancelationProps {
  shoppingCartId: string
  canceledProducts: CanceledProduct[]
}

interface ConsignmentCancelationStateProps {
  allCancelation: AllCancelationProps | null
  productCancellations: ProductCancelationProps | null
  products: CommerceDetailOrderItem[]
  pageType: OrderPageTypeEnum
}

const ConsignmentCancelationStateContext = createContext<ConsignmentCancelationStateProps>({
  allCancelation: null,
  productCancellations: null,
  products: [],
  pageType: OrderPageTypeEnum.Current,
})
const ConsignmentCancelationUpdaterContext = createContext<{
  setAllConsignmentCancelation: (value: AllCancelationProps | null) => void
  setProductConsignmentCancelation: (value: ProductCancelationProps | null) => void
  setProducts: (value: CommerceDetailOrderItem[]) => void
}>({
  setAllConsignmentCancelation() {
    /* Do nothing */
  },
  setProductConsignmentCancelation() {
    /* Do nothing */
  },
  setProducts() {
    /* Do nothing */
  },
})

const ConsignmentCancelationProvider = (props: { children: ReactNode; pageType: OrderPageTypeEnum }): JSX.Element => {
  const [allConsignmentCancelation, setAllConsignmentCancelation] = useState<AllCancelationProps | null>(null)
  const [productConsignmentCancelation, setProductConsignmentCancelation] = useState<ProductCancelationProps | null>(
    null,
  )
  const [products, setProducts] = useState<CommerceDetailOrderItem[]>([])

  const allCancelation = allConsignmentCancelation
  const productCancellations = productConsignmentCancelation

  const contextValue = useMemo(
    () => ({
      allCancelation,
      productCancellations,
      products,
      pageType: props.pageType,
    }),
    [allCancelation, productCancellations, products],
  )

  const contextValueUpdater = useMemo(
    () => ({
      setProducts,
      setAllConsignmentCancelation,
      setProductConsignmentCancelation,
    }),
    [setProducts, setAllConsignmentCancelation, setProductConsignmentCancelation],
  )

  return (
    <ConsignmentCancelationStateContext.Provider value={contextValue}>
      <ConsignmentCancelationUpdaterContext.Provider value={contextValueUpdater}>
        {props.children}
      </ConsignmentCancelationUpdaterContext.Provider>
    </ConsignmentCancelationStateContext.Provider>
  )
}

function useConsignmentCancelation(): ConsignmentCancelationStateProps {
  const consignmentCancelation = React.useContext(ConsignmentCancelationStateContext)
  if (consignmentCancelation === undefined) {
    throw new TypeError('useConsignmentCancelation must be used within a provider')
  }
  return consignmentCancelation
}

type Output = {
  setAllConsignmentCancelation: (value: AllCancelationProps) => void
  setProductConsignmentCancelation: (value: ProductCancelationProps) => void
  setProducts: (value: CommerceDetailOrderItem[]) => void
}

function useConsignmentCancelationUpdater(): Output {
  const setConsignmentCancel = React.useContext(ConsignmentCancelationUpdaterContext)
  if (setConsignmentCancel === undefined) {
    throw new TypeError('useConsignmentCancelationUpdater must be used within a provider')
  }
  const setAllConsignmentCancelation = (value: AllCancelationProps): void => {
    setConsignmentCancel.setAllConsignmentCancelation({ ...value })
    setConsignmentCancel.setProductConsignmentCancelation(null)
  }

  const setProductConsignmentCancelation = (value: ProductCancelationProps): void => {
    setConsignmentCancel.setProductConsignmentCancelation({ ...value })
    setConsignmentCancel.setAllConsignmentCancelation(null)
  }

  const setProducts = (value: CommerceDetailOrderItem[]): void => {
    setConsignmentCancel.setProducts([...value])
  }
  return { setAllConsignmentCancelation, setProductConsignmentCancelation, setProducts }
}

export { ConsignmentCancelationProvider, useConsignmentCancelation, useConsignmentCancelationUpdater }
