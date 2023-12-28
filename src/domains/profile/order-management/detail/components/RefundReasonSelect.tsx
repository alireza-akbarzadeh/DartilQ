import { inputLabelClasses, svgIconClasses } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { useGetWebSaleOrderGetReasonsTransitionFromStateCodeToStateCodeStateMachineCodeFactor } from '@/services/sale-services/sale'

import { OrderManagementMessages } from '../../order-management.messages'
import { RefundFactor, RefundForm, RefundStateCode } from '../../types'
import { SelectController } from './SelectController'

interface RefundReasonSelectProps {
  onChange?: (value: string) => void
  readOnly?: boolean
}

export const RefundReasonSelect = (props: RefundReasonSelectProps): JSX.Element => {
  const { onChange, readOnly = false } = props
  const { FromStateCode, ToStateCode, StateMachineCode } = RefundStateCode
  const { watch } = useFormContext<RefundForm>()
  const { formatMessage } = useIntl()
  const { data } = useGetWebSaleOrderGetReasonsTransitionFromStateCodeToStateCodeStateMachineCodeFactor(
    FromStateCode,
    ToStateCode,
    StateMachineCode,
    RefundFactor.ShipmentBundleProduct,
  )
  /*
   * UseGetRefundOrderReasons({
   *   fromStateCode: FromStateCode,
   *   toStateCode: ToStateCode,
   *   stateMachineCode: StateMachineCode,
   *   factor: RefundFactor.ShipmentBundleProduct,
   * })
   */

  useEffect(() => {
    if (onChange) onChange(watch('reason'))
  }, [watch('reason')])

  return (
    <SelectController
      disabled={readOnly}
      formRules={{ required: true }}
      fullWidth
      label={formatMessage({ ...OrderManagementMessages.refundReason })}
      menuItem={
        data?.data?.transitionsResult?.map(item => ({
          title: item.reasonTitle,
          value: item.reasonId,
        })) ?? []
      }
      name="reason"
      readOnly={readOnly}
      required
      size="small"
      sx={() => ({
        ...(readOnly && {
          [`& .${svgIconClasses.root}`]: {
            display: 'none',
          },
          [`& .${inputLabelClasses.root}`]: {
            color: theme => `${theme.palette.primary.main}!important`,
          },
        }),
      })}
    />
  )
}
