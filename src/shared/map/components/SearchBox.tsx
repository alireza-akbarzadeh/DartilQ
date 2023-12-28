'use client'

import {
  Box,
  ClickAwayListener,
  debounce,
  Divider,
  List,
  ListItemButton,
  outlinedInputClasses,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { HBIcon } from '@/core/components'
import { HBTextField } from '@/core/components/HBTextField/HBTextField'
import { neutral } from '@/core/providers/material/theme'
import { getWebLocalityMapsGetStreets } from '@/services/locality-services/locality'
import { SearchBoxProps, searchType } from '@/shared/map/map-types'

import { CitySelect } from './CitySelect'

export const SearchBox = (props: SearchBoxProps) => {
  const { onSearchMounted, addressInformation } = props
  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState<searchType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const [isFetching, setIsFetching] = useState(false)

  const handleSearch = (value: string): void => {
    if (!value) return
    setIsOpen(false)
    setSearchList([])
    setIsFetching(true)
    getWebLocalityMapsGetStreets({ limit: 20, street: value })
      .then(response => {
        setIsOpen(true)
        setSearchList(
          response?.data?.results?.map(item => ({
            id: item.id ?? '',
            address: item.address ?? '',
            location: item.location,
            name: item.name ?? '',
            nameEn: item.name ?? '',
          })) || [],
        )
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  const debouncedHandleSearch = useCallback(
    debounce((value: string) => handleSearch(value), 500),
    [],
  )

  const handleSelectSearch = (item: searchType): void => {
    onSearchMounted?.(item)
    setIsOpen(false)
  }

  useEffect(() => {
    if (addressInformation?.addressTitle) {
      setSearchValue(addressInformation.addressTitle)
    }
  }, [addressInformation])

  const handleListClosing = (): void => {
    setIsOpen(false)
  }

  const onSearchChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event?.target?.value)
    debouncedHandleSearch(event?.target?.value)
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        handleListClosing()
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: theme => theme.zIndex.drawer,
          top: 8,
          left: 8,
          right: 8,
          backgroundColor: theme => theme.palette.common.white,
          borderRadius: 2,
          border: theme => `1px solid ${theme.palette.border.light}`,
        }}
        onClick={event => event.stopPropagation()}
      >
        <Stack alignItems="center" flexDirection="row" onClick={event => event.stopPropagation()}>
          <CitySelect
            onChange={location => onSearchMounted?.({ location: { center: location } })}
            cityId={addressInformation?.cityId}
            isHide={isFocused}
          />
          {!isFocused && <Divider orientation="vertical" flexItem sx={{ borderColor: 'border.lighter' }} />}
          <HBTextField
            InputProps={{
              startAdornment: (
                <Box
                  sx={{
                    ml: 2.5,
                  }}
                >
                  <HBIcon size="small" sx={{ color: neutral[600] }} name="searchAlt" />
                </Box>
              ),
            }}
            sx={{
              flex: 1,
              [`& .${outlinedInputClasses.root}`]: {
                fieldset: {
                  border: 'none!important',
                },
              },
            }}
            value={searchValue}
            onChange={onSearchChanged}
            size="small"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </Stack>
        {isFetching && (
          <Typography borderRadius={2} bgcolor="common.white" p={2} variant="subtitle1">
            در حال جستجو
          </Typography>
        )}
        {isOpen && (
          <List
            sx={{
              width: '100%',
              backgroundColor: theme => theme.palette.common.white,
              borderRadius: theme => theme.spacing(0, 0, 2, 2),
              borderTop: `1px solid ${neutral[300]}`,
            }}
          >
            {searchList?.slice(0, 5)?.map(item => (
              <ListItemButton key={item.id} onClick={() => handleSelectSearch(item)}>
                <Typography variant="smallCaption">{item.address}</Typography>
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </ClickAwayListener>
  )
}
