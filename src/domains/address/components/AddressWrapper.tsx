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
import {
  useGetUserAddresses,
  usePostUserAddress as useAddAddress,
  usePutUserAddressAddressId,
} from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { AddAddress } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { regexps } from '@/shared/constants'

type AddressWrapperProps = {
  step: AddressStepsType
  addressId?: string
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
  recipientName: string().when('isRecipient', {
    is: false,
    then: schema => schema.required('نام و نام خانوادگی گیرنده الزامی است'),
  }),

  recipientMobileNo: string().when('isRecipient', {
    is: false,
    then: schema =>
      schema
        .matches(regexps.MobileNumber, 'شماره موبایل وارد شده صحبح نمیباشد')
        .required('وارد کردن شماره موبایل الزامی است'),
  }),
})

const defaultValues: AddAddress = {
  plaque: '',
  longitude: 51.338191,
  latitude: 35.697706,
  isRecipient: false,
}

const AddressWrapper = (props: AddressWrapperProps) => {
  const { mutateAsync: addAddress } = useAddAddress()
  const { mutateAsync: updateAddress } = usePutUserAddressAddressId()
  const { data: addressesData, isLoading } = useGetUserAddresses({ query: { enabled: !!props.addressId } })
  const { data: userData, update } = useSession()
  const resolver = useYupValidationResolver(schema)
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const source = searchParams.get('source')
  const methods = useForm<AddAddress>({
    mode: 'onSubmit',
    resolver,
  })

  const { reset, handleSubmit, watch, trigger } = methods

  useEffect(() => {
    if (props.addressId) {
      const editingAddress = addressesData?.data?.find(address => address.id === props.addressId)
      if (editingAddress)
        reset({
          longitude: editingAddress.longitude,
          latitude: editingAddress.latitude,
          prefixAddress: editingAddress.prefixAddress,
          cityId: editingAddress.cityId,
          provinceId: editingAddress.provinceId,
          title: editingAddress.title,
          unit: editingAddress.unit,
          plaque: editingAddress.plaque,
          streetLine: editingAddress.streetLine ?? '',
          isRecipient: Boolean(editingAddress.isRecipient),
          recipientMobileNo: editingAddress.recipientMobileNo ?? '',
          recipientName: editingAddress.recipientName ?? '',
        })
    } else {
      reset(defaultValues)
    }
  }, [props.addressId, addressesData?.data])

  const handleChangeRecipient = async () => {
    await trigger('recipientMobileNo')
    await trigger('recipientName')
  }

  useEffect(() => {
    handleChangeRecipient()
  }, [watch('isRecipient')])

  const rendered = useMemo(() => {
    switch (props.step) {
      case 'form':
      case 'map':
        return <AddressEditor gettingLoading={!!props.addressId && isLoading} step={props.step} />
      default:
        return <AddressNavigation />
    }
  }, [props.step, props.addressId, isLoading])

  useEffect(() => {
    if (props.step === 'navigation') methods.reset(defaultValues)
  }, [props.step])

  const onSubmit = async (data: AddAddress) => {
    if (props.step !== 'form') return
    const { firstName, lastName } = userData?.user || {}
    if (data.isRecipient && (!firstName || !lastName)) {
      return toast.error('نام و نام خانوادگی شما در سیستم ثبت نشده است')
    }
    try {
      const recipientObject: Pick<AddAddress, 'isRecipient' | 'recipientMobileNo' | 'recipientName'> = data.isRecipient
        ? {
            isRecipient: true,
            recipientMobileNo: userData?.user.userName,
            recipientName: `${userData?.user.firstName} ${userData?.user.lastName}`,
          }
        : { isRecipient: false, recipientMobileNo: data.recipientMobileNo, recipientName: data.recipientName }
      if (props.addressId) {
        await updateAddress({
          addressId: props.addressId,
          data: {
            postalCode: '1',
            recipientName: `${userData?.user.firstName} ${userData?.user.lastName}`,
            recipientMobileNo: userData?.user.userName,
            district: '',
            ...data,
            ...recipientObject,
          },
        })
        toast.success('آدرس با موفقیت ویرایش شد')
      } else {
        const newAddress = await addAddress({
          data: {
            postalCode: '1',
            recipientName: `${userData?.user.firstName} ${userData?.user.lastName}`,
            recipientMobileNo: userData?.user.userName,
            district: '',
            ...data,
            ...recipientObject,
          },
        })
        if (!userData?.user.address) {
          await update({
            address: {
              id: newAddress?.data?.id,
              cityId: data.cityId,
              latitude: data.latitude,
              longitude: data.longitude,
            },
          })
        }
        toast.success('آدرس با موفقیت ثبت شد')
      }

      replace(`${source ?? '/'}`)
      // TODO add error type for whole project
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data?.messages?.[0].message)
    }
  }

  return (
    <FormProvider {...methods}>
      <FormStyle autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
        {rendered}
      </FormStyle>
    </FormProvider>
  )
}

export { AddressWrapper }
