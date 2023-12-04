'use client'

import { Box, Stack } from '@mui/material'
import { Fragment, memo, useMemo } from 'react'

import { useGetWebCMSPagesPlatformTypePlatformTypeNameName } from '@/services/cms-services/cms'
import { PlatformType, SectionByContentQueryResult } from '@/services/cms-services/cms.schemas'

import { SellerWidget } from './SellerWidget'

type widgetComponentType = 'BUSINESS_SLIDER_SELLER' | 'ADS_SLIDER_DEFAULT' | 'Live'

const renderWidget = (widget: SectionByContentQueryResult) => {
  const selector: Record<widgetComponentType, JSX.Element> = {
    BUSINESS_SLIDER_SELLER: (
      <SellerWidget metadata={JSON.parse(widget?.content?.metaData || '{}')} title={widget?.content?.title} />
    ),
    ADS_SLIDER_DEFAULT: <Box />,
    Live: <Box />,
  }

  return selector[widget?.componentType as widgetComponentType]
}
export const DynamicRenderWidget = memo(() => {
  const { data } = useGetWebCMSPagesPlatformTypePlatformTypeNameName(PlatformType.NUMBER_1021005, 'Dartil-Q Homepage', {
    query: { staleTime: 500000 },
  })

  const sections = useMemo(() => data?.data?.pageParts?.[0]?.sections, [data])

  return (
    <Stack bgcolor="background.paper" pt={2} spacing={6} pb={4}>
      {sections?.map(section => <Fragment key={section.id}>{renderWidget(section)}</Fragment>)}
    </Stack>
  )
})

DynamicRenderWidget.displayName = 'DynamicRenderWidget'
