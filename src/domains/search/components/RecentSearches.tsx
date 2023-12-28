import { Box, ButtonBase, Stack, Typography } from '@mui/material'
import useEmblaCarousel from 'embla-carousel-react'

import { HBIcon } from '@/core/components'

import { useSearch } from '../hooks'
import { RecentSearchItem } from './RecentSearchItem'

const RecentSearches = () => {
  const { recentSearches } = useSearch()
  const [emblaRef] = useEmblaCarousel({ direction: 'rtl', dragFree: true })
  const { clearRecentSearches } = useSearch()
  return (
    <Stack spacing={4}>
      <Stack sx={{ pl: 4, pr: 2 }} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="titleLarge">جستجوهای اخیر</Typography>
        <ButtonBase onClick={clearRecentSearches} sx={{ borderRadius: '100%', p: 2 }}>
          <HBIcon name="trash" sx={{ color: 'textAndIcon.lighter' }} />
        </ButtonBase>
      </Stack>

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
