import { PaymentPayResult } from '@/services/payment-services/payment.schemas'
import { StartOrderFilter } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

export type Must<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export type PayReturnType = {
  payOrder: (props: PayOrder) => Promise<void>
  handlePaymentScenarios: (paymentData: StartPaymentType, paymentOrigin?: PaymentOrigin) => void
  depositWallet: (props: DepositWallet) => Promise<void>
  isLoading: boolean
}

export type PayOrder = {
  completeWithWallet?: boolean
} & StartOrderFilter

export enum PaySourceEnum {
  WebCommerce = 1,
  AppCommerce,
  QAppCommerce,
}

export enum PaymentMethodTypeEnum {
  Gateway = 1071001,
  Wallet,
  Credit,
}

export enum PayVerbEnum {
  get = 'Get',
  post = 'Post',
}

export enum ProviderTypeEnum {
  None = 1_107_001,
  SamanElectronicPayment,
  HitWallet,
  TaraWallet,
  Test,
  TallyWallet,
  EzPay,
}

export type WebPaymentOrigin = {
  type: 'web'
  paymentId: string
}

export type MobilePaymentOrigin = {
  type: 'app'
  paymentId: string
  paymentSource?: PaySourceEnum
}

export type PaymentOrigin = WebPaymentOrigin | MobilePaymentOrigin

export type StartPaymentType = Pick<
  PaymentPayResult,
  'payUrl' | 'payVerb' | 'payValues' | 'providerType' | 'paymentStatus' | 'paymentBusiness'
>

export type Recipient = {
  isRecipient: boolean
  recipientName: string
  recipientMobileNo: string
}

export type PaymentProvider = {
  PaymentProviderId: string
  PaymentProviderOption?: string
}

export enum PaymentBusinessEnum {
  PayTest = 1_108_001,
  Order,
  Wallet,
  HybridPayment,
}

export interface DepositWallet {
  payableAmountInRial: number
  walletId: string
}
