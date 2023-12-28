'use client'

import { Box, Stack, styled, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HBButton, HBIcon } from '@/core/components'
import { Header } from '@/domains/profile/components/Header'

const RowStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 0),
  margin: theme.spacing(0, 4),
  borderBottom: '1px solid',
  borderColor: theme.palette.border.lightest,
}))

const rowData = [
  { title: 'اطلاعات حساب کاربری', link: '/profile/account-management/information' },
  { title: 'اطلاعات حقوقی', link: '/profile/account-management/legal' },
  { title: 'اطلاعات حساب بانکی', link: '/profile/account-management/banks' },
]

export const AccountManagementPage = () => {
  const { back } = useRouter()
  return (
    <Box>
      <Header title="مدیریت حساب کاربری" onClick={() => back()} />

      <Stack>
        {rowData.map(row => (
          <Link href={row.link} key={row.title}>
            <RowStyled>
              <Typography variant="labelLarge" color="textAndIcon.darker">
                {row.title}
              </Typography>
              <HBButton>
                <HBIcon name="angleLeft" sx={{ color: 'textAndIcon.darker' }} />
              </HBButton>
            </RowStyled>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}
