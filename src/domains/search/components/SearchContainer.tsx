'use client'

import { Stack } from '@mui/material'
import { useEffect, useRef } from 'react'

import { useWindowHeight } from '@/core/hooks'
import { useDebounce } from '@/core/hooks'

import { useSearch } from '../hooks'
import { RecentSearches } from './RecentSearches'
import { SearchResult } from './SearchResult'
import { SuggestSearch } from './SuggestSearch'

type SearchContainerProps = {
  searched: string
}

const SearchContainer = (props: SearchContainerProps) => {
  const scrollableElementRef = useRef<HTMLDivElement>(null)

  const { setSearched, searched } = useSearch()
  const debouncedSearch = useDebounce(searched, 1000)

  const windowHeight = useWindowHeight()

  useEffect(() => {
    setSearched(props.searched)
  }, [props.searched])

  const renderContent = () => {
    if (!searched) return <RecentSearches />
    if (searched && props.searched !== searched) return <SuggestSearch searched={debouncedSearch} />
    return <SearchResult scrollableElementRef={scrollableElementRef} />
  }

  return (
    <Stack ref={scrollableElementRef} sx={{ py: 4, height: `calc(${windowHeight}px - 72px)`, overflowY: 'auto' }}>
      {renderContent()}
    </Stack>
  )
}

export { SearchContainer }
