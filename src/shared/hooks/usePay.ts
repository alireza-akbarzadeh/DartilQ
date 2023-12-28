import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { usePostWebPaymentPaymentPay } from '@/services/payment-services/payment'
import { PaymentBusiness, PaymentPayModel, PaymentStatus } from '@/services/payment-services/payment.schemas'
import { usePostBasketStartOrder } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
import { usePostWebWalletWalletsMeRequestDeposit } from '@/services/wallet-services/wallet'

import {
  DepositWallet,
  Must,
  PaymentOrigin,
  PayOrder,
  PayReturnType,
  PaySourceEnum,
  PayVerbEnum,
  ProviderTypeEnum,
  StartPaymentType,
} from '../types/paymentType'

export const usePay = (): PayReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { mutateAsync: startOrder } = usePostBasketStartOrder()
  const { mutateAsync: pay } = usePostWebPaymentPaymentPay()
  const { mutateAsync: deposit } = usePostWebWalletWalletsMeRequestDeposit()

  const runPay = async ({ paymentId, completeWithWallet, paySource }: PaymentPayModel): Promise<void> => {
    try {
      const payPayload = await pay({
        data: {
          paymentId,
          ...(completeWithWallet && { completeWithWallet: true }),
          ...(paySource && { paySource }),
        },
      })

      if (payPayload.success && payPayload.data) {
        handlePaymentScenarios(payPayload.data, { type: 'web', paymentId: paymentId ?? '' })
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const payOrder = async (props: PayOrder): Promise<void> => {
    try {
      const {
        paymentProviderId,
        voucher,
        description,
        completeWithWallet,
        paymentProviderOption,
        addressId,
        isRecipient,
        recipientMobileNo,
        recipientName,
        shippingDeliveryFrameId,
        shippingOrderId,
      } = props
      setIsLoading(true)
      const payload = await startOrder({
        data: {
          paymentProviderId,
          voucher,
          description,
          addressId,
          isRecipient,
          recipientMobileNo,
          recipientName,
          shippingDeliveryFrameId,
          shippingOrderId,
          ...(paymentProviderOption && { paymentProviderOption }),
        },
      })

      if (payload?.success && payload?.data?.paymentId) {
        if (payload?.data?.paymentId.toString() === '0') {
          setIsLoading(false)
        } else {
          runPay({
            paymentId: payload.data.paymentId.toString(),
            completeWithWallet,
            paySource: PaySourceEnum.WebCommerce,
            ...(paymentProviderOption && { paymentProviderOption }),
          })
        }
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const runIPG = (
    startPaymentInput: Required<Must<Omit<StartPaymentType, 'providerType' | 'paymentStatus' | 'paymentBusiness'>>>,
  ): void => {
    const { payVerb, payUrl, payValues } = startPaymentInput
    const form = document.createElement('form') as HTMLFormElement
    form.method = payVerb
    form.action = payUrl
    for (const key in payValues) {
      if (Object.prototype.hasOwnProperty.call(payValues, key)) {
        const hiddenField = document.createElement('input')
        hiddenField.type = 'hidden'
        hiddenField.name = key
        hiddenField.value = key === 'CallBackUrl' ? '' : payValues[key]
        form.append(hiddenField)
      }
    }

    document.body.append(form)
    form.submit()
    form.remove()
  }

  const resultUrlGenerator = (
    paymentOriginInput: PaymentOrigin,
    paymentStatus?: PaymentStatus,
    paymentBusiness?: PaymentBusiness,
  ): string => {
    const { type } = paymentOriginInput
    switch (type) {
      case 'web': {
        return `/payment/result/${paymentStatus}?paymentBusiness=${paymentBusiness}`
      }
      case 'app': {
        const { paymentSource } = paymentOriginInput
        return `/payment/app/result/${paymentStatus}/${paymentSource}?paymentBusiness=${paymentBusiness}`
      }

      default: {
        return ''
      }
    }
  }

  const handlePaymentScenarios = (
    paymentData: StartPaymentType,
    paymentOrigin?: PaymentOrigin,
  ): void | Promise<boolean> => {
    if (!paymentOrigin) return
    const { providerType, payUrl, payValues, payVerb, paymentStatus, paymentBusiness } = paymentData
    const resultUrl = resultUrlGenerator(paymentOrigin, paymentStatus, paymentBusiness)

    if (providerType === ProviderTypeEnum.HitWallet) {
      router.push(resultUrl)
    } else if (payUrl && payValues && payVerb) {
      switch (payVerb) {
        case PayVerbEnum.post: {
          return runIPG({ payUrl, payValues, payVerb })
        }
        default: {
          return router.replace(payUrl)
        }
      }
    }
  }

  const depositWallet = async (props: DepositWallet): Promise<void> => {
    try {
      const { payableAmountInRial, walletId } = props
      setIsLoading(true)
      const payload = await deposit({
        data: {
          amount: payableAmountInRial,
          walletId,
        },
      })

      if (payload && payload.data?.paymentReceiptId)
        runPay({ paymentId: payload.data.paymentReceiptId, paySource: PaySourceEnum.WebCommerce })
    } catch {}
  }

  return {
    payOrder,
    handlePaymentScenarios,
    depositWallet,
    isLoading,
  }
}
