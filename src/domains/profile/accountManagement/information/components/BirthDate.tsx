'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { HBBottomSheet, HBButton, HBDatePickerSlider, HBIcon } from '@/core/components'
import { useGetUserIndividual, usePutUserIndividual } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

interface BirthDateProps {
  onClose: (isRefetch?: boolean) => void
}

export const BirthDate = (props: BirthDateProps) => {
  const { onClose } = props
  const { data } = useGetUserIndividual({
    query: { staleTime: 50000 },
  })
  const [birthDate, setBirthDate] = useState<Date>(data?.data?.birthDate ? new Date(data?.data?.birthDate) : new Date())
  const { mutateAsync: updateUser, isPending } = usePutUserIndividual()

  const handleUpdate = () => {
    updateUser({
      data: {
        email: data?.data?.email,
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
        gender: data?.data?.gender,
        nationalCode: data?.data?.nationalCode,
        birthDate: birthDate.toISOString(),
      },
    }).then(() => {
      onClose(true)
    })
  }

  return (
    <HBBottomSheet
      onClose={onClose}
      open
      hidePuller
      header={
        <Box display="flex" alignItems="center" justifyContent="space-between" p={4}>
          <Typography variant="titleLarge" color="textAndIcon.darker">
            انتخاب تاریخ تولد
          </Typography>
          <HBIcon name="timesCircle" onClick={onClose} />
        </Box>
      }
      hideDivider
      onTouchStart={event => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(event.nativeEvent as any).defaultMuiPrevented = true
      }}
    >
      <Box px={4}>
        <HBDatePickerSlider value={birthDate} onChange={val => setBirthDate(val)} />
      </Box>

      <Stack direction="row" spacing={4} px={4} py={2}>
        <HBButton fullWidth variant="secondary" onClick={() => onClose()}>
          انصراف
        </HBButton>
        <HBButton fullWidth variant="primary" onClick={handleUpdate} loading={isPending} disabled={isPending}>
          تایید
        </HBButton>
      </Stack>
    </HBBottomSheet>
  )
}
