'use client'

import { Box, Stack } from '@mui/material'
import { useState } from 'react'

import { HBBottomSheet, HBButton, HBTextField } from '@/core/components'
import { Header } from '@/domains/profile/components/Header'
import { useGetUserIndividual, usePutUserIndividual } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

interface EmailProps {
  onClose: (isRefetch?: boolean) => void
}

export const Email = (props: EmailProps) => {
  const { onClose } = props
  const { data } = useGetUserIndividual({
    query: { staleTime: 50000 },
  })
  const [email, setEmail] = useState(data?.data?.email)
  const { mutateAsync: updateUser, isPending } = usePutUserIndividual()

  const handleUpdate = () => {
    updateUser({
      data: {
        email,
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
        gender: data?.data?.gender,
        birthDate: data?.data?.birthDate,
        nationalCode: data?.data?.nationalCode,
      },
    }).then(() => {
      onClose(true)
    })
  }

  return (
    <HBBottomSheet onClose={onClose} open fullScreen hidePuller>
      <Stack justifyContent="space-between" height="100%">
        <Box>
          <Header title="ایمیل" onClick={onClose} />
          <Stack spacing={3} p={4}>
            <HBTextField
              autoFocus
              sx={{ pb: 5 }}
              label="ایمیل"
              value={email}
              onChange={event => setEmail(event?.target?.value)}
            />
          </Stack>
        </Box>
        <Box mx={4}>
          <HBButton variant="primary" fullWidth onClick={handleUpdate} disabled={isPending} loading={isPending}>
            ثبت تغییرات
          </HBButton>
        </Box>
      </Stack>
    </HBBottomSheet>
  )
}
