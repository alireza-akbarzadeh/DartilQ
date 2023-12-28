'use client'
import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { HBTextFieldController } from '@/core/components'
import { Recipient as RecipientType } from '@/shared/types/paymentType'

export const RecipientForm = (): JSX.Element => {
  const {
    formState: { errors },
  } = useFormContext<RecipientType>()

  return (
    <form>
      <Stack spacing={4}>
        <HBTextFieldController
          name="recipientName"
          label="نام و نام خانوادگی"
          inputProps={{
            maxLength: 40,
          }}
          error={Boolean(errors?.recipientName)}
        />

        <HBTextFieldController
          name="recipientMobileNo"
          dir="ltr"
          type="number"
          autoFocus
          defaultValue=""
          label="شماره موبایل"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 4,
          }}
          error={Boolean(errors?.recipientMobileNo)}
        />
      </Stack>
    </form>
  )
}
