import { Box, Stack, Typography } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'

import { useSearch } from '../hooks'

type RecentSearchItemProps = {
  title: string
}

const RecentSearchItem = (props: RecentSearchItemProps) => {
  const { updateRecentSearches } = useSearch()
  const searchParams = useSearchParams()
  const searched = searchParams.get('searched')
  const path = usePathname()
  const router = useRouter()

  const removeSearchFromRecent = () => {
    updateRecentSearches(props.title, 'remove')
  }

  const handleSearch = () => {
    if (props.title === searched) router.replace(path)
    setTimeout(() => {
      router.push(`${path}?searched=${props.title}`)
    }, 100)
  }

  return (
    <Box
      sx={{
        minWidth: 0,
        flex: '0 0 auto',
        maxWidth: '100%',
        px: 2,
        cursor: 'pointer',
        '&:first-of-type': {
          pl: 4,
        },
        '&:last-child': {
          pr: 4,
        },
      }}
    >
      <Stack
        justifyContent="center"
        sx={{ borderRadius: 8, py: 1.5, px: 3, gap: 1.5, bgcolor: neutral[100], cursor: 'pointer' }}
        direction="row"
      >
        <Typography onClick={handleSearch} variant="labelMedium" color={neutral[600]}>
          {props.title}
        </Typography>
        <HBIcon
          onClick={removeSearchFromRecent}
          size="small"
          name="timesCircle"
          sx={{ color: neutral[200], cursor: 'pointer' }}
        />
      </Stack>
    </Box>
  )
}

export { RecentSearchItem }
