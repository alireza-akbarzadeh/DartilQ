'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'

import { HBBottomSheet, HBButton, HBIcon, HBTextFieldController } from '@/core/components'
import { Header } from '@/domains/profile/components/Header'
import { GetIndividualQueryResult } from '@/services/idr-services/idr.schemas'
import { useGetUserIndividual, usePutUserIndividual } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

interface IdentityProps {
  onClose: (refetch?: boolean) => void
}

export const Identity = (props: IdentityProps) => {
  const { onClose } = props
  const { update, data: userSession } = useSession()
  const { data } = useGetUserIndividual({
    query: { staleTime: 50000 },
  })
  const { mutateAsync: updateUser, isPending } = usePutUserIndividual()
  const methods = useForm({ mode: 'onSubmit', defaultValues: { ...data?.data } })

  const handleUpdate = (values: GetIndividualQueryResult) => {
    updateUser({
      data: {
        ...values,
        birthDate: data?.data?.birthDate,
        gender: data?.data?.gender,
        email: data?.data?.email,
      },
    }).then(() => {
      update({ ...userSession?.user, ...values })
      onClose(true)
    })
  }

  return (
    <HBBottomSheet onClose={onClose} open fullScreen hidePuller>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleUpdate)}>
          <Stack justifyContent="space-between" height="100dvh">
            <Box>
              <Header title="اطلاعات هویتی" onClick={onClose} />

              <Box p={4}>
                <Stack spacing={3} mb={6}>
                  <HBTextFieldController name="firstName" sx={{ pb: 5 }} label="نام" />
                  <HBTextFieldController name="lastName" sx={{ pb: 5 }} label="نام خانوادگی" />
                  <HBTextFieldController
                    name="nationalCode"
                    label="کد ملی"
                    helperText={
                      <Box display="flex" alignItems="center">
                        <HBIcon name="exclamationTriangle" sx={{ color: 'textAndIcon.dark' }} />
                        <Typography variant="bodySmall" color="textAndIcon.light">
                          متعلق به مالک شماره {data?.data?.mobileNo}
                        </Typography>
                      </Box>
                    }
                    sx={{ pb: 5 }}
                  />
                </Stack>
                {/* <Controller
                  name="no"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControlLabel
                      sx={{ color: 'textAndIcon.dark', ml: 0 }}
                      control={
                        <HBCheckBox
                          sx={{ mr: 4 }}
                          {...field}
                          checked={Boolean(field.value)}
                          onChange={event => {
                            field.onChange(event)
                          }}
                        />
                      }
                      label="تبعه خارجی فاقد کد ملی هستم"
                    />
                  )}
                /> */}
              </Box>
            </Box>
            <Box mx={4} mb={4}>
              <HBButton variant="primary" fullWidth type="submit" loading={isPending} disabled={isPending}>
                تایید اطلاعات
              </HBButton>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </HBBottomSheet>
  )
}
