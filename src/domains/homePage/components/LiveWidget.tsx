/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Box, Skeleton, Stack, styled, Typography, useTheme } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { HBCarousel, HBNextImage } from '@/core/components'
import { usePostWebGeneralDataCollectionV2CollectionDynamicResult } from '@/services/generalData-services/generalData'

declare global {
  interface Window {
    initializeLiveStream: any
    liveStreamUpdateShows: any
    addToBasket: any
    removeFromBasket: any
  }
}

enum LiveStateEnum {
  // [Display(Name = "در حال پخش ")]
  Inprogress = 1117001,

  // [Display(Name = "در صف پخش ")]
  Queue = 1117002,

  // [Display(Name = "ذخیره شده ")]
  VOD = 1117005,
}
const WrapperAnimateStyle = styled(Stack)({
  '& > div': {
    '&:nth-of-type(1)': { animationDuration: '210ms' },
    '&:nth-of-type(2)': { animationDuration: '230ms' },
    '&:nth-of-type(3)': { animationDuration: '150ms' },
    '&:nth-of-type(4)': { animationDuration: '180ms' },
    '&:nth-of-type(5)': { animationDuration: '200ms' },
  },
})

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

interface LiveWidgetProps {
  metadata?: { queryId?: string }
}

const backgroundGradient = 'linear-gradient(221deg, rgba(255,191,1,1) 87%, rgba(126,1,255,1) 87%)'

const convertSecondsToTime = (milliSeconds: number) => {
  const min = Math.floor((milliSeconds / 1000 / 60) << 0)
  const sec = Math.floor((milliSeconds / 1000) % 60)

  return `${min}:${sec}`
}

const scriptLoader = (url: string) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.id = 'liveStreamId'
    script.type = 'text/javascript'
    script.addEventListener('error', reject)
    script.addEventListener('load', resolve)
    document.body.appendChild(script)
  })

const RELOAD_COUNT = 3

const LiveSkeleton = (): JSX.Element => (
  <Stack
    bgcolor="common.white"
    borderRadius={4}
    flexDirection="column"
    py={6}
    spacing={6}
    sx={{
      overflow: 'hidden',
    }}
    width="100%"
  >
    <Stack display="flex" flexDirection="row" gap={7} pl={6}>
      <Skeleton
        height={25}
        sx={{
          borderRadius: 2,
        }}
        width={77}
      />
    </Stack>

    <Stack
      direction="row"
      display="flex"
      sx={{
        overflow: 'hidden',
      }}
      width="100%"
    >
      {Array.from({ length: 8 }).map((_, idx) => (
        <Box key={`skeleton-Live-${idx}`} pr={6}>
          <Stack alignItems="center" justifyContent="center" spacing={2} width={171}>
            <Skeleton height={96} variant="circular" width={96} />
            <Skeleton height={20} variant="rectangular" width={116} />
          </Stack>
        </Box>
      ))}
    </Stack>
  </Stack>
)

