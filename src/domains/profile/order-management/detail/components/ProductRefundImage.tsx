import { Box, Stack } from '@mui/material'

import { HBIcon, HBNextImage } from '@/core/components'

import { ContentTypeEnums } from '../../types'

interface ImageTicketProps {
  fileUrl: string
  type?: number
}

export const ProductRefundImage = ({ fileUrl, type }: ImageTicketProps): JSX.Element => (
  <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2} justifyContent="flex-start" mt={6} width="100%">
    {type === ContentTypeEnums.Image && (
      <Box height={120} position="relative" width={120}>
        <HBNextImage
          alt="Refunded Product Picture"
          fill
          src={fileUrl}
          style={{ borderRadius: 8, objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>
    )}
    {type === ContentTypeEnums.Video && (
      <Stack
        sx={{
          borderRadius: 2,
          height: 120,
          minWidth: 120,
          width: 120,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack
          autoPlay={false}
          component="video"
          controls
          src={`${process.env.NEXT_PUBLIC_CDN}${fileUrl}`}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
            objectFit: 'cover',
          }}
        >
          <source src={`${process.env.NEXT_PUBLIC_CDN}${fileUrl}`} type="video/mp4" />
        </Stack>
        <Stack
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            opacity: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HBIcon size="large" sx={{ color: 'common.white' }} name="playCircle" />
        </Stack>
      </Stack>
    )}
  </Stack>
)
