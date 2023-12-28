import { Box, CircularProgress, Stack } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { HBButton } from '@/core/components'
import { useWindowHeight } from '@/core/hooks'
import { AddressFormType, AddressStepsType } from '@/domains/address/address.types'
import { FormEditor } from '@/domains/address/components/FormEditor'
import { MapEditor } from '@/domains/address/components/MapEditor'
import { AppBarHeight, AppTopBar } from '@/shared/layout'

type AddressEditorPageProps = {
  step: AddressStepsType
  gettingLoading: boolean
}

const AddressEditor = ({ step, gettingLoading }: AddressEditorPageProps) => {
  const { watch, formState } = useFormContext<AddressFormType>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
  const addressId = searchParams.get('id')
  const windowHeight = useWindowHeight()
  const [loading, setLoading] = useState(false)

  const nextStateDisabled = useMemo(() => {
    return !(watch('cityId') && watch('provinceId') && watch('latitude') && watch('longitude'))
  }, [watch('cityId'), watch('provinceId'), watch('latitude'), watch('longitude')])

  const rendered = useMemo(() => {
    switch (step) {
      case 'map':
        return <MapEditor loadingChanged={setLoading} />

      default:
        return <FormEditor />
    }
  }, [step])

  const handleCancel = () => {
    router.replace(`/${source ?? ''}`)
  }

  const handleNavigationSearchParams = () => {
    let returnedSearchParams = ''
    if (source) returnedSearchParams += `&source=${source}`
    if (addressId) returnedSearchParams += `&id=${addressId}`
    return returnedSearchParams
  }

  const nextStep = () => {
    router.push(`${pathname}?step=form${handleNavigationSearchParams()}`)
  }

  useEffect(() => {
    if (step === 'form' && nextStateDisabled) {
      router.replace(`${pathname}?step=map${handleNavigationSearchParams()}`)
    }
  }, [step])
  if (!windowHeight) return null

  const backButtonUrl = () => {
    if (addressId && step === 'map') return source ?? '/'
    return `/address?step=${step === 'map' ? 'navigation' : 'map'}${handleNavigationSearchParams()}`
  }
  return (
    <>
      <AppTopBar
        hasBackButton
        title={step === 'map' ? 'موقعیت مکانی آدرس جدید' : 'افزودن آدرس جدید'}
        backUrl={backButtonUrl()}
      />

      <Stack sx={{ height: '100dvh', pt: `${AppBarHeight + 8}px` }}>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
          }}
        >
          {gettingLoading && (
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
              <CircularProgress />
            </Stack>
          )}
          {!gettingLoading && <Stack sx={{ overflowY: 'auto', height: '100%', px: 4 }}>{rendered}</Stack>}
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={4}
          sx={{ bgcolor: 'common.white', width: '100%', p: 4 }}
        >
          <HBButton onClick={() => handleCancel()} sx={{ flex: 1 }} variant="secondary">
            انصراف
          </HBButton>
          {step === 'map' && (
            <HBButton
              loading={loading}
              onClick={nextStep}
              sx={{ flex: 1 }}
              type="submit"
              variant="primary"
              disabled={nextStateDisabled}
            >
              ثبت و ادامه
            </HBButton>
          )}
          {step === 'form' && (
            <HBButton loading={formState.isSubmitting} sx={{ flex: 1 }} type="submit" variant="primary">
              {addressId ? 'ویرایش' : 'ثبت'}
            </HBButton>
          )}
        </Stack>
      </Stack>
    </>
  )
}

export { AddressEditor }
