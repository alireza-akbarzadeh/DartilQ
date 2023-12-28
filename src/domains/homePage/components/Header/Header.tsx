import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

import { HBIcon, HBRoundedBox } from '@/core/components'
import { useIsInViewport } from '@/shared/hooks/useIsInViewport'

import { Address } from './Address'

type HeaderProps = {
  categoryRef: HTMLElement
  onChangeDefaultAddress: (refreshDefaultAddressKey: string) => void
}

export const Header = ({ categoryRef, onChangeDefaultAddress }: HeaderProps) => {
  const { isIntersecting, position } = useIsInViewport(categoryRef)
  const isCategoryVisible = isIntersecting || (position?.top ?? 0) > 0
  const { push } = useRouter()
  const navigateToSearch = () => {
    push('/search')
  }

  const navigateToWallet = () => {
    push('/wallet')
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: isCategoryVisible ? 'primary.main' : 'background.lightest',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          color: isCategoryVisible ? 'textAndIcon.lightest' : 'textAndIcon.darker',
          px: 4,
          py: 2,
          height: 56,
          width: '100%',
        }}
      >
        <HBRoundedBox
          size={40}
          sx={{
            bgcolor: isCategoryVisible ? 'primary.dark' : 'background.light',
            color: isCategoryVisible ? 'common.white' : 'textAndIcon.darker',
          }}
          onClick={() => push('/profile')}
        >
          <HBIcon name="user" />
        </HBRoundedBox>
        <Box
          onClick={navigateToSearch}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
            px: 4,
            py: 1.5,
            flex: '1 0 0',
            bgcolor: isCategoryVisible ? 'primary.dark' : 'background.light',
            borderRadius: 37,
            height: 40,
            cursor: 'pointer',
          }}
        >
          <HBIcon name="searchAlt" />
          <Typography variant="labelMedium">جستجو فروشنده یا کالا...</Typography>
        </Box>
        <HBRoundedBox
          size={40}
          sx={{
            bgcolor: isCategoryVisible ? 'primary.dark' : 'background.light',
            color: isCategoryVisible ? 'common.white' : 'textAndIcon.darker',
          }}
          onClick={navigateToWallet}
        >
          <HBIcon name="wallet" />
        </HBRoundedBox>
      </Box>
      <Address onChangeDefaultAddress={onChangeDefaultAddress} isVisible={isCategoryVisible} />
    </Stack>
  )
}
