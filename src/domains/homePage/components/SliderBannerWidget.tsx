import { HBCarousel } from '@/core/components'
import { BannerWidget } from '@/domains/homePage/components/BannerWidget'
import { ContentData } from '@/services/cms-services/cms.schemas'

export interface HBSliderBannerWidgetProps {
  data?: ContentData[] | null
}

export const SliderBannerWidget = (props: HBSliderBannerWidgetProps): JSX.Element => {
  const { data } = props

  return <HBCarousel>{data?.map(item => <BannerWidget key={item.id} {...item} />)}</HBCarousel>
}
