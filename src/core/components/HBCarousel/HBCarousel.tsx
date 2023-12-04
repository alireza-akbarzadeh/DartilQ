import { Box, SxProps } from '@mui/material'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { Children, PropsWithChildren } from 'react'

type PropType = {
  options?: EmblaOptionsType
  slideSx?: SxProps
}

export const HBCarousel = (props: PropsWithChildren<PropType>) => {
  const { children, options = { direction: 'rtl', dragFree: true }, slideSx } = props
  const [emblaRef] = useEmblaCarousel(options)
  if (!children) return null
  return (
    <Box className="embla" sx={{ overflow: 'hidden' }}>
      <Box className="embla__viewport" ref={emblaRef}>
        <Box className="embla__container" display="flex">
          {Children.map(children, child => (
            <Box sx={{ minWidth: 'max-content', ...slideSx }}> {child}</Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
