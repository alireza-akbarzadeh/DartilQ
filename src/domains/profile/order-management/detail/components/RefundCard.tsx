import { Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

import { HBNextImage } from '@/core/components'
import { HBCheckBox } from '@/core/components/HBCheckBox/HBCheckBox'
import { glyphy } from '@/core/utils'
import { CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'

import { ImageWrapperStyles, QuantityWrapperStyles } from '../../order-tracking.styles'
import { AttributeHandler } from '../AttributeHandler'
import { RefundedProduct, useRefund } from '../context/RefundContext'
import { HBForm } from './HBForm'
import { RefundCardActions } from './RefundCardActions'
import { TextWithHBIcon } from './TextWithHBIcon'

interface RefundCardProps {
  item: CommerceDetailOrderItem
  isSelected?: boolean
  checkedCallBack?: (lastSelectedValue: boolean, item: RefundedProduct) => void
  updateItem?: (item: RefundedProduct) => void
  readOnly?: boolean
  vendorName?: string
}

export interface RefundForm {
  reason: string
  complain: string
  count: string
}

export const RefundCard = (props: RefundCardProps): JSX.Element => {
  const { checkedCallBack, isSelected = false, item, updateItem, readOnly, vendorName } = props
  const {
    refundComplaint,
    refundQuantity,
    refundReason,
    productId,
    quantity,
    orderItemIds,
    productDefaultImage,
    productName,
    attribute,
    specificAttributes,
    finalPrice,
    currency,
  } = item
  const { productRefund } = useRefund()

  const refundedProduct = useMemo(() => {
    const foundItem = productRefund?.refundedProducts.some(({ productId: id }) => id === productId)
    return foundItem
  }, [productRefund?.refundedProducts])

  return (
    <HBForm<RefundForm>
      defaultValues={{
        complain: refundComplaint ?? '',
        count: refundQuantity?.toLocaleString() ?? '',
        reason: refundReason ?? '',
      }}
    >
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
                    complaint: '',
                    files: [],
                    productId: productId || '',
                    quantity: quantity || 0,
                    refundedCount: 0,
                    refundReason: '',
                    orderItemIds: orderItemIds || '',
                  })
                }}
              />
            )}
            <Stack alignItems="center" spacing={4}>
              <ImageWrapperStyles>
                <QuantityWrapperStyles>
                  <Typography sx={{ lineHeight: 1, pt: 0.5 }} variant="subtitle2">
                    {quantity}
                  </Typography>
                </QuantityWrapperStyles>
                <HBNextImage
                  alt="Product Picture"
                  height={70}
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  src={productDefaultImage ?? ''}
                  width={70}
                />
              </ImageWrapperStyles>
            </Stack>
            <Stack spacing={4} sx={{ flex: 1 }}>
              <Stack direction="row" flexWrap={{ xs: 'wrap', sm: 'nowrap' }} gap={4} sx={{ flex: 1, minWidth: 0 }}>
                <Stack spacing={4}>
                  <Typography variant="subtitle2">{productName}</Typography>
                  {Boolean(attribute?.length) || Boolean(specificAttributes?.length) ? (
                    <Stack spacing={2}>
                      <AttributeHandler attributes={attribute ?? []} specificAttributes={specificAttributes ?? []} />
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
                  ) : null}
                </Stack>

                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                  width={{ xs: '100%', sm: 'inherit', marginLeft: 'auto' }}
                >
                  <Typography mr={1} variant="h6">
                    {finalPrice ? finalPrice?.toLocaleString() : ''}
                  </Typography>
                  <Typography variant="body1">{glyphy(currency)}</Typography>
                </Stack>
              </Stack>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {refundedProduct && !readOnly && (
                  <RefundCardActions
                    product={{
                      productId: productId || '',
                      quantity: quantity || 0,
                      orderItemIds: orderItemIds || '',
                    }}
                    updateItem={updateItem}
                  />
                )}
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
          {refundedProduct && !readOnly && (
            <RefundCardActions
              product={{
                productId: productId || '',
                quantity: quantity || 0,
                orderItemIds: orderItemIds || '',
              }}
              updateItem={updateItem}
            />
          )}
        </Box>
      </Stack>
    </HBForm>
  )
}
