/* eslint-disable func-style */
/* eslint-disable import/exports-last */
import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'

import { CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'

interface RefundedProductFile {
  link: string
  preview?: string
  type: 'video' | 'image'
}

export interface RefundedProduct extends Required<Pick<CommerceDetailOrderItem, 'quantity'>> {
  productId: string
  orderItemIds: string
  refundedCount?: number
  refundReason?: string
  complaint?: string
  files?: RefundedProductFile[]
  formValidation?: boolean
}

interface ProductRefundProps {
  orderId: string
  refundedProducts: RefundedProduct[]
}

interface Files {
  id: string
  link: string
}

interface RefundFiles {
  productId: string
  files: Files[]
}

interface RefundStateProps {
  productRefund: ProductRefundProps | null
  products: CommerceDetailOrderItem[]
  refundFiles: RefundFiles[]
}

interface RefundUpdaterReturnType {
  setProductRefund: (value: ProductRefundProps) => void
  setProducts: (value: CommerceDetailOrderItem[]) => void
  setRefundFiles: (value: RefundFiles[]) => void
}

const ConsignmentCancelationStateContext = createContext<RefundStateProps>({
  productRefund: null,
  products: [],
  refundFiles: [],
})
const RefundUpdaterContext = createContext<RefundUpdaterReturnType>({
  setProductRefund() {
    /* Do nothing */
  },
  setProducts() {
    /* Do nothing */
  },
  setRefundFiles() {
    /* Do nothing */
  },
})

const RefundProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [productRefund, setProductRefund] = useState<ProductRefundProps | null>(null)
  const [refundFiles, setRefundFiles] = useState<RefundFiles[]>([])
  const [products, setProducts] = useState<CommerceDetailOrderItem[]>([])

  const ConsignmentContextValue = useMemo(
    () => ({
      productRefund,
      products,
      refundFiles,
    }),
    [productRefund, products, refundFiles],
  )

  const RefundUpdaterContextValue = useMemo(
    () => ({
      setProducts,
      setProductRefund,
      setRefundFiles,
    }),
    [setProducts, setProductRefund, setRefundFiles],
  )

  return (
    <ConsignmentCancelationStateContext.Provider value={ConsignmentContextValue}>
      <RefundUpdaterContext.Provider value={RefundUpdaterContextValue}>{children}</RefundUpdaterContext.Provider>
    </ConsignmentCancelationStateContext.Provider>
  )
}

function useRefund(): RefundStateProps {
  const consignmentCancelation = React.useContext(ConsignmentCancelationStateContext)
  if (consignmentCancelation === undefined) {
    throw new TypeError('useConsignmentCancelation must be used within a provider')
  }
  return consignmentCancelation
}

function useRefundUpdater(): RefundUpdaterReturnType {
  const setConsignmentCancel = React.useContext(RefundUpdaterContext)
  if (setConsignmentCancel === undefined) {
    throw new TypeError('useRefundUpdater must be used within a provider')
  }

  const setProductRefund = (value: ProductRefundProps): void => {
    setConsignmentCancel.setProductRefund({ ...value })
  }

  const setRefundFiles = (value: RefundFiles[]): void => {
    setConsignmentCancel.setRefundFiles([...value])
  }

  const setProducts = (value: CommerceDetailOrderItem[]): void => {
    setConsignmentCancel.setProducts([...value])
  }
  return { setProductRefund, setProducts, setRefundFiles }
}

export { RefundProvider, useRefund, useRefundUpdater }
