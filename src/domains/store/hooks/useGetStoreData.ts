'use client'
import { useMemo } from 'react'

import { useGetViewStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { PageOwnerTypeEnum } from '@/shared/types/enums'

export const useGetStoreData = (latinName: string, searchTerm?: string) => {
  const { data, isFetching } = useGetViewStoreView(
    {
      PageNumber: 1,
      PageSize: 10,
      LatinName: latinName,
      PageOwnerType: PageOwnerTypeEnum.Vendor,
      SearchTerm: searchTerm,
    },
    { query: { staleTime: 50000, enabled: searchTerm !== '' } },
  )
  const { categories, store } = useMemo(
    () => ({ categories: data?.data?.categories, store: data?.data?.store }),
    [data],
  )

  return { isFetching, categories, store }
}
