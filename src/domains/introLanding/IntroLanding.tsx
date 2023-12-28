'use client'
import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { HBBottomSheet, HBButton, HBIcon } from '@/core/components'

import { CategorySection } from './components/CategorySection'
import { FooterSection } from './components/FooterSection'
import { HeaderSection } from './components/HeaderSection'
import { InstallAppSection } from './components/InstallAppSection'

export const IntroLanding = (): JSX.Element => {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const session = useSession()
  const { refresh, push } = useRouter()

  useEffect(() => {
    if (session.status === 'authenticated') refresh()
  }, [session])

  return (
    <>
      <HeaderSection setOpenBottomSheet={setOpenBottomSheet} />
      <CategorySection setOpenBottomSheet={setOpenBottomSheet} />
      <InstallAppSection />
      <FooterSection />
      {openBottomSheet && (
        <HBBottomSheet open onClose={() => setOpenBottomSheet(false)} hidePuller>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="titleLarge">برای استفاده از دارتیل</Typography>
            </Box>
            <HBIcon
              name="timesCircle"
              sx={{ color: 'textAndIcon.light', cursor: 'pointer' }}
              onClick={() => setOpenBottomSheet(false)}
            />
          </Box>
          <Stack sx={{ gap: 4, px: 4 }}>
            <Box sx={{ color: 'textAndIcon.darker', borderRadius: 2, py: 1 }}>
              <Typography variant="bodyMedium">
                لطفا ابتدا در دارتیل ثبت نام کنید یا به حساب خودتان وارد شوید. سپس موقعیت مکانی خود را مشخص کنید تا
                بتوانیم بهترین قیمت ها و سریعترین گزینه های ارسال را برای شما پیدا کنیم.
              </Typography>
            </Box>
            <HBButton variant="primary" onClick={() => push('/auth/signin')}>
              متوجه شدم
            </HBButton>
          </Stack>
        </HBBottomSheet>
      )}
    </>
  )
}
