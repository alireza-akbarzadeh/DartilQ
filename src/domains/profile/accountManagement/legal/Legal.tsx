'use client'

import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { HBIcon, HBRoundedBox } from '@/core/components'
import { Header } from '@/domains/profile/components/Header'

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

export const LegalPage = () => {
  const { back } = useRouter()

  return (
    <Box>
      <Header title="اطلاعات حقوقی" onClick={() => back()} />
      <RowRender title="نام موسسه/شرکت" value={''} />
      <RowRender title="کداقتصادی موسسه/شرکت" />
      <RowRender title="شناسه ملی" />
      <RowRender title="شناسه ثبت" />
      <RowRender title="استان موسسه/شرکت" />
      <RowRender title="شهر موسسه/شرکت" />
      <RowRender title="تلفن ثابت موسسه/شرکت" />
      <RowRender title="ایمیل شرکتی" />
    </Box>
  )
}
