import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { HBIcon } from '@/core/components'

import { OrderManagementMessages } from '../order-management.messages'
import { Bullet } from '../order-tracking.styles'
import { ConsignmentCardHeaderProps } from '../types'
import { ConsignmentText } from './ConsignmentText'

const TitleValueTypography = ({ title, value }: { title: string; value: string | number }): JSX.Element => (
  <Stack alignItems="center" direction="row" gap={2}>
    <Typography color="grey.900" variant="subtitle2" whiteSpace="nowrap">
      {title}
    </Typography>
    <Typography color="grey.900" variant="subtitle2" whiteSpace="nowrap">
      {value}
    </Typography>
  </Stack>
)

export const ConsignmentCardHeader = (props: ConsignmentCardHeaderProps) => {
  const { formatMessage } = useIntl()

  const {
    name,
    texts,
    spacing,
    hideCargoName = false,
    hideCommentButton = false,
    bundleStateTitle,
    bundleNumber,
    deliveryCode,
    isDisplayDeliveryCode,
  } = props

  return (
    <Stack spacing={spacing}>
      {Boolean(name) && !hideCargoName && (
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" spacing={2}>
            <HBIcon size="medium" name="shoppingBag" />
            <Typography variant="h6">{name}</Typography>
            {bundleStateTitle && (
              <Typography color="primary.main" variant="h6">
                ({bundleStateTitle})
              </Typography>
            )}
          </Stack>

          {/* {!hideCommentButton && (
            <OrderTrackingCommentButton
              cargoId={cargoId ?? ''}
              partyId={partyId ?? ''}
              shoppingCartId={shoppingCartId ?? ''}
            />
          )} */}
        </Stack>
      )}

      {!hideCommentButton && hideCargoName && (
        <Stack direction="row" justifyContent="space-between">
          <Stack alignItems="center" direction="row" spacing={2}>
            <HBIcon size="medium" name="bagSlash" />
            <Typography variant="h6">{formatMessage({ ...OrderManagementMessages.canceledProducts })}</Typography>
          </Stack>

          {/* <OrderTrackingCommentButton
            cargoId={cargoId ?? ''}
            partyId={partyId ?? ''}
            shoppingCartId={shoppingCartId ?? ''}
          /> */}
        </Stack>
      )}

      {isDisplayDeliveryCode && (
        <Stack alignItems={{ md: 'center', xs: 'flex-start' }} direction={{ md: 'row', xs: 'column' }}>
          <TitleValueTypography
            title={formatMessage({ ...OrderManagementMessages.shipmentTrackingCode })}
            value={bundleNumber!}
          />
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            justifyContent="space-between"
            ml={{ md: 2, xs: 0 }}
            mt={{ md: 0, xs: 2 }}
            sx={theme => ({
              border: `1px solid ${theme.palette.primary.lighter}`,
              borderRadius: 2,
              p: 2.5,
              width: '100%',
            })}
          >
            <Stack alignItems="center" color="primary.main" direction="row" gap={1}>
              <HBIcon name="exclamationOctagon" />
              <Typography variant="overline">
                {formatMessage({ ...OrderManagementMessages.giveDeliveryCodeToAgent })}
              </Typography>
            </Stack>
            <TitleValueTypography
              title={formatMessage({ ...OrderManagementMessages.consignmentDeliveryCode })}
              value={deliveryCode!}
            />
          </Stack>
        </Stack>
      )}

      {texts && texts.length > 0 && (
        <Stack direction={{ sm: 'row', xs: 'column' }} flexWrap="wrap" gap={6}>
          {texts
            .filter(text => text.value)
            .map(text => (
              <Stack alignItems="center" columnGap={2} direction="row" key={text.key} sx={text?.sx}>
                {!text?.removeBullet && <Bullet type="secondary" />}
                <ConsignmentText sx={{ gap: 2 }} title={text.key} value={text.value!} />
              </Stack>
            ))}
        </Stack>
      )}
    </Stack>
  )
}
