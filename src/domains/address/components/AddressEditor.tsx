import { Box, Stack } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { HBButton } from '@/core/components'
import { useWindowHeight } from '@/core/hooks'
import { AddressFormType, AddressStepsType } from '@/domains/address/address.types'
import { FormEditor } from '@/domains/address/components/FormEditor'
import { MapEditor } from '@/domains/address/components/MapEditor'
import { AppBarHeight, AppBottomBar, AppTopBar } from '@/shared/layout'

type AddressEditorPageProps = {
  step: AddressStepsType
}

const AddressEditor = ({ step }: AddressEditorPageProps) => {
  const { watch, formState } = useFormContext<AddressFormType>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
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

  const nextStep = () => {
    router.push(`${pathname}?step=form${source ? `&source=${source}` : ''}`)
  }

  useEffect(() => {
    if (step === 'form' && nextStateDisabled) {
      router.replace(`${pathname}?step=map${source ? `&source=${source}` : ''}`)
    }
  }, [step])
  if (!windowHeight) return null

  return (
    <>
      <AppTopBar
        hasBackButton
        title={step === 'map' ? 'موقعیت مکانی آدرس جدید' : 'تکمیل آدرس'}
        backUrl={`/address?step=${step === 'map' ? 'navigation' : 'map'}`}
      />
      <Box
        sx={{
          height: windowHeight - 80,
          pt: `${AppBarHeight + 8}px`,
        }}
      >
        <Stack sx={{ overflowY: 'auto', height: '100%', px: 4 }}>{rendered}</Stack>
      </Box>

      <AppBottomBar>
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
            <HBButton
              loading={formState.isSubmitting}
              disabled={!formState.isValid}
              sx={{ flex: 1 }}
              type="submit"
              variant="primary"
            >
              ثبت
            </HBButton>
          )}
        </Stack>
      </AppBottomBar>
    </>
  )
}

export { AddressEditor }
