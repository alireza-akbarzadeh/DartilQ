import { Box } from '@mui/material'

import { HBNextImage } from '@/core/components'

export interface HBBannerWidgetProps {
  metaData?: string | null
  imageUrl?: string | null
  title?: string | null
  name?: string | null
}

export const BannerWidget = (props: HBBannerWidgetProps): JSX.Element => {
  const metadata = props?.metaData ? JSON.parse(props.metaData) : {}

  const { imageUrl, title, name } = props
  return (
    <Box
      component={'a'}
      href={(metadata?.url as string)?.includes('http') ? metadata.url : `//${metadata.url}`}
      aria-label={name || ''}
      sx={{
        cursor: metadata?.url ? 'pointer' : 'auto',
        position: 'relative',
        width: '100%',
        height: 'auto',
        aspectRatio: '13.5/6 auto',
      }}
    >
      <HBNextImage
        src={imageUrl || ''}
        width={800}
        fill
        quality={100}
        alt={title || ''}
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />
    </Box>
  )
}
