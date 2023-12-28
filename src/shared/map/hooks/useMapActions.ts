import { debounce } from '@mui/material'
import { CSSProperties, useEffect, useRef } from 'react'
import { RefObject, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { MapRef, ViewStateChangeEvent } from 'react-map-gl'

import { getWebLocalityMapsGetAddress, getWebLocalityTryFindGeo } from '@/services/locality-services/locality'
import { AddressResultApiResult, TryFindGeoQueryResultApiResult } from '@/services/locality-services/locality.schemas'
import { LatLng, MapProps, searchType } from '@/shared/map/map-types'

type UseMapActionProps = {
  mapRef: RefObject<MapRef>
} & Pick<
  MapProps,
  | 'readOnly'
  | 'longitude'
  | 'latitude'
  | 'showPopUp'
  | 'addressFetchCallback'
  | 'isLoading'
  | 'onChangeLocation'
  | 'centerMode'
  | 'onNavigationChanged'
>

type CursorType = CSSProperties['cursor']

export const useMapAction = (props: UseMapActionProps) => {
  const {
    readOnly,
    latitude,
    longitude,
    addressFetchCallback,
    isLoading,
    mapRef,
    onChangeLocation,
    centerMode,
    onNavigationChanged,
  } = props

  const [cursor, setCursor] = useState<CursorType>('grab')
  const [selectedLatLng, setSelectedLatLng] = useState<LatLng | null>(
    latitude && longitude ? { lng: longitude, lat: latitude } : null,
  )
  const firstTimeFetched = useRef(false)

  useEffect(() => {
    if (!firstTimeFetched.current && latitude && longitude) {
      firstTimeFetched.current = true
      isLoading?.(true)
      changePositionRequestHandler({ lat: latitude, lng: longitude })
    }
  }, [latitude, longitude])

  const changePositionRequestHandler = async (value: LatLng): Promise<void> => {
    if (addressFetchCallback && Boolean(typeof window)) {
      const { lat, lng } = value
      const promises = [
        getWebLocalityMapsGetAddress({
          Longitude: lng,
          Latitude: lat,
        }),
        getWebLocalityTryFindGeo({ lat, lng }),
      ]

      const [generalData, internalData] = await Promise.all(promises)
      const { formatted_Address: address } = {
        ...(generalData as AddressResultApiResult).data?.result,
      }
      const { preferedCity, preferedProvince } = {
        ...(internalData as TryFindGeoQueryResultApiResult).data,
      }
      isLoading?.(false)
      addressFetchCallback({
        address: address ?? '',
        cityId: preferedCity?.id,
        provinceId: preferedProvince?.id,
        lat,
        lng,
      })
    }
  }

  const debouncedChangePositionRequestHandler = useCallback(
    debounce((value: LatLng) => {
      changePositionRequestHandler(value)
    }, 1000),
    [],
  )

  const changePosition = async (value: LatLng): Promise<void> => {
    const { lat, lng } = value

    if (mapRef.current)
      mapRef.current?.flyTo({
        center: { lng, lat } as { lng: number; lat: number },
        essential: true,
      })
    isLoading?.(true)

    setSelectedLatLng({ lat, lng })
    onChangeLocation?.({ lat, lng })
    debouncedChangePositionRequestHandler(value)
  }

  const handleChangeSearch = (value: searchType): void => {
    const location = value?.location?.center?.split(',')
    if (location && location.length === 2) {
      changePosition({ lat: Number(location[0]), lng: Number(location[1]) })
    }
  }

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        onNavigationChanged?.({ lat: latitude, lng: longitude })
        changePosition({ lat: latitude, lng: longitude })
      },
      () => {
        toast.error('درحال حاضر امکان دسترسی به موقعیت مکانی شما وجود ندارد. لطفا بصورت دستی آن را ثبت کنید')
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      },
    )
  }

  const handleCursorStyle = (dragStatus: 'start' | 'end'): void => {
    if (dragStatus === 'start') {
      setCursor('grabbing')
    } else {
      setCursor('grab')
    }
  }

  const handleDragEnd = (value: ViewStateChangeEvent): void => {
    handleCursorStyle('end')
    if (centerMode && !readOnly) {
      changePosition({
        lat: value.viewState.latitude,
        lng: value.viewState.longitude,
      })
    }
  }

  const handleDragStart = (): void => {
    handleCursorStyle('start')
  }

  return {
    handleChangeSearch,
    handleDragStart,
    handleDragEnd,
    cursor,
    changePosition,
    selectedLatLng,
    handleGeoLocation,
  }
}
