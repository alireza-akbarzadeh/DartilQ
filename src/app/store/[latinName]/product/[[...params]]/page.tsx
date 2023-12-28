import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClientSsr } from '@/core/utils/getClientQuerySsr'
import { ProductPageType } from '@/domains/product'
import { ProductPage } from '@/domains/product/components'
import { getGetProductDetailHsinQueryOptions as getProductDetailOptions } from '@/services/Qcommerce Bff-services/Qcommerce Bff'

const Page = async (props: { params: ProductPageType }) => {
  const { params } = props.params
  const hsin = params[0]
  const queryClient = getQueryClientSsr()
  await queryClient.prefetchQuery(getProductDetailOptions(hsin, { query: { staleTime: 50000 } }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage {...props.params} />
    </HydrationBoundary>
  )
}

export default Page
