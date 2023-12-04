import { Box, formHelperTextClasses, inputClasses, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { HBButton, HBIcon } from '@/core/components'
import { HBTextField } from '@/core/components/HBTextField/HBTextField'
import { AddressFormType } from '@/domains/address/address.types'
import { Map } from '@/shared/map'

type NumberMaskProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

// TODO remove any type from this component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NumberMask: any = forwardRef<HTMLInputElement, NumberMaskProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="00000"
      inputRef={ref}
      onAccept={(value: string) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

const FormEditor = () => {
  const { control, watch, reset, getValues } = useFormContext<AddressFormType>()
  const [showForm, setShowForm] = useState(false)
  const { replace } = useRouter()
  useEffect(() => {
    reset({ ...getValues() })
    setShowForm(true)
  }, [])

  const gotoMap = () => replace('/address?step=map')

  if (showForm)
    return (
      <Stack spacing={4}>
        <Box sx={{ height: 124, borderRadius: 3, overflow: 'hidden' }}>
          <Map
            key={`${watch('latitude')}-${watch('longitude')}`}
            readOnly
            latitude={watch('latitude')}
            longitude={watch('longitude')}
          />
        </Box>
        <Stack spacing={3}>
          <HBTextField
            focused={false}
            sx={{
              [`& .${formHelperTextClasses.root}`]: { mx: 0, mt: 3 },
              [`& .${inputClasses.focused}`]: { border: 'none' },
              '&:hover label': {
                color: 'common.black',
              },
            }}
            helperText="آدرس بالا بر اساس موقعیت مکانی شما وارد شده است."
            size="small"
            minRows={2}
            multiline
            variant="outlined"
            required
            InputProps={{ readOnly: true }}
            label="نشانی پستی"
            value={watch('prefixAddress')}
          />
          <HBButton
            onClick={gotoMap}
            sx={{ width: 'fit-content', pl: 0 }}
            variant="link"
            size="small"
            endIcon={<HBIcon name="angleLeft" />}
          >
            اصلاح موقعیت مکانی روی نقشه
          </HBButton>
        </Stack>

        <Stack spacing={3}>
          <Controller
            name="streetLine"
            control={control}
            render={({ field, formState }) => (
              <HBTextField
                minRows={3}
                multiline
                variant="outlined"
                InputProps={{ inputProps: { maxLength: 120 } }}
                label="توضیحات تکمیلی"
                {...field}
                error={!!formState.errors.streetLine?.message}
                helperText={
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="bodySmall" color="error.main">
                      {formState.errors.streetLine?.message}
                    </Typography>
                    <Typography variant="bodySmall" color="text.secondary">
                      120/{field.value?.length ?? 0}
                    </Typography>
                  </Stack>
                }
              />
            )}
          />
          <Stack direction="row" spacing={2} flex={1}>
            <Controller
              name="plaque"
              control={control}
              render={({ field, formState }) => (
                <HBTextField
                  fullWidth
                  variant="outlined"
                  required
                  label="پلاک"
                  {...field}
                  error={!!formState.errors.plaque?.message}
                  helperText={formState.errors.plaque?.message}
                  InputProps={{
                    inputComponent: NumberMask,
                  }}
                  inputProps={{ inputMode: 'numeric' }}
                />
              )}
            />
            <Controller
              name="unit"
              control={control}
              render={({ field, formState }) => (
                <HBTextField
                  fullWidth
                  variant="outlined"
                  label="واحد"
                  {...field}
                  error={!!formState.errors.unit?.message}
                  helperText={formState.errors.unit?.message}
                  InputProps={{
                    inputComponent: NumberMask,
                  }}
                  inputProps={{ inputMode: 'numeric' }}
                />
              )}
            />
          </Stack>
        </Stack>

        <Controller
          name="title"
          control={control}
          render={({ field, formState }) => (
            <HBTextField
              {...field}
              variant="outlined"
              required
              label="عنوان آدرس مثلا: خانه، شرکت و..."
              error={!!formState.errors.title?.message}
              InputProps={{ inputProps: { maxLength: 25 } }}
              helperText={
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="bodySmall" color="error.main">
                    {formState.errors.title?.message}
                  </Typography>
                  <Typography variant="bodySmall" color="text.secondary">
                    25/{field.value?.length ?? 0}
                  </Typography>
                </Stack>
              }
            />
          )}
        />
      </Stack>
    )

  return null
}

export { FormEditor }
