'use client'
import { Box } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { object, string } from 'yup'

import { useYupValidationResolver } from '@/core/hooks'
import { useGetViewCheckoutView } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { Basket as BasketType } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { regexps } from '@/shared/constants'

import { usePay } from '../../shared/hooks/usePay'
import { PaymentProvider, Recipient as RecipientType } from '../../shared/types/paymentType'
import { Address } from './components/Address'
import { Basket } from './components/Basket'
import { CheckoutSkeleton } from './components/CheckoutSkeleton'
import { DeliveryEstimate } from './components/DeliveryEstimate'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Note } from './components/Note'
import { PaymentMethods } from './components/PaymentMethods'
import { PriceDetail } from './components/PriceDetail'
import { Recipient } from './components/Recipient'
import { Voucher } from './components/Voucher'

const schema = object().shape({
  recipientName: string().required(''),
  recipientMobileNo: string().matches(new RegExp(regexps.MobileNumber), '').required(''),
})

export const Checkout = (): JSX.Element => {
  const resolver = useYupValidationResolver(schema)
  const [basket, setBasket] = useState<BasketType>()
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState<number>(0)
  const [selectedDeliveryTimeFrame, setSelectedDeliveryTimeFrame] = useState<string>('')
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>()
  const { data: userSession } = useSession()
  const defaultAddress = userSession?.user.address

  const { payOrder, isLoading: isPayLoading } = usePay()
  const recipientFormProvider = useForm<RecipientType>({ mode: 'onChange', resolver })
  const noteFormProvider = useForm<{ note: string }>({ mode: 'onChange' })

  const {
    formState: { errors },
  } = recipientFormProvider
  const { data: checkoutViewData, isLoading } = useGetViewCheckoutView(
    { AddressId: defaultAddress?.id },
    { query: { enabled: !!defaultAddress?.id } },
  )
  const checkoutData = checkoutViewData?.data

  useEffect(() => {
    if (checkoutData) {
      setBasket(checkoutData?.basket)
      setSelectedDeliveryTimeFrame(checkoutData?.inquiry?.deliveryTimes?.[0]?.deliveryTimeFrames?.[0]?.id ?? '')
      recipientFormProvider.reset({
        isRecipient: true,
        recipientName: checkoutData?.address?.recipientName ?? '',
        recipientMobileNo: checkoutData.address?.recipientMobileNo ?? '',
      })
    }
  }, [checkoutData])

  if (isLoading || !defaultAddress?.id) {
    return <CheckoutSkeleton />
  }

  const handleChangePaymentProvider = (paymentProvider: PaymentProvider) => {
    setPaymentProvider(paymentProvider)
  }

  const handleStartOrder = () => {
    if (errors?.recipientName || errors?.recipientMobileNo) {
      toast.error('لطفا اطلاعات تحویل گیرنده را وارد کنید')
      return
    }
    payOrder({
      addressId: defaultAddress.id,
      description: noteFormProvider.getValues('note'),
      isRecipient: recipientFormProvider.getValues('isRecipient'),
      paymentProviderId: paymentProvider?.PaymentProviderId,
      paymentProviderOption: paymentProvider?.PaymentProviderOption,
      recipientMobileNo: recipientFormProvider.getValues('recipientMobileNo'),
      recipientName: recipientFormProvider.getValues('recipientName'),
      shippingDeliveryFrameId: selectedDeliveryTimeFrame,
      shippingOrderId: checkoutData?.inquiry?.shipmentOrderId,
      voucher: basket?.voucherCode,
      completeWithWallet: true,
    })
  }

  const handleChangeDelivery = (payableAmountWithVoucher: number, totalShippingFee: number) => {
    setBasket(basket => ({ ...basket, payableAmountWithVoucher, totalShippingFee }))
  }

  return (
    <Box sx={{ bgcolor: 'background.lightest' }}>
      <Header />
      <Basket basketInfo={basket} />
      <Address addressInfo={checkoutData?.address} />
      <Recipient {...{ recipientFormProvider }} />
      <DeliveryEstimate
        inquiry={checkoutData?.inquiry}
        addressId={defaultAddress?.id.toString()}
        storeId={checkoutData?.basket?.storeId?.toString() ?? ''}
        onChange={handleChangeDelivery}
        {...{ selectedDeliveryTimeFrame, setSelectedDeliveryTimeFrame, selectedDeliveryDay, setSelectedDeliveryDay }}
      />
      <PaymentMethods
        paymentMethodInfo={checkoutData?.paymentMethods ?? []}
        onChangeProvider={handleChangePaymentProvider}
        totalAmount={basket?.payableAmountWithVoucher ?? 0}
      />
      <Voucher voucherCode={basket?.voucherCode ?? ''} setBasket={setBasket} />
      <Note {...{ noteFormProvider }} />
      <PriceDetail basketInfo={basket} />
      <Footer
        currencyTitle={checkoutData?.basket?.currencyTitle ?? ''}
        totalAmount={basket?.payableAmountWithVoucher ?? 0}
        hasNeedToCorrection={checkoutData?.address?.hasNeedToCorrection ?? false}
        onStartOrder={handleStartOrder}
        isLoading={isPayLoading}
        addressId={checkoutData?.address?.id || ''}
      />
    </Box>
  )
}
