import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'

import { nextAuthOptions } from '@/core/api/next-auth-options'
import { getQueryClientSsr } from '@/core/utils/getClientQuerySsr'
import { HomePage } from '@/domains/homePage'
import { IntroLanding } from '@/domains/introLanding/IntroLanding'
import { getGetWebCMSPagesPlatformTypePlatformTypeNameNameQueryOptions } from '@/services/cms-services/cms'
import { PlatformType } from '@/services/cms-services/cms.schemas'

const Home = async () => {
  const session = await getServerSession(nextAuthOptions)
  const queryClient = getQueryClientSsr()

  await queryClient.prefetchQuery(
    getGetWebCMSPagesPlatformTypePlatformTypeNameNameQueryOptions(
      PlatformType.NUMBER_1021005,
      'Dartil-Q Homepage',
      undefined,
      {
        query: { staleTime: 500000 },
      },
    ),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {session?.accessToken ? <HomePage /> : <IntroLanding />}
    </HydrationBoundary>
  )
}

export default Home
