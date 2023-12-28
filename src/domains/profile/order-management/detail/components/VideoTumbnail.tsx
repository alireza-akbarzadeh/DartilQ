import { Box, CardMedia, Stack, styled, Typography } from '@mui/material'
import { CSSProperties, useEffect, useRef, useState } from 'react'

import { HBIcon } from '@/core/components'

interface VideoThumb {
  src: string
  duration?: string
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  hideDuration?: boolean
  onClick?: () => void
  border?: CSSProperties['border']
}

const VideoCardContainerStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  cursor: 'pointer',
}))

const VideoCardStyle = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  zIndex: 1,
  width: 'inherit',
  backgroundColor: theme.palette.common.white,
  opacity: 0.8,
  alignItems: 'center',
  justifyContent: 'center',
}))

const convertSeconds = (sec: number): string => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
}

export const VideoThumbnail = ({
  src,
  width = 60,
  height = 60,
  duration = '',
  hideDuration = false,
  onClick,
  border,
}: VideoThumb): JSX.Element => {
  const [mediaDuration, setMediaDuration] = useState(duration)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current?.addEventListener('loadedmetadata', () => {
        setMediaDuration(convertSeconds(Math.floor(videoRef.current?.duration ?? 0)))
      })
    }
  }, [])

  return (
    <VideoCardContainerStyle sx={{ width, height, border }}>
      <CardMedia
        component="video"
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_CDN}${src}`}
        style={{
          width,
          height,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onClick={onClick}
      />
      {!hideDuration && (
        <VideoCardStyle columnGap={1} direction="row" onClick={onClick}>
          {mediaDuration && (
            <Typography color="text.secondary" variant="caption">
              {mediaDuration}
            </Typography>
          )}
          <HBIcon
            size="small"
            sx={{
              color: 'text.secondary',
            }}
            name="video"
          />
        </VideoCardStyle>
      )}
    </VideoCardContainerStyle>
  )
}
