/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { HBIcon } from '@/core/components'
import { Recipient as RecipientType } from '@/shared/types/paymentType'

import { RecipientForm } from './RecipientForm'
type RecipientProps = {
  recipientFormProvider: UseFormReturn<RecipientType, any, undefined>
}

export const Recipient = ({ recipientFormProvider }: RecipientProps): JSX.Element => {
  const { setValue, watch } = recipientFormProvider

  const { isRecipient, recipientName, recipientMobileNo } = watch()
  return (
    <Stack sx={{ gap: 4, pt: 4 }}>
      <Divider sx={{ color: 'border.lighter' }} />
      <Stack sx={{ gap: 2, px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
          <Box>
            <Typography variant="titleMedium">تحویل گیرنده</Typography>
          </Box>
          {isRecipient && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 2,
                pr: 3,
                pl: 2,
                borderRadius: 10,
                bgcolor: 'background.light',
                color: 'textAndIcon.darker',
                height: 40,
                cursor: 'pointer',
              }}
              onClick={() => {
                setValue('isRecipient', false)
              }}
            >
              <HBIcon name="editAlt" size="xSmall" />
              <Typography variant="bodySmall">ویرایش</Typography>
            </Box>
          )}
        </Box>
        {isRecipient && (
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Typography variant="bodyMedium" color="textAndIcon.darker">
              {recipientName}
            </Typography>
            <Box sx={{ borderRadius: '51%', bgcolor: 'background.darker', width: 8, height: 8 }} />
            <Typography variant="bodyMedium" color="textAndIcon.darker">
              {recipientMobileNo}
            </Typography>
          </Box>
        )}
        {!isRecipient && (
          <FormProvider {...recipientFormProvider}>
            <RecipientForm />
          </FormProvider>
        )}
      </Stack>
    </Stack>
  )
}
