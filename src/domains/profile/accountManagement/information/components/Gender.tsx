'use client'

import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { HBBottomSheet, HBButton, HBIcon } from '@/core/components'
import { useGetWebGeneralDataBusinessTypeValueV2ByBusinessTypeBusinessType } from '@/services/generalData-services/generalData'
import { BusinessType } from '@/services/generalData-services/generalData.schemas'
import { useGetUserIndividual, usePutUserIndividual } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

interface GenderProps {
  onClose?: (isRefetch?: boolean) => void
}

export const Gender = (props: GenderProps) => {
  const { onClose } = props
  const { data: genderData } = useGetWebGeneralDataBusinessTypeValueV2ByBusinessTypeBusinessType(
    BusinessType.NUMBER_1003,
  )
  const genderItems = genderData?.data?.items?.map(value => ({ title: value.title!, value: value.id! })) || []

  const { data } = useGetUserIndividual({
    query: { staleTime: 50000 },
  })
  const [gender, setGender] = useState(data?.data?.gender)
  const { mutateAsync: updateUser, isPending } = usePutUserIndividual()

  const handleUpdate = () => {
    updateUser({
      data: {
        gender,
        birthDate: data?.data?.birthDate,
        email: data?.data?.email,
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
        nationalCode: data?.data?.nationalCode,
      },
    }).then(() => onClose?.(true))
  }

  return (
    <HBBottomSheet
      onClose={() => onClose?.()}
      open
      hidePuller
      header={
        <Box display="flex" alignItems="center" justifyContent="space-between" p={4}>
          <Typography variant="titleLarge" color="textAndIcon.darker">
            جنسیت
          </Typography>
          <HBIcon name="timesCircle" onClick={onClose} />
        </Box>
      }
      hideDivider
    >
      <Stack mt={2} mb={1} mx={6}>
        <RadioGroup value={gender} onChange={(_, value) => setGender(+value)}>
          {genderItems.map(item => (
            <FormControlLabel value={item.value} control={<Radio />} label={item.title} key={item.value} />
          ))}
        </RadioGroup>
      </Stack>
      <Divider sx={{ borderColor: 'border.lighter' }} />
      <Stack direction="row" spacing={4} px={4} py={2}>
        <HBButton fullWidth variant="secondary" onClick={() => onClose?.()}>
          انصراف
        </HBButton>
        <HBButton
          fullWidth
          variant="primary"
          onClick={handleUpdate}
          disabled={isPending || !gender}
          loading={isPending}
        >
          تایید
        </HBButton>
      </Stack>
    </HBBottomSheet>
  )
}
