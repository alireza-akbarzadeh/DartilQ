'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBTextFieldController } from '@/core/components/HBTextField/HBTextFieldController'
import { HBButton, HBIcon } from '@/core/components/index'
import { SharedMessages } from '@/shared/shared.messages'

import { authMessages } from '../auth.messages'
import { StepEnum } from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'
import { useCreateCustomer } from '../hooks/useCreateCustomer'

export const NAME_MAX_LENGTH = 50
export const NAME_MIN_LENGTH = 2

const RenderError = ({ message }: { message: string }) => {
  return (
    <Box display="flex" alignItems="center">
      <HBIcon name="exclamationTriangle" sx={{ color: 'error.main' }} size="small" />
      <Typography variant="bodySmall" color="error.main">
        {message}
      </Typography>
    </Box>
  )
}

export const SignUpInformation = () => {
  const {
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useFormContext<{
    firstName: string
    lastName: string
    username: string
  }>()
  const { updateStep, changePasswordToken } = useAuthStore()
  const { formatMessage } = useIntl()
  const { handleCreateCustomer, loading, error } = useCreateCustomer()

  const handleSaveData = async () => {
    handleCreateCustomer(
      changePasswordToken || '',
      getValues('username'),
      getValues('firstName'),
      getValues('lastName'),
    )
  }

  const rules: RegisterOptions = useMemo(
    () => ({
      pattern: {
        value: /^\S[\s\u0600-\u06FF]+$/,
        message: formatMessage(SharedMessages.onlyPersianText),
      },
      required: { value: true, message: '' },
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: formatMessage(SharedMessages.nameMaxLength, {
          length: NAME_MAX_LENGTH,
        }),
      },
      minLength: {
        value: NAME_MIN_LENGTH,
        message: formatMessage(SharedMessages.nameMinLength, {
          length: NAME_MIN_LENGTH,
        }),
      },
    }),
    [],
  )

  return (
    <form onSubmit={handleSubmit(handleSaveData)}>
      <Stack spacing={4}>
        <Typography variant="bodyMedium" color="textAndIcon.darker">
          <FormattedMessage {...authMessages.enterInformationForRegister} />
        </Typography>

        <HBTextFieldController
          name="firstName"
          autoFocus
          defaultValue=""
          label={<FormattedMessage {...authMessages.firstNameLabel} />}
          rules={rules}
          error={Boolean(errors?.firstName?.message)}
          helperText={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>{errors?.firstName?.message && <RenderError message={errors.firstName.message} />}</Box>
              <Typography variant="bodySmall" color="textAndIcon.light">
                {NAME_MAX_LENGTH}/{watch('firstName')?.length}
              </Typography>
            </Box>
          }
        />
        <HBTextFieldController
          name="lastName"
          defaultValue=""
          label={<FormattedMessage {...authMessages.lastNameLabel} />}
          rules={rules}
          helperText={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>{errors?.lastName?.message && <RenderError message={errors.lastName.message} />}</Box>
              <Typography variant="bodySmall" color="textAndIcon.light">
                {NAME_MAX_LENGTH}/{watch('lastName')?.length}
              </Typography>
            </Box>
          }
        />

        {error && (
          <Typography variant="bodySmall" color="error.main">
            {error}
          </Typography>
        )}

        <Stack direction="row" spacing={3} py={2}>
          <HBButton sx={{ flex: 1 }} variant="secondary" onClick={() => updateStep(StepEnum.checkPhoneNumber)}>
            <FormattedMessage {...authMessages.back} />
          </HBButton>
          <HBButton variant="primary" sx={{ flex: 1 }} type="submit" disabled={!isValid || loading} loading={loading}>
            <FormattedMessage {...authMessages.nextStep} />
          </HBButton>
        </Stack>
      </Stack>
    </form>
  )
}
