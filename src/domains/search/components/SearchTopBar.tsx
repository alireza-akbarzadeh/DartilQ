'use client'

import { Box, InputBase, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

import { HBButton, HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'

import { useSearch } from '../hooks'

const SearchTopBar = () => {
  const { searched, setSearched } = useSearch()
  const path = usePathname()
  const { push, replace } = useRouter()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value)
  }

  const handleClearSearch = () => {
    replace(path)
    setSearched('')
  }

  const search = () => {
    if (searched) {
      push(`${path}?searched=${searched}`)
    }
  }

  return (
    <Box sx={{ pt: 2, pb: 4, flex: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ borderRadius: 9, bgcolor: neutral[100], py: 1.5, pl: 4, flex: 1, gap: 2.5, pr: 1, height: 48 }}
      >
        <HBIcon onClick={search} sx={{ cursor: 'pointer' }} size="small" name="searchAlt" />
        <InputBase value={searched ?? ''} onChange={handleSearch} autoFocus sx={{ flex: 1 }} />
        {!searched && (
          <HBButton size="small" variant="neutral2" sx={{ borderRadius: '100%' }}>
            <HBIcon name="microphone" />
          </HBButton>
        )}
        {searched && (
          <HBIcon
            onClick={handleClearSearch}
            sx={{ mr: 3, cursor: 'pointer', color: neutral[200] }}
            name="timesCircle"
          />
        )}
      </Stack>
    </Box>
  )
}

export { SearchTopBar }
