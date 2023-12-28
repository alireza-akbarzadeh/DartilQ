'use client'
import { Box, SxProps } from '@mui/material'
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react'
import { Children, PropsWithChildren, useEffect } from 'react'

type PropType = {
  options?: EmblaOptionsType
  slideSx?: SxProps
  onEmblaApi?: (emblaApi: EmblaCarouselType) => void
}

export const HBCarousel = (props: PropsWithChildren<PropType>) => {
  const { children, options, onEmblaApi } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'rtl', dragFree: true, ...options })

  useEffect(() => {
    if (emblaApi) onEmblaApi?.(emblaApi)
  }, [emblaApi])

  if (!children) return null

  return (
    <Box className="embla">
      <Box className="embla__viewport" sx={{ overflow: 'hidden' }} ref={emblaRef}>
        <Box className="embla__container" display="flex">
          {Children.map(children, child => child)}
        </Box>
      </Box>
    </Box>
  )
}
