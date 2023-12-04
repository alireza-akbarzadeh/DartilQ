'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { CategorySection } from './components/CategorySection'
import { FooterSection } from './components/FooterSection'
import { HeaderSection } from './components/HeaderSection'
import { InstallAppSection } from './components/InstallAppSection'

export const IntroLanding = (): JSX.Element => {
  const session = useSession()
  const { refresh } = useRouter()

  useEffect(() => {
    if (session.status === 'authenticated') refresh()
  }, [session])
  return (
    <>
      <HeaderSection />
      <CategorySection />
      <InstallAppSection />
      <FooterSection />
    </>
  )
}
