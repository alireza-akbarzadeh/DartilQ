'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

import { HBTextFieldController } from '@/core/components/HBTextField/HBTextFieldController'
import { HBButton, HBIcon } from '@/core/components/index'

import { StepEnum } from '../authType.d'
import { useAuthStore } from '../hooks/useAuthStore'
import { useCreateCustomer } from '../hooks/useCreateCustomer'

const NAME_MAX_LENGTH = 50
const NAME_MIN_LENGTH = 2

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

const SignUpInformation = () => {
  const {
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<{
    firstName: string
    lastName: string
    username: string
  }>()
  const { updateStep, changePasswordToken } = useAuthStore()
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
        message: 'از حروف فارسی استفاده کنید',
      },
      required: {
        value: true,
        message: `حداقل از ${NAME_MIN_LENGTH} کاراکتر استفاده کنید`,
      },
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `حداکثر از ${NAME_MAX_LENGTH} کاراکتر استفاده کنید`,
      },
      minLength: {
        value: NAME_MIN_LENGTH,
        message: `حداقل از ${NAME_MIN_LENGTH} کاراکتر استفاده کنید`,
      },
    }),
    [],
  )

  return (
    <form onSubmit={handleSubmit(handleSaveData)}>
      <Stack spacing={4}>
        <Typography variant="bodyMedium" color="textAndIcon.darker">
          برای ثبت نام اطلاعات زیر را تکمیل کنید
        </Typography>

        <HBTextFieldController
          name="firstName"
          autoFocus
          defaultValue=""
          label={'نام (به فارسی)'}
          rules={rules}
          error={Boolean(errors?.firstName?.message)}
          helperText={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>{errors?.firstName?.message && <RenderError message={errors.firstName.message} />}</Box>
              <Typography variant="bodySmall" color="textAndIcon.light">
                {NAME_MAX_LENGTH}/{(watch('firstName') || '')?.length}
              </Typography>
            </Box>
          }
          sx={{ pb: 4 }}
        />
        <HBTextFieldController
          name="lastName"
          defaultValue=""
          label={'نام خانوادگی (به فارسی)'}
          rules={rules}
          helperText={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>{errors?.lastName?.message && <RenderError message={errors.lastName.message} />}</Box>
              <Typography variant="bodySmall" color="textAndIcon.light">
                {NAME_MAX_LENGTH}/{(watch('lastName') || '')?.length}
              </Typography>
            </Box>
          }
          sx={{ pb: 4 }}
        />

        {error && (
          <Typography variant="bodySmall" color="error.main">
            {error}
          </Typography>
        )}

        <Stack direction="row" spacing={3} py={2}>
          <HBButton sx={{ flex: 1 }} variant="secondary" onClick={() => updateStep(StepEnum.checkPhoneNumber)}>
            بازگشت
          </HBButton>
          <HBButton variant="primary" sx={{ flex: 1 }} type="submit" disabled={loading} loading={loading}>
            مرحله بعد
          </HBButton>
        </Stack>
      </Stack>
    </form>
  )
}

export { NAME_MAX_LENGTH, NAME_MIN_LENGTH, SignUpInformation }
