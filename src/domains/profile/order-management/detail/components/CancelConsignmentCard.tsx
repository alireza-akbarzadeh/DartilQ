import { Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { HBNextImage } from '@/core/components'
import { HBCheckBox } from '@/core/components/HBCheckBox/HBCheckBox'
import { CancelType, CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'

import { OrderManagementMessages } from '../../order-management.messages'
import { ImageWrapperStyle, QuantityWrapperStyle } from '../../order-tracking.styles'
import { CanceledProduct, CancelForm, CancelTypeEnum, ProductCancelationProps } from '../../types'
import { AttributeHandler } from '../AttributeHandler'
import { useConsignmentCancelation } from '../context/CancelationContext'
import { CancelCardActions } from './CancelCardActions'
import { CancelReason } from './CancelReason'
import { HBForm } from './HBForm'
import { TextWithHBIcon } from './TextWithHBIcon'
import { VendorPrice } from './VendorPrice'

interface CancelConsignmentCardProps {
  item: CommerceDetailOrderItem
  isSelected?: boolean
  checkedCallBack?: (lastSelectedValue: boolean, item: CanceledProduct) => void
  updateItem?: (item: CanceledProduct) => void
  readOnly?: boolean
  finallyReason?: string
  vendorName?: string
  cancelType?: CancelType
  hideCancelReasonsAction?: boolean
}

const CardActions = ({
  hideCancelReasonsAction,
  productCancellations,
  item,
  readOnly,
  updateItem,
}: {
  hideCancelReasonsAction: boolean
  productCancellations: ProductCancelationProps | null
  item: CommerceDetailOrderItem
  updateItem?: (item: CanceledProduct) => void
  readOnly?: boolean
}): JSX.Element => {
  const canceledProduct = useMemo(() => {
    const foundItem = productCancellations?.canceledProducts.some(
      canceledProduct => canceledProduct.productId === item.productId,
    )
    return foundItem
  }, [productCancellations?.canceledProducts])

  return (
    <Box>
      {!hideCancelReasonsAction && (
        <Box>
          {canceledProduct && (
            <CancelCardActions
              product={{
                productId: item.productId || '',
                quantity: item.quantity || 0,
              }}
              readOnly={readOnly}
              updateItem={updateItem}
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export const CancelConsignmentCard = (props: CancelConsignmentCardProps): JSX.Element => {
  const {
    checkedCallBack,
    isSelected = false,
    item,
    updateItem,
    readOnly,
    cancelType,
    vendorName,
    finallyReason,
    hideCancelReasonsAction = false,
  } = props
  const { productCancellations } = useConsignmentCancelation()
  const { formatMessage } = useIntl()

  return (
    <HBForm<CancelForm>
      defaultValues={{
        count: readOnly ? item?.cancelQuantity?.toLocaleString() : '',
        reason: item.cancelReason ?? '',
      }}
    >
      <Box>
        {cancelType === CancelTypeEnum.Partial && (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <CancelReason
              cancelReasonId={finallyReason || ''}
              title={formatMessage({ ...OrderManagementMessages.cancelReason })}
            />
          </Box>
        )}
      </Box>

      <Stack gap={4} sx={{ overflow: 'hidden' }}>
        <Stack direction="row" sx={{ overflow: 'hidden' }}>
          <Stack
            alignItems="flex-start"
            direction="row"
            spacing={{ sm: 8, xs: 2 }}
            sx={{ flex: 1, overflow: 'hidden' }}
          >
            {!readOnly && (
              <HBCheckBox
                checked={isSelected}
                sx={{ p: 0 }}
                onChange={() => {
                  if (!checkedCallBack) return
                  checkedCallBack(isSelected, {
                    count: 0,
                    productId: item.productId || '',
                    cancelationReason: '',
                    quantity: item.quantity || 0,
                  })
                }}
              />
            )}
            <Stack alignItems="center" position="relative" spacing={4}>
              <ImageWrapperStyle>
                <HBNextImage
                  alt={item?.productName ?? 'Product Picture'}
                  height={70}
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  src={item.productDefaultImage ?? ''}
                  width={70}
                />
              </ImageWrapperStyle>

              <QuantityWrapperStyle>
                <Typography color="info.main" variant="subtitle2">
                  {item.quantity}
                </Typography>
              </QuantityWrapperStyle>
            </Stack>

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2">{item.productName}</Typography>

                {!readOnly && (
                  <Box sx={{ alignSelf: 'flex-end' }}>
                    <VendorPrice
                      currency={item.currency ?? ''}
                      justifyContent="flex-end"
                      oldPrice={item.originalPrice}
                      price={item.finalPrice ?? ''}
                    />
                  </Box>
                )}
              </Stack>
              <Stack spacing={2}>
                {Boolean(item.attribute?.length) ||
                  (Boolean(item.specificAttributes?.length) && (
                    <AttributeHandler
                      attributes={item.attribute ?? []}
                      specificAttributes={item.specificAttributes ?? []}
                    />
                  ))}

                {vendorName && (
                  <TextWithHBIcon
                    customVariant="subtitle2"
                    iconType="store"
                    size="small"
                    text={vendorName}
                    textColor="text.primary"
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <CardActions
          hideCancelReasonsAction={hideCancelReasonsAction}
          item={item}
          productCancellations={productCancellations}
          readOnly={readOnly}
          updateItem={updateItem}
        />

        {readOnly && (
          <Box sx={{ alignSelf: 'flex-end' }}>
            <VendorPrice
              currency={item.currency ?? ''}
              justifyContent="flex-end"
              oldPrice={item.originalPrice}
              price={item.finalPrice ?? ''}
            />
          </Box>
        )}
      </Stack>
    </HBForm>
  )
}
