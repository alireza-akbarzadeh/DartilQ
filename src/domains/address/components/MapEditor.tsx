import { Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { AddressFormType } from '@/domains/address/address.types'
import { LatLng, Map } from '@/shared/map'

type MapEditorProps = {
  loadingChanged: (loading: boolean) => void
}

const MapEditor = (props: MapEditorProps) => {
  const { watch, reset, getValues } = useFormContext<AddressFormType>()

  const handleNavigation = (position: LatLng) => {
    reset({ ...getValues(), latitude: position.lat, longitude: position.lng })
  }

  return (
    <Stack height="100%" spacing={4} borderRadius={3} sx={{ borderRadius: 3, overflowX: 'hidden' }}>
      <Map
        addressFetchCallback={value => {
          if (typeof value === 'boolean') {
            reset({ ...getValues(), cityId: undefined, provinceId: undefined })
          } else if (!!value.cityId && !!value.provinceId) {
            reset({
              ...getValues(),
              prefixAddress: value.address,
              cityId: value.cityId,
              provinceId: value.provinceId,
              latitude: value.lat,
              longitude: value.lng,
            })
          }
        }}
        addressInformation={{
          addressTitle: watch('prefixAddress') ?? '',
          cityId: watch('cityId')?.toString(),
          provinceId: watch('provinceId')?.toString(),
        }}
        centerMode
        isLoading={props.loadingChanged}
        isShowSearch
        latitude={watch('latitude') ?? 0}
        longitude={watch('longitude') ?? 0}
        onNavigationChanged={handleNavigation}
      />
    </Stack>
  )
}

export { MapEditor }