const LiveWidget = ({ metadata }: LiveWidgetProps): JSX.Element | null => {
  const theme = useTheme()
  const searchParams = useSearchParams()
  const [failCount, setFailCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const { mutateAsync, data } = usePostWebGeneralDataCollectionV2CollectionDynamicResult()

  const finalData = (data?.data as any)?.[0]?.data?.filter((item: any) => item.stateCode !== LiveStateEnum.Queue)

  useEffect(() => {
    mutateAsync({
      data: [
        {
          id: metadata?.queryId,
        },
      ],
    }).finally(() => setLoading(false))
  }, [])

  const renderStateLive = (item: any): ReactNode => {
    switch (item.stateCode) {
      case LiveStateEnum.Inprogress:
        return (
          <WrapperAnimateStyle direction="row" spacing={0.4} alignItems="center">
            {[6, 13, 20, 13, 13].map((_, index) => (
              <AnimateStyle key={index} />
            ))}
          </WrapperAnimateStyle>
        )
      case LiveStateEnum.VOD:
        return convertSecondsToTime(
          new Date(item?.endDateTime || '').getTime() - new Date(item?.startDateTime || '').getTime(),
        )
      default:
        return item.stateCodeTitle
    }
  }

  const backgroundBorderSelector = {
    [LiveStateEnum.Queue]: backgroundGradient,
    [LiveStateEnum.Inprogress]: backgroundGradient,
    [LiveStateEnum.VOD]: theme.palette.error.main,
  }

  const createScript = useCallback(() => {
    scriptLoader('https://scripts.borolive.ir/scripts/livestream.js')
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        if (failCount + 1 <= RELOAD_COUNT) {
          document.body.removeChild(error?.target)
        } else setLoading(false)
        setFailCount(prev => prev + 1)
      })
  }, [failCount])

  useEffect(() => {
    setTimeout(() => {
      if (!document.getElementById('liveStreamId')) {
        if (!window.initializeLiveStream || failCount <= RELOAD_COUNT) {
          window.initializeLiveStream = function (inesVideo: { showId: string; node: HTMLElement; config: string }) {
            window.initializeLiveStream.queue.push(inesVideo)
          }
          window.initializeLiveStream.queue = []

          createScript()
        }
      } else setLoading(false)

      finalData?.forEach((item: any) => {
        window.initializeLiveStream({
          showId: item.code,
          node: document.getElementById(item.code || ''),
          config: 'overlay',
        })
      })

      window?.liveStreamUpdateShows?.()
      const liveStream = searchParams.get('livestrem')
      if (liveStream) document.getElementById(liveStream)?.click()
    }, 1000)
  }, [failCount, data])

  if (!data?.data?.length || (!loading && failCount > RELOAD_COUNT)) return null

  return (
    <Box pt={4} pl={3}>
      {loading && (
        <Box position="relative" height="100%">
          <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: 999 }}>
            <LiveSkeleton />
          </Box>
        </Box>
      )}
      <HBCarousel>
        {finalData?.map((item: any) => (
          <Stack
            spacing={4}
            alignItems="center"
            sx={{
              cursor: 'pointer',
              ...(item.stateCode === LiveStateEnum.Inprogress && {
                '&:hover .live-image-box': {
                  border: 'unset',
                  background: 'unset',
                  '& svg': {
                    visibility: 'visible',
                  },
                },
              }),
            }}
            id={item.code || ''}
            key={item.id}
            mr={3}
          >
            <Box
              display="flex"
              alignItems="flex-start"
              position="relative"
              justifyContent="center"
              sx={{
                borderRadius: '50%',
                padding: 0.5,
                background: backgroundBorderSelector[item.stateCode as LiveStateEnum],
                '& svg': () => ({
                  visibility: 'hidden',
                  fill: 'none',
                  stroke: '#e69b31',
                  strokeLinecap: 'round',
                  strokeWidth: 2,
                  strokeDasharray: 1,
                  strokeDashoffset: 0,
                  animation: 'stroke-draw 4s ease-out infinite alternate',
                  position: 'absolute',
                  top: 0,

                  '@keyframes stroke-draw': {
                    '0%': {
                      stroke: '#e69b31',
                      strokeDasharray: 1,
                    },
                    '30%': {
                      stroke: '#ca7169',
                    },
                    '60%': {
                      stroke: '#b04b9c',
                    },
                    '100%': {
                      stroke: '#9929ca',
                      transform: 'rotate(180deg)',
                      strokeDasharray: 8,
                    },
                  },
                }),
              }}
              className="live-image-box"
            >
              <Typography
                color="common.white"
                variant="caption"
                position="absolute"
                left={'50%'}
                bottom={-8}
                bgcolor="error.main"
                borderRadius={2}
                sx={{
                  transform: 'translate(-50%,0)',
                  zIndex: 99,
                  minWidth: 50,
                  py: 1,
                  px: 2,
                  minHeight: 28.7,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                whiteSpace="nowrap"
              >
                {renderStateLive(item)}
              </Typography>
              <Box p={0.5} bgcolor="common.white" borderRadius={'50%'}>
                <Box
                  sx={{
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    position: 'relative',
                    background: theme => (!item.image ? backgroundGradient : theme.palette.common.white),
                  }}
                >
                  {item.image && (
                    <HBNextImage
                      alt={item.name || 'live-image'}
                      width={88}
                      height={88}
                      isLocal
                      src={item.image || ''}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </Box>
              </Box>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="49" />
              </svg>
            </Box>
            <Typography variant="labelMedium" color={'textAndIcon.darker'} textAlign="center" minWidth={130}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </HBCarousel>
    </Box>
  )
}

export { LiveWidget }
