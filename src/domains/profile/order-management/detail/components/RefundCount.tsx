import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { HBTextFieldController } from '@/core/components'

import { OrderManagementMessages } from '../../order-management.messages'
import { RefundForm } from '../../types'

interface RefundCountProps {
  onChange?: (value: number) => void
  readOnly?: boolean
  quantity: number
}

export const RefundCount = (props: RefundCountProps): JSX.Element => {
  const { onChange, readOnly = false } = props
  const { formatMessage } = useIntl()
  const { watch } = useFormContext<RefundForm>()
  OrderManagementMessages

  useEffect(() => {
    if (onChange) onChange(Number(watch('count')))
  }, [watch('count')])

  return (
    <HBTextFieldController
      InputProps={{ readOnly }}
      disabled={readOnly}
      /*
       * FormRules={{
       *   validate: value => !(!Number(value) || Number(value) > quantity || Number(value) < 0),
       *   required: true,
       * }}
       */
      fullWidth
      label={formatMessage({ ...OrderManagementMessages.refundCount })}
      name="count"
      required
      size="small"
      type="number"
      variant="outlined"
    />
  )
}
