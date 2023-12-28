import { useIntl } from 'react-intl'

import {
  CommerceBundle,
  CommerceDetailBundle,
  CommerceDetailOrder,
  CommerceOrder,
} from '@/services/sale-services/sale.schemas'

import { handleFromToTime } from '../utils/handle-from-to-time'

export const useGetOrderDeliveryDate = (): {
  getDeliveryDate: (
    order: CommerceOrder | CommerceDetailOrder | undefined,
    bundleItem: CommerceBundle | CommerceDetailBundle,
  ) => string
} => {
  const { formatDate } = useIntl()
  const getDeliveryDate = (
    order: CommerceOrder | CommerceDetailOrder | undefined,
    bundleItem: CommerceBundle | CommerceDetailBundle,
  ): string =>
    // eslint-disable-next-line no-nested-ternary
    order?.outOfStandardRegion
      ? bundleItem.deliveryDate && bundleItem.deliveryDateTo
        ? `${formatDate(bundleItem.deliveryDate, {
            day: 'numeric',
            month: 'long',
          })} تا
          ${formatDate(bundleItem.deliveryDateTo, {
            day: 'numeric',
            month: 'long',
          })}`
        : ''
      : bundleItem?.deliveryDate
        ? `${formatDate(bundleItem.deliveryDate, {
            day: 'numeric',
            month: 'long',
          })} ${
            bundleItem?.deliveryFromHour &&
            bundleItem?.deliveryToHour &&
            handleFromToTime(bundleItem.deliveryFromHour, bundleItem.deliveryToHour)
          }`
        : ''
  return { getDeliveryDate }
}
