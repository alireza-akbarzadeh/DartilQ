import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { HBTextFieldController } from '@/core/components'

import { OrderManagementMessages } from '../../order-management.messages'
import { RefundForm } from '../../types'

interface CancelCountProps {
  onChange?: (value: number) => void
  readOnly?: boolean
  quantity: number
}

export const CancelCount: FC<CancelCountProps> = props => {
  const { onChange, readOnly = false } = props
  const { formatMessage } = useIntl()
  const { watch } = useFormContext<RefundForm>()

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
      label={formatMessage({ ...OrderManagementMessages.canceledCount })}
      name="count"
      required
      size="small"
      type="number"
      variant="outlined"
    />
  )
}
