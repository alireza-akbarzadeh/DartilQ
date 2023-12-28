'use client'

import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { HBButton, HBIcon, HBRoundedBox } from '@/core/components'
import { useWindowHeight } from '@/core/hooks'
import { neutral } from '@/core/providers/material/theme'

const NeedToEditAddress = () => {
  const { get } = useSearchParams()
  const sourceUrl = get('source')
  const { push } = useRouter()
  const windowsHeight = useWindowHeight()
  const contentHeight = windowsHeight ? `${windowsHeight}px` : '100vh'
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          px: 4,
          py: 2,
        }}
      >
        <HBRoundedBox
          size={40}
          sx={{
            bgcolor: 'primary.dark',
            color: 'common.white',
          }}
        >
          <HBIcon name="user" />
        </HBRoundedBox>
        <HBRoundedBox
          size={40}
          sx={{
            bgcolor: 'primary.dark',
            color: 'common.white',
          }}
        >
          <HBIcon name="wallet" />
        </HBRoundedBox>
      </Stack>

      <Stack
        sx={{
          height: `calc(${contentHeight} - 56px)`,
          px: 4,
        }}
        alignItems="center"
        justifyContent="center"
        rowGap={4}
      >
        <Image quality={100} width={160} height={188} alt="" src="/assets/svg/edit-address.png" />
        <Stack spacing={2} alignItems="center">
          <Typography variant="bodyLarge" color={neutral[50]}>
            آدرس شما نیاز به بروزرسانی دارد!
          </Typography>
          <Typography variant="bodyMedium" color={neutral[50]}>
            جهت مشاهده فروشگاه‌ها لطفا آدرس خود را ویرایش کنید.
          </Typography>
        </Stack>
        <HBButton
          onClick={() => push(`/address?source=${sourceUrl}`)}
          fullWidth
          startIcon={<HBIcon size="xSmall" name="editAlt" />}
          sx={{ color: 'primary.main' }}
          variant="neutral2"
        >
          ویرایش آدرس
        </HBButton>
      </Stack>
    </Box>
  )
}

export { NeedToEditAddress }
