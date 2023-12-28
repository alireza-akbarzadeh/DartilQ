import { Divider, Stack, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { memo } from 'react'

import { HBButton, HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'
import { useGetProductSearchSuggestion } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

import { SearchSkeleton } from './SearchSkeleton'

const SuggestStore = (props: { name: string; onclick: VoidFunction }) => {
  return (
    <HBButton onClick={props.onclick} size="small" variant="neutral2" sx={{ justifyContent: 'flex-start', gap: 2 }}>
      <HBIcon name="store" size="xSmall" />
      <Typography variant="bodySmall">{props.name}</Typography>
    </HBButton>
  )
}

const SuggestCategory = (props: { name: string; parent: string; onClick: VoidFunction }) => {
  return (
    <HBButton
      size="small"
      onClick={props.onClick}
      sx={{ height: 'fit-content', justifyContent: 'flex-start', py: 2 }}
      variant="neutral2"
    >
      <Stack spacing={4}>
        <Stack sx={{ justifyContent: 'flex-start', gap: 2, color: neutral[800] }} direction="row">
          <HBIcon name="apps" size="xSmall" />
          <Typography variant="bodySmall">{props.name}</Typography>
        </Stack>
        <Typography variant="bodySmall" sx={{ color: neutral[600], justifyContent: 'flex-start' }}>
          در دسته‌ بندی {props.parent}
        </Typography>
      </Stack>
    </HBButton>
  )
}

const SuggestWord = (props: { name: string; onClick: VoidFunction }) => {
  return (
    <HBButton onClick={props.onClick} size="small" variant="neutral2" sx={{ justifyContent: 'flex-start', gap: 2 }}>
      <HBIcon name="searchAlt" size="xSmall" />
      <Typography variant="bodySmall">{props.name}</Typography>
    </HBButton>
  )
}

type SuggestSearchProps = {
  searched: string
}

const SuggestSearch = memo((props: SuggestSearchProps) => {
  const { push } = useRouter()
  const { searched } = props
  const path = usePathname()
  const { data: userSession } = useSession()
  const defaultAddress = userSession?.user.address
  const { data: suggestsData, isLoading } = useGetProductSearchSuggestion(
    {
      Latitude: defaultAddress?.latitude,
      Longitude: defaultAddress?.longitude,
      Query: searched,
      CityId: defaultAddress?.cityId,
    },
    { query: { enabled: !!searched } },
  )

  const suggests = suggestsData?.data

  const navigateToSearch = (searched: string, categoryId?: string) => {
    let url = `${path}?searched=${searched}`
    if (categoryId) url += `&categoryId=${categoryId}`
    push(url)
  }

  if (isLoading) return <SearchSkeleton />

  return (
    <Stack spacing={2}>
      <Stack spacing={2} sx={{ px: 4 }}>
        {props.searched && (
          <HBButton
            onClick={() => navigateToSearch(props.searched)}
            size="small"
            variant="neutral2"
            sx={{ gap: 1, justifyContent: 'flex-start', width: 'fit-content' }}
          >
            <Typography variant="bodySmall" color={neutral[300]}>
              جستجو
            </Typography>
            <Typography variant="bodySmall" color={neutral[800]}>
              “{props.searched}”
            </Typography>
          </HBButton>
        )}

        {!!suggests?.stores?.length && (
          <>
            <Divider sx={{ borderColor: neutral[100] }} />
            {suggests?.stores?.reduce<JSX.Element[]>((acc, store) => {
              if (store.name) {
                acc.push(<SuggestStore onclick={() => navigateToSearch(store.name ?? '')} name={store.name} />)
              }
              return acc
            }, [])}
          </>
        )}
        {!!suggests?.categories?.length && (
          <>
            <Divider sx={{ borderColor: neutral[100] }} />
            {suggests?.categories?.reduce<JSX.Element[]>((acc, category) => {
              if (category.title) {
                acc.push(
                  <SuggestCategory
                    onClick={() => navigateToSearch(props.searched, category.id)}
                    name={props.searched}
                    parent={category.title}
                  />,
                )
              }
              return acc
            }, [])}
          </>
        )}

        {!!suggests?.querySuggestions?.length && (
          <>
            <Divider sx={{ borderColor: neutral[100] }} />
            {suggests?.querySuggestions?.reduce<JSX.Element[]>((acc, query) => {
              if (query.expression) {
                acc.push(
                  <SuggestWord onClick={() => navigateToSearch(query.expression ?? '')} name={query.expression} />,
                )
              }
              return acc
            }, [])}
          </>
        )}
      </Stack>
    </Stack>
  )
})

SuggestSearch.displayName = 'SuggestSearch'

export { SuggestSearch }
