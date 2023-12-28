import { Divider, Stack } from '@mui/material'

import { RefundedProduct, useRefund, useRefundUpdater } from '../context/RefundContext'
import { RefundCard } from './RefundCard'

export const ProductRefund = (): JSX.Element => {
  const { products, productRefund } = useRefund()
  const { setProductRefund } = useRefundUpdater()

  const handleCheckBox = (lastSelectedValue: boolean, item: RefundedProduct): void => {
    if (productRefund) {
      if (lastSelectedValue) {
        setProductRefund({
          orderId: productRefund?.orderId,
          refundedProducts: productRefund.refundedProducts.filter(
            refundedProduct => refundedProduct.productId !== item.productId,
          ),
        })
      } else {
        setProductRefund({
          orderId: productRefund?.orderId,
          refundedProducts: [...productRefund.refundedProducts, item],
        })
      }
    }
  }

  const handleSelectedChanged = (item: RefundedProduct): void => {
    const temporarySelectedItems = [...(productRefund?.refundedProducts ?? [])]
    temporarySelectedItems[
      temporarySelectedItems.findIndex(temporarySelectedItem => temporarySelectedItem.productId === item?.productId)
    ] = {
      ...item,
    }
    if (productRefund) {
      setProductRefund({
        orderId: productRefund.orderId,
        refundedProducts: [...temporarySelectedItems],
      })
    }
  }

  return (
    <Stack spacing={6} sx={{ width: '100%' }}>
      {products?.map(item => (
        <Stack key={item.id} rowGap={2}>
          <RefundCard
            checkedCallBack={handleCheckBox}
            isSelected={productRefund?.refundedProducts.some(
              refundedProduct => refundedProduct.productId === item.productId,
            )}
            item={item}
            key={`some-refund-product-${item.productId}`}
            updateItem={handleSelectedChanged}
          />
          <Divider sx={{ borderColor: 'border.lighter' }} />
        </Stack>
      ))}
    </Stack>
  )
}
