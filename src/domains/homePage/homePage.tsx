'use client'
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { useGetViewHomePageView } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

import { BasketDetail } from './components/BasketDetail'
import { Category } from './components/Category'
import { DynamicRenderWidget } from './components/DynamicRenderWidget'
import { Header } from './components/Header/Header'
import { NearbyStores } from './components/NearbyStores'
export const HomePage = (): JSX.Element => {
  const { data: userSession } = useSession()
  const [categoryRef, setCategoryRef] = useState<HTMLDivElement>()
  const [refreshPage, setRefreshPage] = useState<string>('')
  const callbackRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setCategoryRef(node)
    }
  }, [])
  const defaultAddress = userSession?.user.address
  const { data: storeData } = useGetViewHomePageView({
    CityId: defaultAddress?.cityId,
    Latitude: defaultAddress?.latitude,
    Longitude: defaultAddress?.longitude,
  })
  const handleChangeDefaultAddress = (refreshDefaultAddressKey: string) => {
    setRefreshPage(refreshDefaultAddressKey)
  }

  return (
    <Box key={refreshPage}>
      {categoryRef ? <Header categoryRef={categoryRef} onChangeDefaultAddress={handleChangeDefaultAddress} /> : null}
      <Category
        ref={callbackRef}
        curveColor={storeData?.data?.basket?.itemCount ? 'background.light' : 'background.lightest'}
      />
      {!!storeData?.data?.basket?.itemCount && <BasketDetail data={storeData?.data?.basket} />}
      <DynamicRenderWidget />
      {!!storeData?.data?.stores?.items?.length && <NearbyStores stores={storeData?.data?.stores?.items} />}
    </Box>
  )
}
