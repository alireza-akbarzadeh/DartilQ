import { Box, Stack } from '@mui/material'
import { EmblaCarouselType } from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import { HBCarousel, HBNextImage } from '@/core/components'

import { useProduct } from '../hooks'

const ProductMediaList = () => {
  const { activeProduct } = useProduct()
  const [emblaMainApi, setEmblaMainApi] = useState<EmblaCarouselType | undefined>(undefined)
  const [emblaThumbsApi, setEmblaThumbsApi] = useState<EmblaCarouselType | undefined>(undefined)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleChangeIndex = (index: number) => {
    emblaMainApi?.scrollTo(index)
    setCurrentIndex(index)
  }

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setCurrentIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setCurrentIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  if (!activeProduct?.mediaList?.length) return
  return (
    <Stack spacing={2} sx={{ pt: 4 }}>
      <Box>
        <HBCarousel onEmblaApi={setEmblaMainApi} options={{ direction: 'rtl', dragFree: false }}>
          {activeProduct?.mediaList?.map(media => (
            <HBNextImage
              style={{ flex: '0 0 100%', minWidth: 0, objectFit: 'contain' }}
              width={512}
              height={350}
              key={media.path}
              alt=""
              src={media.path ?? ''}
            />
          ))}
        </HBCarousel>
      </Box>
      <Box sx={{ px: 4 }}>
        <HBCarousel
          onEmblaApi={setEmblaThumbsApi}
          slideSx={{ flex: '0 0 56px', minWidth: 0, height: 56, position: 'relative', mr: 2 }}
          options={{ direction: 'rtl' }}
        >
          {activeProduct?.mediaList?.map((media, index) => (
            <Box
              onClick={() => handleChangeIndex(index)}
              key={media.path}
              sx={{
                position: 'relative',
                width: '100%',
                flex: '0 0 56px',
                minWidth: 0,
                height: 56,
                mr: 2,
                ...(index !== currentIndex && { opacity: '40%' }),
              }}
            >
              <HBNextImage style={{ objectFit: 'contain' }} fill alt="" src={media.path ?? ''} />
            </Box>
          ))}
        </HBCarousel>
      </Box>
    </Stack>
  )
}

export { ProductMediaList }
