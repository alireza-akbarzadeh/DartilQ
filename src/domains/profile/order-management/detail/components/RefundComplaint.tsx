import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { HBTextFieldController } from '@/core/components'

import { OrderManagementMessages } from '../../order-management.messages'
import { RefundForm } from '../../types'

interface CancelConsignmentReasonSelectProps {
  onChange?: (value: string) => void
  readOnly?: boolean
}

export const RefundComplaint = (props: CancelConsignmentReasonSelectProps): JSX.Element => {
  const { onChange, readOnly = false } = props
  const { formatMessage } = useIntl()
  const { watch } = useFormContext<RefundForm>()

  useEffect(() => {
    if (onChange) onChange(watch('complain'))
  }, [watch('complain')])

  return (
    <HBTextFieldController
      InputProps={{ readOnly }}
      disabled={readOnly}
      // FormRules={{ required: true }}
      fullWidth
      label={formatMessage({ ...OrderManagementMessages.refundComplaint })}
      name="complain"
      required
      size="small"
      variant="outlined"
    />
  )
}
