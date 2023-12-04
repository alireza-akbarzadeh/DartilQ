'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from 'react'
import { IntlProvider } from 'react-intl'

import en from '../../../public/locale/en.json'
import fa from '../../../public/locale/fa.json'

export const LanguageProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const languages = { fa, en }

  const currentLocale = 'fa' as any

  // TODO memo currentLocale & languages

  return (
    <IntlProvider locale={currentLocale} messages={languages[currentLocale as keyof typeof languages]}>
      {children}
    </IntlProvider>
  )
}
