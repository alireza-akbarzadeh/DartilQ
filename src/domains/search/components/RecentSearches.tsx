import { Box, Stack, Typography } from '@mui/material'
import useEmblaCarousel from 'embla-carousel-react'

import { useSearch } from '../hooks'
import { RecentSearchItem } from './RecentSearchItem'

const RecentSearches = () => {
  const { recentSearches } = useSearch()
  const [emblaRef] = useEmblaCarousel({ direction: 'rtl', dragFree: true })
  return (
    <Stack spacing={4}>
      <Typography variant="titleLarge" sx={{ px: 4 }}>
        جستجوهای اخیر
      </Typography>

      <Box sx={{ overflow: 'hidden' }} className="embla" ref={emblaRef}>
        <Stack direction="row">
          {recentSearches.map((item, index) => (
            <RecentSearchItem key={index} title={item} />
          ))}
        </Stack>
      </Box>
    </Stack>
  )
}

export { RecentSearches }
