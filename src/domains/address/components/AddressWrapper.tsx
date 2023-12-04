'use client'

import { styled } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { object, string } from 'yup'

import { useYupValidationResolver } from '@/core/hooks'
import { AddressStepsType } from '@/domains/address/address.types'
import { AddressEditor } from '@/domains/address/components/AddressEditor'
import { AddressNavigation } from '@/domains/address/components/AddressNavigator'
import { usePostUserAddress as useAddAddress } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { AddAddress } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { regexps } from '@/shared/constants'

type AddressWrapperProps = {
  step: AddressStepsType
}

const FormStyle = styled('form')(() => ({
  height: '100%',
  width: '100%',
}))

const schema = object().shape({
  streetLine: string().max(120, 'لطفا از توضیحات تکمیلی کوتاه تری استفاده کنید'),
  plaque: string()
    .max(5, 'طول پلاک حداکثر 5 کاراکتر است')
    .matches(regexps.OnlyNumbers, 'لطفا فقط از عدد، - و / استفاده کنید.')
    .required('لطفا پلاک خودرا وارد کنید'),
  unit: string()
    .max(5, 'طول واحد حداکثر 5 کاراکتر است')
    .matches(new RegExp(`^$|${regexps.OnlyNumbers.source}`), 'لطفا فقط از عدد، - و / استفاده کنید.')
    .nullable(),
  title: string().required('لطفا پلاک خودرا وارد کنید').max(25, 'طول واحد حداکثر 25 کاراکتر است'),
})

const defaultValues: AddAddress = {
  plaque: '',
  longitude: 51.338191,
  latitude: 35.697706,
}

const AddressWrapper = (props: AddressWrapperProps) => {
  const { mutateAsync: addAddress } = useAddAddress()
  const { data: userData } = useSession()
  const resolver = useYupValidationResolver(schema)
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
  const methods = useForm<AddAddress>({
    mode: 'all',
    resolver,
    defaultValues,
  })
  const rendered = useMemo(() => {
    switch (props.step) {
      case 'form':
      case 'map':
        return <AddressEditor step={props.step} />
      default:
        return <AddressNavigation />
    }
  }, [props.step])

  useEffect(() => {
    if (props.step === 'navigation') methods.reset(defaultValues)
  }, [props.step])

  const onSubmit = async (data: AddAddress) => {
    try {
      await addAddress({
        data: {
          postalCode: '1',
          recipientName: `${userData?.user.firstName} ${userData?.user.lastName}`,
          recipientMobileNo: userData?.user.userName,
          district: '',
          ...data,
        },
      })
      toast.success('آدرس با موفقیت ثبت شد')
      replace(`/${source ?? ''}`)
      // TODO add error type for whole project
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data?.messages?.[0].message)
    }
  }

  return (
    <FormProvider {...methods}>
      <FormStyle noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {rendered}
      </FormStyle>
    </FormProvider>
  )
}

export { AddressWrapper }
