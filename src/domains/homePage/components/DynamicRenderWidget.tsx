'use client'

import { Stack } from '@mui/material'
import { Fragment, memo, useMemo } from 'react'

import { LiveWidget } from '@/domains/homePage/components/LiveWidget'
import { SliderBannerWidget } from '@/domains/homePage/components/SliderBannerWidget'
import { useGetWebCMSPagesPlatformTypePlatformTypeNameName } from '@/services/cms-services/cms'
import { PlatformType, SectionByContentQueryResult } from '@/services/cms-services/cms.schemas'

import { SellerWidget } from './SellerWidget'

type widgetComponentType = 'BUSINESS_SLIDER_SELLER' | 'ADS_SLIDER_DEFAULT' | 'Live'

const renderWidget = (widget: SectionByContentQueryResult) => {
  const selector: Record<widgetComponentType, JSX.Element> = {
    BUSINESS_SLIDER_SELLER: (
      <SellerWidget metadata={JSON.parse(widget?.content?.metaData || '{}')} title={widget?.content?.title} />
    ),
    ADS_SLIDER_DEFAULT: <SliderBannerWidget data={widget?.content?.data} />,
    Live: <LiveWidget metadata={JSON.parse(widget?.content?.metaData || '{}')} />,
  }

  return selector[widget?.componentType as widgetComponentType]
}
const DynamicRenderWidget = memo(() => {
  const { data } = useGetWebCMSPagesPlatformTypePlatformTypeNameName(
    PlatformType.NUMBER_1021005,
    'Dartil-Q Homepage',
    undefined,
    {
      query: { staleTime: 500000 },
    },
  )

  const sections = useMemo(() => data?.data?.pageParts?.[0]?.sections, [data])

  return (
    <Stack bgcolor="background.paper" pt={2} spacing={6} pb={4}>
      {sections?.map(section => <Fragment key={section.id}>{renderWidget(section)}</Fragment>)}
    </Stack>
  )
})

DynamicRenderWidget.displayName = 'DynamicRenderWidget'

export { DynamicRenderWidget }
