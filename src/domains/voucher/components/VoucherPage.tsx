'use client'

import { Box, Stack, Tab, tabClasses, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useMemo } from 'react'

import { getBasketVoucher, getGetBasketVoucherQueryKey } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { Voucher } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { NotFound } from '@/shared/components'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'

import { StateType, VoucherTypeEnum } from '../types'
import { VoucherCard } from './VoucherCard'
import { Skelton } from './VoucherSkelton'

type PropsType = {
  state: StateType
}

const CustomTab = styled(Tab)(({ theme }) => ({
  [`&.${tabClasses.root}`]: { color: theme.palette.textAndIcon.dark },
  '&.Mui-selected': { color: theme.palette.textAndIcon.darker },
}))

const getNextPageParams = (state: StateType, data?: Voucher) => {
  switch (state) {
    case 'Active':
      if ((data?.activeVouchers?.totalItems ?? 0) <= (data?.activeVouchers?.pageNumber ?? 0) * pageSize)
        return undefined
      return (data?.activeVouchers?.pageNumber ?? 0) + 1
    case 'Expired':
      if ((data?.expiredVouchers?.totalItems ?? 0) <= (data?.expiredVouchers?.pageNumber ?? 0) * pageSize)
        return undefined
      return (data?.expiredVouchers?.pageNumber ?? 0) + 1
    default:
      if ((data?.usedVouchers?.totalItems ?? 0) <= (data?.usedVouchers?.pageNumber ?? 0) * pageSize) return undefined
      return (data?.usedVouchers?.pageNumber ?? 0) + 1
  }
}

const pageSize = 10

const VoucherPage = (props: PropsType) => {
  const { state } = props
  const { replace } = useRouter()
  const {
    fetchNextPage,
    data: voucherData,
    isFetching,
  } = useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return getBasketVoucher({
        PageSize: pageSize,
        VoucherType: VoucherTypeEnum[state],
        ActiveVoucherPageNumber: pageParam,
      })
    },
    getNextPageParam: lastPage => getNextPageParams(props.state, lastPage.data),
    queryKey: getGetBasketVoucherQueryKey({ VoucherType: VoucherTypeEnum[state], PageSize: pageSize }),
    initialPageParam: 1,
  })

  const [lastElementRef] = useInfiniteScroll(fetchNextPage)

  const activeVouchers = useMemo(() => {
    if (state === 'Active') return voucherData?.pages.flatMap(page => page?.data?.activeVouchers?.items)
  }, [state, voucherData])

  const expiredVouchers = useMemo(() => {
    if (state === 'Expired') return voucherData?.pages.flatMap(page => page?.data?.expiredVouchers?.items)
  }, [state, voucherData])

  const usedVouchers = useMemo(() => {
    if (state === 'Used') return voucherData?.pages.flatMap(page => page?.data?.usedVouchers?.items)
  }, [state, voucherData])

  const handleChange = (_: SyntheticEvent, newValue: StateType) => {
    replace(`/profile/voucher/${newValue}`)
  }

  const renderVouchers = useMemo(() => {
    switch (state) {
      case 'Active':
        return activeVouchers
      case 'Expired':
        return expiredVouchers
      default:
        return usedVouchers
    }
  }, [state, voucherData])

  const isNotFound = !isFetching && !renderVouchers?.length

  return (
    <Stack sx={{ height: '100%' }}>
      <Tabs value={state} onChange={handleChange} sx={{ px: 4 }}>
        <CustomTab value="Active" label="کدهای فعال" />
        <CustomTab value="Expired" label="منقضی‌شده" />
        <CustomTab value="Used" label="استفاده‌شده" />
      </Tabs>
      <Stack
        spacing={2}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 4,
          py: 2,
          bgcolor: isNotFound ? 'background.lightest' : 'background.light',
        }}
      >
        {isFetching && !renderVouchers?.length && <Skelton />}

        {isNotFound && <NotFound />}

        {(!isFetching || !!renderVouchers?.length) &&
          renderVouchers?.map((voucher, index) => (
            <Box key={voucher?.id} ref={index === renderVouchers.length - 1 ? lastElementRef : null}>
              <VoucherCard
                {...{
                  code: voucher?.code,
                  currnecyTitle: voucher?.currnecyTitle,
                  customerUsedCount: voucher?.customerUsedCount,
                  endDateCount: voucher?.endDateCount,
                  maxTotalPrice: voucher?.maxTotalPrice,
                  minPurchaseValue: voucher?.minPurchaseValue,
                  priceValueType: voucher?.priceValueType,
                  remainedPriceValue: voucher?.remainedPriceValue,
                  totalUsedCount: voucher?.totalUsedCount,
                  voucherValue: voucher?.voucherValue,
                }}
                state={state}
              />
            </Box>
          ))}
      </Stack>
    </Stack>
  )
}

export { VoucherPage }
