import { defineMessages } from 'react-intl'

const scope = 'qcommerce.shared'

export const SharedMessages = defineMessages({
  nameMaxLength: {
    id: `${scope}.nameMaxLength`,
    defaultMessage: 'حداکثر از {length} کاراکتر استفاده کنید',
  },
  nameMinLength: {
    id: `${scope}.nameMinLength`,
    defaultMessage: 'حداقل از {length} کاراکتر استفاده کنید',
  },
  onlyPersianText: {
    id: `${scope}.onlyPersianText`,
    defaultMessage: 'از حروف فارسی استفاده کنید',
  },
})
