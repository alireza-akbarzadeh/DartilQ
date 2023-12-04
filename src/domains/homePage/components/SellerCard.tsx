'use client'

import { Box, Stack, styled, Typography } from '@mui/material'

import { HBNextImage } from '@/core/components/HBNextImage/HBNextImage'
import { VendorWidgetView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

const WrapperAnimateStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  borderRadius: theme.spacing(5),
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.error.main,
  '& > div': {
    '&:nth-of-type(1)': { animationDuration: '210ms' },
    '&:nth-of-type(2)': { animationDuration: '230ms' },
    '&:nth-of-type(3)': { animationDuration: '150ms' },
    '&:nth-of-type(4)': { animationDuration: '180ms' },
    '&:nth-of-type(5)': { animationDuration: '200ms' },
  },
}))

const AnimateStyle = styled(Box)(({ theme }) => ({
  width: 1,
  backgroundColor: theme.palette.common.white,
  borderRadius: 50,
  height: 3,
  animation: 'sound 0ms -500ms linear infinite alternate',
  '@keyframes sound': {
    '0%': {
      height: 3,
    },
    '100%': {
      height: 10,
    },
  },
}))

interface SellerCardProps {
  data: VendorWidgetView
  fullWidth?: boolean
}

export const SellerCard = (props: SellerCardProps) => {
  const { data, fullWidth } = props
  return (
    <Stack spacing={2} key={data.id}>
      <Box width={fullWidth ? '100%' : 312} height={130} position="relative">
        <HBNextImage
          src={`${data.dartilQImage}`}
          width={fullWidth ? undefined : 312}
          height={130}
          fill={fullWidth}
          alt={data.name || ''}
          style={{ borderRadius: 16 }}
          imageNotFound="/assets/png/store-placeholder.png"
        />
        <Box display="flex" alignContent="center" justifyContent="space-between">
          <Box
            position="absolute"
            top={0}
            left={16}
            bgcolor={'primary.main'}
            px={2}
            sx={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
          >
            <Typography variant="labelMedium" color="common.white">
              تا %{data.discountPercent?.max}
            </Typography>
          </Box>
          <Box
            position="absolute"
            bottom={8}
            display="flex"
            justifyContent={data.finalExpressText ? 'space-between' : 'flex-end'}
            width={'100%'}
            px={2}
          >
            {data.finalExpressText && (
              <Box display="flex" alignItems="center" bgcolor="background.darkest" borderRadius={2} py={1} px={2}>
                {data.finalExpressIcon && (
                  <HBNextImage src={`${data.finalExpressIcon}`} width={13} height={13} alt="express Icon" />
                )}
                <Typography borderRadius={2} color="textAndIcon.lightest" variant="labelSmall" ml={2}>
                  {data.finalExpressText}
                </Typography>
              </Box>
            )}
            {!!data.distance && (
              <Typography
                color="textAndIcon.lightest"
                variant="labelSmall"
                bgcolor="background.darkest"
                py={1}
                px={2}
                borderRadius={2}
              >
                {(parseInt((data.distance || 0)?.toString()) / 1000).toFixed(1)} کیلومتر
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignContent="center" justifyContent="space-between" px={2}>
        <Box display="flex">
          {data.live && (
            <WrapperAnimateStyle direction="row" spacing={0.4} alignItems="center">
              {[6, 13, 20, 13, 13].map((_, index) => (
                <AnimateStyle key={index} />
              ))}
            </WrapperAnimateStyle>
          )}
          <Typography variant="labelMedium" color="textAndIcon.darker">
            {data.name}
          </Typography>
        </Box>
      </Box>
    </Stack>
  )
}
