import { inputLabelClasses, svgIconClasses } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { useGetWebSaleOrderGetReasonsTransitionFromStateCodeToStateCodeStateMachineCodeFactor } from '@/services/sale-services/sale'

import { OrderManagementMessages } from '../../order-management.messages'
import { CancelForm, CancelOrderStateCode, OrderStateCode } from '../../types'
import { SelectController } from './SelectController'

interface CancelConsignmentReasonSelectProps {
  onChange?: (value: string) => void
  readOnly?: boolean
}

export const CancelReasonSelect = (props: CancelConsignmentReasonSelectProps): JSX.Element => {
  const { onChange, readOnly = false } = props
  const { watch, setValue } = useFormContext<CancelForm>()
  const { formatMessage } = useIntl()

  const { data } = useGetWebSaleOrderGetReasonsTransitionFromStateCodeToStateCodeStateMachineCodeFactor(
    OrderStateCode.Paid.toString(),
    OrderStateCode.CanceledByUser.toString(),
    CancelOrderStateCode.StateMachineCode,
    CancelOrderStateCode.Factor,
  )

  useEffect(() => {
    if (onChange) {
      setValue(
        'reasonTitle',
        data?.data?.transitionsResult?.find(reason => reason.reasonId === watch('reason'))?.reasonTitle || '',
      )
      onChange(watch('reason'))
    }
  }, [watch('reason')])

  return (
    <SelectController
      disabled={readOnly}
      formRules={{ required: true }}
      fullWidth
      label={formatMessage({ ...OrderManagementMessages.cancelReason })}
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
      sx={{
        ...(readOnly && {
          [`& .${svgIconClasses.root}`]: {
            display: 'none',
          },
          [`& .${inputLabelClasses.root}`]: {
            color: theme => `${theme.palette.primary.main}!important`,
          },
        }),
      }}
    />
  )
}
