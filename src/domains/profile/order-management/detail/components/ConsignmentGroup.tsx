import { Box, Grid, Stack } from '@mui/material'
import { FC } from 'react'

import { CancelType, CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'

import { ConsignmentCardHeader } from '../../components/ConsignmentCardHeader'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { ConsignmentCardHeaderProps } from '../../types'
import { CancelConsignmentCard } from './CancelConsignmentCard'
import { CargoProductItem } from './CargoProductItem'
import { ProductRefundInformation } from './ProductRefundInformation'

interface ConsignmentGroupProps extends ConsignmentCardHeaderProps {
  products: CommerceDetailOrderItem[]
  isCanceled?: boolean
  cancelType?: CancelType
  displayCancelConsignment?: boolean
  displayRefundOrderItem?: boolean
  cancelConsignment?: () => void
  refundConsignment?: () => void
  isRefunded?: boolean
  bundleStateTitle?: string
  bundleNumber?: string
  deliveryCode?: number
  isDisplayDeliveryCode?: boolean
}

export const ConsignmentGroup: FC<ConsignmentGroupProps> = props => {
  const {
    products,
    isCanceled = false,
    cancelType,
    /*
     *
     * DisplayCancelConsignment,
     * displayRefundOrderItem,
     * cancelConsignment,
     * refundConsignment,
     */
    isRefunded = false,
    ...rest
  } = props
  return (
    <OrderTrackingDetailWrappers>
      <Stack
        spacing={6}
        sx={theme => ({
          border: `1px solid ${theme.palette.grey[100]}`,
          [theme.breakpoints.down('sm')]: { p: 2 },
          [theme.breakpoints.up('sm')]: { p: 4 },
          p: 6,
          borderRadius: 2,
        })}
      >
        <ConsignmentCardHeader spacing={8} {...rest} />
        <Grid container justifyContent="space-between" rowSpacing={6}>
          {products.map((product, index) => (
            <Grid item key={product.productId} sm={12}>
              {!isCanceled && !isRefunded && (
                <Box sx={{ pr: index % 2 === 0 ? 0 : 4 }}>
                  <CargoProductItem
                    productCartItem={{
                      ...product,
                      shoppingCartQuantity: product.quantity,
                      imageUrl: product.productDefaultImage,
                      vendor: { storeName: product.storeName },
                      finalPrice: product.finalPrice,
                      originalPrice: product.originalPrice,
                    }}
                  />
                </Box>
              )}
              {isCanceled && (
                <CancelConsignmentCard
                  cancelType={cancelType}
                  finallyReason={product.cancelReason ?? ''}
                  item={product}
                  readOnly
                  vendorName={product.storeName ?? ''}
                />
              )}
              {isRefunded && (
                <Grid columnSpacing={3} container>
                  <Grid item sm={5} xs={12}>
                    <CargoProductItem
                      productCartItem={{
                        ...product,
                        shoppingCartQuantity: product.quantity,
                        imageUrl: product.productDefaultImage,
                        vendor: { storeName: product.storeName },
                        finalPrice: product.finalPrice,
                        originalPrice: product.originalPrice,
                      }}
                    />
                  </Grid>
                  <Grid item sm={7} xs={12}>
                    <ProductRefundInformation
                      complaint={product.refundComplaint || ''}
                      reason={product.refundReason || ''}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>

        {/* <Stack alignItems="center" direction="row" justifyContent={{ xs: 'space-between', sm: 'flex-end' }} spacing={4}>
          {displayCancelConsignment && (
            <HBButton sx={{ width: { sm: 146, xs: '50%' } }} variant="secondary" onClick={() => cancelConsignment?.()}>
              <FormattedMessage {...OrderManagementMessages.cancelConsignment} />
            </HBButton>
          )}

          {displayRefundOrderItem && (
            <HBButton color="error" variant="secondary" onClick={() => refundConsignment?.()}>
              <FormattedMessage {...OrderManagementMessages.refundOrderItem} />
            </HBButton>
          )}
        </Stack> */}
      </Stack>
    </OrderTrackingDetailWrappers>
  )
}
