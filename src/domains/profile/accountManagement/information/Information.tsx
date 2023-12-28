'use client'

import { Box, Stack, Typography } from '@mui/material'
import { format } from 'date-fns-jalali'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { HBIcon, HBRoundedBox } from '@/core/components'
import { BirthDate } from '@/domains/profile/accountManagement/information/components/BirthDate'
import { Email } from '@/domains/profile/accountManagement/information/components/Email'
import { Gender } from '@/domains/profile/accountManagement/information/components/Gender'
import { Identity } from '@/domains/profile/accountManagement/information/components/Identity'
import { PhoneNumber } from '@/domains/profile/accountManagement/information/components/PhoneNumber'
import { Header } from '@/domains/profile/components/Header'
import { useGetUserIndividual } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

interface RowRenderProps {
  value?: string | null
  title: ReactNode
  onClick?: () => void
}

const RowRender = (props: RowRenderProps) => {
  const { title, value, onClick } = props
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mx={4}
      py={3}
      borderBottom="1px solid"
      borderColor="border.lighter"
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Stack spacing={2} height={53} justifyContent="center">
        {value && (
          <Typography variant="labelMedium" color="textAndIcon.darker">
            {title}
          </Typography>
        )}
        <Typography variant="bodyMedium" color="textAndIcon.darker">
          {value || title}
        </Typography>
      </Stack>
      {value ? (
        <HBIcon name="angleLeft" sx={{ color: 'textAndIcon.darker' }} />
      ) : (
        <HBRoundedBox size={40} sx={{ bgcolor: 'background.neutral' }}>
          <HBIcon name="plus" sx={{ color: 'textAndIcon.darker' }} />
        </HBRoundedBox>
      )}
    </Box>
  )
}

const getGenderValue = (value?: number | null) => {
  switch (value) {
    case 1003002: {
      return 'زن'
    }
    case 1003001: {
      return 'مرد'
    }
    default: {
      return null
    }
  }
}

export const InformationPage = () => {
  const { back } = useRouter()
  const { data, refetch } = useGetUserIndividual({
    query: { staleTime: 50000 },
  })
  const [openBottomSheet, setOpenBottomSheet] = useState({
    identity: false,
    phoneNumber: false,
    email: false,
    birthDate: false,
    gender: false,
  })

  const userData = data?.data
  return (
    <Box>
      <Header title="اطلاعات حساب کاربری" onClick={() => back()} />
      <RowRender
        title="نام"
        value={userData?.firstName}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, identity: true }))}
      />
      <RowRender
        title="نام خانوادگی"
        value={userData?.lastName}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, identity: true }))}
      />
      <RowRender
        title={
          userData?.mobileNoStateTitle ? (
            <Box display="flex" alignItems="center">
              کد ملی
              <Typography
                variant="labelMedium"
                color="textAndIcon.darker"
                borderRadius={2}
                border="1px solid"
                borderColor="border.lightest"
                py={1}
                px={2}
                ml={2}
              >
                {userData?.nationalCodeStateTitle}
              </Typography>
            </Box>
          ) : (
            'کد ملی'
          )
        }
        value={userData?.nationalCode}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, identity: true }))}
      />
      <RowRender
        title="تاریخ تولد"
        value={userData?.birthDate ? format(new Date(userData?.birthDate), 'dd MMMM yyyy') : undefined}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, birthDate: true }))}
      />
      <RowRender
        title="جنسیت"
        value={getGenderValue(userData?.gender)}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, gender: true }))}
      />
      <RowRender
        title="شماره موبایل"
        value={userData?.mobileNo}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, phoneNumber: true }))}
      />
      <RowRender
        title="ایمیل"
        value={userData?.email}
        onClick={() => setOpenBottomSheet(prev => ({ ...prev, email: true }))}
      />

      {openBottomSheet.identity && (
        <Identity
          onClose={isRefetch => {
            if (isRefetch) refetch()
            setOpenBottomSheet(prev => ({ ...prev, identity: false }))
          }}
        />
      )}
      {openBottomSheet.phoneNumber && (
        <PhoneNumber
          onClose={isRefetch => {
            if (isRefetch) refetch()
            setOpenBottomSheet(prev => ({ ...prev, phoneNumber: false }))
          }}
        />
      )}
      {openBottomSheet.email && (
        <Email
          onClose={isRefetch => {
            if (isRefetch) refetch()
            setOpenBottomSheet(prev => ({ ...prev, email: false }))
          }}
        />
      )}
      {openBottomSheet.gender && (
        <Gender
          onClose={isRefetch => {
            if (isRefetch) refetch()
            setOpenBottomSheet(prev => ({ ...prev, gender: false }))
          }}
        />
      )}
      {openBottomSheet.birthDate && (
        <BirthDate
          onClose={isRefetch => {
            if (isRefetch) refetch()
            setOpenBottomSheet(prev => ({ ...prev, birthDate: false }))
          }}
        />
      )}
    </Box>
  )
}
