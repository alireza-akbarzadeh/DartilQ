'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { Box, Button } from '@mui/material'
import Image from 'next/image'
import { useRef } from 'react'
import MapGl, { MapRef, Marker } from 'react-map-gl'

import { HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'
import { SearchBox } from '@/shared/map/components/SearchBox'
import { mapStyleObject, markerDefaultOptions } from '@/shared/map/constants'
import { useMapAction } from '@/shared/map/hooks/useMapActions'
import { MapProps, MarkerType } from '@/shared/map/map-types'

const Map = (props: MapProps) => {
  const {
    zoom: mapZoom,
    latitude,
    longitude,
    isShowSearch,
    searchProps,
    readOnly = false,
    readOnlyOnClick,
    addressInformation,
    markerProps,
    centerMode = false,
    onNavigationChanged,
  } = props
  const mapRef = useRef<MapRef>(null)
  const {
    handleChangeSearch,
    handleDragStart,
    handleDragEnd,
    cursor,
    changePosition,
    selectedLatLng,
    handleGeoLocation,
  } = useMapAction({
    ...props,
    mapRef,
  })
  const markerOptions: MarkerType = {
    height: markerProps?.height ?? 40,
    width: markerProps?.width ?? 40,
    src: markerProps?.src ?? markerDefaultOptions.src,
  }
  return (
    <Box sx={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
      {readOnly && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            cursor: readOnlyOnClick ? 'pointer' : 'default',
          }}
          onClick={() => {
            if (readOnlyOnClick) readOnlyOnClick()
          }}
        />
      )}
      {isShowSearch && (
        <SearchBox {...searchProps} addressInformation={addressInformation} onSearchMounted={handleChangeSearch} />
      )}
      <MapGl
        cursor={cursor}
        initialViewState={{
          longitude: longitude || 51.338_191,
          latitude: latitude || 35.697_706,
          zoom: mapZoom || 14,
        }}
        mapStyle={mapStyleObject}
        mapboxAccessToken="need-to-fake-access-token"
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        onClick={event => {
          if (!centerMode) changePosition({ lat: event.lngLat.lat, lng: event.lngLat.lng })
        }}
        onDragEnd={handleDragEnd}
        onDragStart={() => handleDragStart()}
        {...(centerMode && { scrollZoom: { around: 'center' } })}
      >
        {selectedLatLng && !centerMode && (
          <Marker
            anchor="bottom"
            latitude={selectedLatLng.lat ?? 51.338_191}
            longitude={selectedLatLng.lng ?? 35.697_706}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <Image
                alt=""
                height={markerProps?.height ?? markerDefaultOptions.height}
                src={markerProps?.src ?? (markerDefaultOptions.src as string)}
                width={markerProps?.width ?? markerDefaultOptions.width}
              />
            </Box>
          </Marker>
        )}
      </MapGl>
      {centerMode && !readOnly && (
        <Box
          sx={{
            position: 'absolute',
            top: `calc(50% - ${markerOptions.height}px)`,
            left: `calc(50% - ${+(markerOptions.width ?? 0) / 2}px)`,
            height: markerOptions?.height,
            width: markerOptions?.width,
          }}
        >
          <Image alt="" layout="fill" src={markerProps?.src ?? (markerDefaultOptions.src as string)} />
        </Box>
      )}
      {/* If showNavigator true render a Box in bottom 8px and right 8px */}
      {!!onNavigationChanged && (
        <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
          <Button onClick={handleGeoLocation} sx={{ height: 40, width: 40 }} variant="neutral2">
            <HBIcon name="crosshair" size="small" sx={{ color: neutral[800] }} />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export { Map }
