'use client'
import { Box, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { HBButton, HBIcon, HBNextImage } from '@/core/components'

import { WrapperInstallAppButton } from './styles'

export const InstallAppSection = (): JSX.Element => {
  const { spacing } = useTheme()

  const { push } = useRouter()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: 680,
          backgroundColor: 'primary.main',
          flexDirection: 'column',
          gap: 6,
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: 'common.white',
            padding: spacing(8, 4),
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              alignItems: 'center',
              maxWidth: 360,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography variant="titleMedium">با دارتیل خریدت به راهه!</Typography>
            </Box>
            <Typography variant="bodyMedium" component="div" sx={{ textAlign: 'center', wordWrap: 'break-word' }}>
              با نصب اپلیکشن دارتیل می‌تونی در هر مکان و در هر زمان به فروشگاه‌های اطرافت دسترسی داشته‌باشی و خریدت رو
              در کمتر از ۲۴ ساعت با ارسال سریع تحویل بگیری.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              padding: spacing(4),
              maxWidth: 360,
            }}
          >
            <Link href="https://trc.metrix.ir/bmrg2x" target="_blank" style={{ textDecoration: 'none' }}>
              <WrapperInstallAppButton
                bgcolor="common.black"
                sx={{
                  color: 'common.white',
                }}
              >
                <Typography variant="bodySmall">دریافت از</Typography>
                <HBNextImage isLocal alt="cafe-bazar" height={27} src="/assets/downloadApp/bazarWhite.png" width={66} />
              </WrapperInstallAppButton>
            </Link>
            <Link href="https://trc.metrix.ir/9idvht" target="_blank" style={{ textDecoration: 'none' }}>
              <WrapperInstallAppButton
                bgcolor="common.black"
                sx={{
                  color: 'common.white',
                }}
              >
                <Typography variant="bodySmall">دریافت از</Typography>
                <HBNextImage isLocal alt="myket" height={21} src="/assets/downloadApp/myketAppWhite.png" width={67} />
              </WrapperInstallAppButton>
            </Link>
            <Link href="https://trc.metrix.ir/x4ibvf" target="_blank" style={{ textDecoration: 'none' }}>
              <WrapperInstallAppButton
                bgcolor="common.black"
                sx={{
                  color: 'common.white',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="smallCaption">دریافت نسخه ios از</Typography>
                  <HBNextImage
                    alt="sib-app-text"
                    height={17}
                    src="/assets/downloadApp/sibappTextWhite.png"
                    width={62}
                    isLocal
                  />
                </Box>
                <HBNextImage
                  isLocal
                  alt="sib-app"
                  height={30}
                  src="/assets/downloadApp/sibappIconWhite.png"
                  width={22}
                />
              </WrapperInstallAppButton>
            </Link>
            <Link href="https://sibche.com/applications/dartil" target="_blank" style={{ textDecoration: 'none' }}>
              <WrapperInstallAppButton
                bgcolor="common.black"
                sx={{
                  color: 'common.white',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="smallCaption">دریافت نسخه ios از</Typography>
                  <HBNextImage
                    isLocal
                    alt="sibche-text"
                    height={17}
                    src="/assets/downloadApp/sibcheText.png"
                    width={62}
                  />
                </Box>
                <HBNextImage isLocal alt="sibche" height={30} src="/assets/downloadApp/sibcheIcon.png" width={22} />
              </WrapperInstallAppButton>
            </Link>
            <Link href="https://cdn.dartil.com/dartil.apk" target="_blank" style={{ textDecoration: 'none' }}>
              <WrapperInstallAppButton
                bgcolor="common.black"
                sx={{
                  color: 'common.white',
                }}
              >
                <Box>
                  <Typography color="common.white" component="div" variant="smallCaption">
                    دانلود مستقیم
                  </Typography>
                  <Typography color="common.white" component="div" variant="caption">
                    اپلیکیشن اندروید
                  </Typography>
                </Box>
                <HBIcon sx={{ color: '#9EBC4A' }} name="android" />
              </WrapperInstallAppButton>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              minHeight: 120,
            }}
          />
        </Box>
        <Box
          sx={{
            height: 175,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'common.white',
            borderRadius: '0% 100% 0% 100% / 100% 15% 85% 0%',
          }}
        >
          <HBNextImage
            alt="bazarWhite"
            height={330}
            src="/assets/png/banner.png"
            width={274}
            style={{
              marginTop: -170,
            }}
            isLocal
          />
        </Box>
      </Box>
      <Box sx={{ backgroundColor: 'textAndIcon.darker' }}>
        <Box
          sx={{
            height: 210,
            width: '100%',
            backgroundColor: 'common.white',
            borderRadius: '25% 25% 5% 90% / 0% 0% 0% 7%',
            px: 4,
            py: 6,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="titleMedium" sx={{ textAlign: 'center', wordWrap: 'break-word', height: 28 }}>
                صاحب کسب و کار هستید؟
              </Typography>
              <Typography variant="bodyMedium" component="div" sx={{ textAlign: 'center', wordWrap: 'break-word' }}>
                با دارتیل کسب و کارتان را آنلاین کنید و فروشتان را افزایش دهید
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <HBButton
                variant="primary"
                size="small"
                onClick={() => {
                  push('https://dartil.com/seller-landing/')
                }}
              >
                <Typography variant="bodySmall">ثبت نام فروشندگان</Typography>
              </HBButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
