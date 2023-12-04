'use client'
import { Box, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'

import { HBNextImage, HBRoundedBox } from '@/core/components'
import { useGetCategoryCategories } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

import { introLandingMessages } from '../introLanding.messages'

export const CategorySection = (): JSX.Element => {
  const { palette, spacing } = useTheme()
  const { formatMessage } = useIntl()
  const { push } = useRouter()
  const { data } = useGetCategoryCategories()

  return (
    <Box sx={{ minHeight: 420, backgroundColor: 'primary.main' }}>
      <Box
        sx={{
          minHeight: 412,
          maxHeight: 412,
          backgroundColor: 'common.white',
          borderRadius: '0% 100% 0% 100% / 95% 5% 95% 5%',
          paddingTop: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="titleMedium">{formatMessage(introLandingMessages.category)}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 5,
            flexWrap: 'wrap',
            padding: spacing(0, 4),
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'grey.200',
            '&::-webkit-scrollbar': {
              width: '3px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'grey.200',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'grey.500',
              borderRadius: '5px',
            },
            maxHeight: 321,
          }}
        >
          {data?.data?.categories?.map(category => {
            return (
              <HBRoundedBox
                key={category?.id}
                border={{ width: 2, color: palette.primary.main }}
                shadowSx={{ backgroundColor: 'primary.main', opacity: 0.4 }}
                size={94}
                sx={{
                  backgroundColor: 'common.white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  paddingTop: spacing(2.5),
                }}
                style={{ justifyContent: 'start' }}
                onClick={() => push('/auth/signin')}
              >
                <HBNextImage alt="" height={30} src={category?.icon ?? ''} width={38} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 40,
                    paddingX: 2.5,
                    paddingBottom: 2,
                  }}
                >
                  <Typography
                    variant="labelMedium"
                    component="div"
                    sx={{
                      textAlign: 'center',
                      wordWrap: 'break-word',
                    }}
                  >
                    {category?.name}
                  </Typography>
                </Box>
              </HBRoundedBox>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
