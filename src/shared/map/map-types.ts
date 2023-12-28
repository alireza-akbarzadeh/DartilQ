import { ImageProps } from 'next/image'
import { ViewState } from 'react-map-gl'

import { Location } from '@/services/locality-services/locality.schemas'

type AddressCallback = {
  address: string
  cityId?: string
  provinceId?: string
} & LatLng

type LatLng = {
  lng?: number
  lat?: number
}

type AddressInformation = {
  cityId?: string
  provinceId?: string
  addressTitle?: string
}

type MarkerType = Partial<Pick<ImageProps, 'src' | 'width' | 'height'>>

type SearchBoxProps = {
  onSearchMounted?: (ref: searchType) => void
  addressInformation?: AddressInformation
}

type searchType = {
  id?: string
  address?: string
  location?: Location
  name?: string
  nameEn?: string
}

type MapProps = {
  addressFetchCallback?: (value: AddressCallback | boolean) => void
  isLoading?: (loading: boolean) => void
  onChangeLocation?: (event: LatLng) => void
  onClick?: (value: LatLng) => void
  isShowSearch?: boolean
  searchProps?: SearchBoxProps
  readOnly?: boolean
  showPopUp?: boolean
  readOnlyOnClick?: () => void
  markerProps?: MarkerType
  addressInformation?: AddressInformation
  centerMode?: boolean
  onNavigationChanged?: (value: LatLng) => void
} & Partial<Pick<ViewState, 'zoom' | 'latitude' | 'longitude'>>

export type { AddressCallback, AddressInformation, LatLng, MapProps, MarkerType, SearchBoxProps, searchType }
