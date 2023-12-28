'use client'
import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { HBBottomSheet, HBButton, HBIcon, HBLoader } from '@/core/components'
import { glyphy } from '@/core/utils'

type FooterProps = {
  hasNeedToCorrection: boolean
  totalAmount: number
  currencyTitle: string
  onStartOrder: () => void
  isLoading: boolean
  addressId: string
}

export const Footer = (props: FooterProps): JSX.Element => {
  const { currencyTitle, hasNeedToCorrection, totalAmount, onStartOrder, isLoading, addressId } = props
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)

  useEffect(() => {
    setOpenBottomSheet(hasNeedToCorrection)
  }, [hasNeedToCorrection])

  return (
    <>
      <Box
        sx={{
          px: 2,
          position: 'sticky',
          bottom: 0,
          zIndex: 100,
          bgcolor: 'background.lightest',
          py: 2,
          color: 'background.lightest',
        }}
      >
        {!hasNeedToCorrection ? (
          <HBButton
            variant="primary"
            fullWidth
            onClick={() => {
              if (!isLoading) {
                onStartOrder()
              }
            }}
          >
            {!isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 3,
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant="titleMedium">{totalAmount?.toLocaleString()}</Typography>
                  <Typography variant="smallOverline">{glyphy(currencyTitle)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="titleMedium">{totalAmount > 0 ? 'پرداخت نهایی' : 'ثبت سفارش'}</Typography>
                  <HBIcon name="arrowLeft" />
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HBLoader type="line" circleSx={{ bgcolor: 'background.lightest' }} />
              </Box>
            )}
          </HBButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="labelMedium" color="textAndIcon.darker">
              لطفا جهت ادامه و پرداخت، آدرس خود را بروز کنید.
            </Typography>
            <Link href={`/address?id=${addressId}&source=checkout`}>
              <HBButton variant="primary" sx={{ minWidth: 150 }}>
                بروزرسانی آدرس
              </HBButton>
            </Link>
          </Box>
        )}
      </Box>
      {openBottomSheet && (
        <HBBottomSheet open={openBottomSheet} onClose={() => setOpenBottomSheet(false)} hidePuller>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="titleLarge">بروز رسانی آدرس</Typography>
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
                ادرس انتخابی شما نیاز به بروز رسانی دارد؛ لطفا جهت ادامه و پرداخت ادرس خود را بروز کنید.
              </Typography>
            </Box>
            <Link href={`/address?id=${addressId}&source=checkout`}>
              <HBButton variant="primary">بروز رسانی آدرس</HBButton>
            </Link>
          </Stack>
        </HBBottomSheet>
      )}
    </>
  )
}
