import { Box, Grid, Stack, styled, Typography } from '@mui/material'
import { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { OrderManagementMessages } from '../../order-management.messages'
import { OrderTrackingDetailWrappers } from '../../order-tracking.styles'
import { AddressInfo, AddressInfoClasses } from './AddressInfo'

const AddressInfoStyle = styled(Box)(({ theme }) => ({
  [`& .${AddressInfoClasses.iconWrapper}`]: {
    color: `${theme.palette.grey[500]}!important`,
  },
  [`& .${AddressInfoClasses.text}`]: {
    color: theme.palette.text.secondary,
  },
}))

const AddressInfoSpacing = 2

interface ConsignmentDetailAddressProps {
  name?: string | null
  address?: string | null
  username?: string | null
  postalCode?: string | null
  mobileNumber?: string | null
  lat?: number | null
  lng?: number | null
  plaque?: string | null
  district?: string | null
  unit?: number | null
}

export const ConsignmentDetailAddress: FC<ConsignmentDetailAddressProps> = props => {
  const { name, address, username, postalCode, mobileNumber, plaque, district, unit } = props
  const { formatMessage } = useIntl()
  return (
    <OrderTrackingDetailWrappers alignItems="flex-end" direction="row" justifyContent="space-between" spacing={13.5}>
      <Grid alignItems="center" container mb={2}>
        <Grid item md={12} sm={12} xs={12}>
          <Stack spacing={4} sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography variant="h6">
              <FormattedMessage {...OrderManagementMessages.deliveryAddress} />
            </Typography>
            <Typography variant="subtitle1">{name}</Typography>
            {address && plaque && (
              <AddressInfoStyle>
                <AddressInfo
                  icon="locationPoint"
                  spacing={AddressInfoSpacing}
                  text={
                    formatMessage(
                      { ...OrderManagementMessages.fullAddress },
                      {
                        mainAddress: (
                          <Typography
                            component="span"
                            sx={{ direction: 'initial', display: 'inline-flex', textAlign: 'end' }}
                            variant="subtitle2"
                          >
                            {address}
                          </Typography>
                        ),
                        plaque,
                        district,
                        unit,
                      },
                    ) as string
                  }
                />
              </AddressInfoStyle>
            )}
          </Stack>
        </Grid>

        <Grid item md={7} sm={7} xs={12}>
          <Stack direction="row" flexWrap="wrap" mb={2} mt={3} gap={4} sx={{ flex: 1, overflow: 'hidden' }}>
            {username && (
              <AddressInfoStyle>
                <AddressInfo icon="user" spacing={AddressInfoSpacing} text={username} />
              </AddressInfoStyle>
            )}

            {postalCode && (
              <AddressInfoStyle>
                <AddressInfo icon="mailboxAlt" spacing={AddressInfoSpacing} text={postalCode} />
              </AddressInfoStyle>
            )}

            {mobileNumber && (
              <AddressInfoStyle>
                <AddressInfo icon="mobileAndroid" spacing={AddressInfoSpacing} text={mobileNumber} />
              </AddressInfoStyle>
            )}
          </Stack>
        </Grid>
      </Grid>
    </OrderTrackingDetailWrappers>
  )
}
