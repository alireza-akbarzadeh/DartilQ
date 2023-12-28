import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  Box,
  collapseClasses,
  Grid,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBIcon, HBIconType } from '@/core/components'
import { glyphy } from '@/core/utils'
import { CommerceDetailTransaction, PaymentStatus } from '@/services/sale-services/sale.schemas'

import { OrderManagementMessages } from '../../order-management.messages'
import { PaymentStatusEnum } from '../../types'

interface OrderHistoryProps {
  expanded: boolean
  transactions: CommerceDetailTransaction[]
}

const GridStyle = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const paymentTypes: Record<PaymentStatus, { message: JSX.Element; icon: HBIconType; color: string }> = {
  [PaymentStatusEnum.Canceled]: {
    message: <FormattedMessage {...OrderManagementMessages.cancelPayMessage} />,
    icon: 'exclamationTriangle',
    color: 'error.main',
  },
  [PaymentStatusEnum.Failed]: {
    message: <FormattedMessage {...OrderManagementMessages.orderUnSuccess} />,
    icon: 'timesCircle',
    color: 'error.main',
  },
  [PaymentStatusEnum.None]: {
    message: <FormattedMessage {...OrderManagementMessages.nonePayMessage} />,
    icon: 'exclamationTriangle',
    color: 'warning.main',
  },
  [PaymentStatusEnum.Success]: {
    message: <FormattedMessage {...OrderManagementMessages.orderSuccess} />,
    icon: 'check',
    color: 'success.main',
  },
  [PaymentStatusEnum.Waiting]: {
    message: <FormattedMessage {...OrderManagementMessages['await-payment']} />,
    icon: 'exclamationCircle',
    color: 'warning.main',
  },
}

const StatusIconWrapper = ({ icon, color }: { icon: HBIconType; color: string }): JSX.Element => (
  <Stack
    alignItems="center"
    justifyContent="center"
    sx={{
      borderRadius: '100%',
      backgroundColor: color,
      width: 22,
      height: 22,
      p: 0.5,
    }}
  >
    <HBIcon size="small" sx={{ color: 'common.white', lineHeight: 0 }} name={icon} />
  </Stack>
)

const Status = ({ color, icon, message }: { message: JSX.Element; icon: HBIconType; color: string }): JSX.Element => (
  <Stack alignItems="center" direction="row" spacing={1}>
    <StatusIconWrapper color={color} icon={icon} />
    <Typography color={color} variant="subtitle2">
      {message}
    </Typography>
  </Stack>
)

const FormattedDate = ({ date, color }: { date: string; color: string }): JSX.Element => {
  const { formatDate } = useIntl()
  return (
    <Typography color={color} sx={{ direction: 'rtl' }} variant="subtitle2">
      {date
        ? formatDate(date, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : ''}
    </Typography>
  )
}

export const OrderHistory = (props: OrderHistoryProps): JSX.Element => {
  const { expanded, transactions } = props

  return (
    <Accordion
      expanded={expanded}
      sx={{
        [`& .${accordionSummaryClasses.root}`]: { display: 'none' },
        [`& .${collapseClasses.root}`]: {
          borderTop: theme => `1px solid ${theme.palette.grey[200]}`,
          mt: 2,
        },
        [`&.${accordionClasses.root}`]: {
          boxShadow: 'none',
          mt: 1,
        },
      }}
    >
      <AccordionSummary />
      <AccordionDetails>
        <Box sx={{ pt: 4 }}>
          <Grid columns={5} container>
            {transactions.map(item => (
              <Fragment key={item.id}>
                <GridStyle item sm={12} sx={{ justifyContent: { xs: 'space-between' } }} xs={12}>
                  {item.paymentStatus && <Status {...paymentTypes[item.paymentStatus]} />}
                  <Typography color="grey.900" variant="subtitle2">
                    <FormattedMessage
                      {...OrderManagementMessages.priceWithCurrency}
                      values={{
                        price: item.amount ? item.amount.toLocaleString() : '',

                        currency: glyphy(item.currency),
                      }}
                    />
                  </Typography>
                </GridStyle>
                <GridStyle item sx={{ justifyContent: 'flex-start' }} xs={12}>
                  <Stack mb={4} spacing={1} sx={{ flex: 1 }}>
                    <Stack spacing={2}>
                      <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography color="grey.900" variant="subtitle2">
                          <FormattedMessage {...OrderManagementMessages.internetPay} />
                        </Typography>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Box>
                            <HBIcon sx={{ color: 'grey.500' }} name="creditCard" />
                          </Box>
                          <Typography color="grey.700" variant="overline">
                            {item.paymentProviderName}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack alignItems="flex-end">
                        <FormattedDate color="grey.900" date={item.date || ''} />
                      </Stack>
                    </Stack>

                    <Stack alignItems="flex-start" spacing={2}>
                      <Typography color="grey.700" variant="subtitle2">
                        <FormattedMessage {...OrderManagementMessages.followUpCode} />
                      </Typography>
                      <Typography sx={{ userSelect: 'text' }} variant="subtitle2">
                        {item.trackingNumber}
                      </Typography>
                    </Stack>
                  </Stack>
                </GridStyle>
              </Fragment>
            ))}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
