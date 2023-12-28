'use client'
import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { ReactNode } from 'react'

import { HBIcon, HBIconProps, HBRoundedBox } from '@/core/components'
import { glyphy } from '@/core/utils'
import { MainHeader } from '@/domains/profile/components/MainHeader'
import { useGetWebWalletWalletsMeWallets } from '@/services/wallet-services/wallet'
import { WalletDiscriminatorEnum } from '@/shared/types/enums'

interface RowRenderProps {
  iconName: HBIconProps['name']
  title: ReactNode
  link?: string
}

const RowRender = ({ iconName, title }: RowRenderProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center" width="100%" mr={4}>
        <HBRoundedBox size={40} sx={{ bgcolor: 'background.neutral' }}>
          <HBIcon name={iconName} />
        </HBRoundedBox>
        <Typography ml={4} variant="labelLarge" color="textAndIcon.darker" width="100%">
          {title}
        </Typography>
      </Box>
      <HBIcon name="angleLeft" sx={{ color: 'textAndIcon.dark' }} />
    </Box>
  )
}

export const ProfilePage = () => {
  const { push } = useRouter()
  const { data } = useGetWebWalletWalletsMeWallets()
  const activeDebitWallet = data?.data?.find(wallet => wallet.discriminatorEnum === WalletDiscriminatorEnum.wallet)
  return (
    <Stack>
      <MainHeader />

      <Stack spacing={1}>
        <Link href="/profile/account-management">
          <RowRender title="مدیریت حساب کاربری" iconName="user" />
        </Link>
        <Link href="/wallet">
          <RowRender
            title={
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                <Typography variant="labelLarge" color="textAndIcon.darker">
                  کیف پول
                </Typography>
                <Typography variant="labelLarge" color="primary.dark">
                  {activeDebitWallet?.balance?.amount?.toLocaleString()} {glyphy(activeDebitWallet?.balance?.unitTitle)}
                </Typography>
              </Box>
            }
            iconName="wallet"
            link="/wallet"
          />
        </Link>
        <Link href="/profile/order-management/current">
          <RowRender title="مدیریت سفارشات" iconName="shoppingBag" link="/profile/account-management" />
        </Link>
        <Link href="/profile/address">
          <RowRender title="آدرس‌ها" iconName="locationPoint" />
        </Link>
        <Link href="/profile/voucher/Active">
          <RowRender title="کدهای تخفیف" iconName="tag" />
        </Link>
        <Link href="/profile/ticketing">
          <RowRender title="ثبت درخواست" iconName="envelopeQuestion" link="/profile/account-management" />
        </Link>
        <Link href="/profile/aboutus">
          <RowRender title="درباره دارتیل" iconName="infoCircle" link="/profile/account-management" />
        </Link>
        <Box onClick={() => signOut({ redirect: false }).then(() => push('/'))}>
          <RowRender title="خروج" iconName="signout" />
        </Box>
      </Stack>
    </Stack>
  )
}
