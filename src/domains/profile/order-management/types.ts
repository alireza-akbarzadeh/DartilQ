import { SxProps } from '@mui/material'

import { CommerceDetailOrderItem } from '@/services/sale-services/sale.schemas'

type OrderType = 'current' | 'delivered' | 'returned' | 'canceled'

enum OrderServiceSectionEnum {
  Current = 1,
  Delivered,
  Refunded,
  Canceled,
  Await = 6,
}

enum ConsignmentStatusEnum {
  AwaitPayment = 'await-payment',
  Paid = 'paid',
  Delivered = 'Delivered',
  Returned = 'returned',
  SystemCancel = 'system-cancel',
  Canceled = 'canceled',
  PendingReturned = 'pending-returned',
  AwaitPartialPayment = 'await-partial-payment',
  Rejected = 'rejected',
}

type ConsignmentCardText = {
  key: string
  value?: string | null
  sx?: SxProps
  removeBullet?: boolean
}

type ConsignmentCardProduct = {
  src?: string | null
  count?: number | null
  productId?: string | null
  productClassId?: string | null
  productName?: string | null
  slug?: string | null
  hsin?: string | null
}

type ConsignmentCardProps = {
  name?: string
  texts?: ConsignmentCardText[]
  products: ConsignmentCardProduct[]
  cargoId?: string
  partyId?: string
  shoppingCartId?: string
  hideCommentButton?: boolean
  hideHeader?: boolean
}

type ConsignmentCardHeaderProps = Pick<ConsignmentCardProps, 'name' | 'texts'> & {
  spacing?: number
  hideCargoName?: boolean
  hideCommentButton?: boolean
  cargoId?: string
  partyId?: string
  shoppingCartId?: string
  bundleStateTitle?: string
  bundleNumber?: string
  deliveryCode?: number
  isDisplayDeliveryCode?: boolean
}

enum OrderStateCode {
  AwaitPayment = '1',
  Paid = '4',
  CanceledByUser = '6',
  CanceledBySystem = '7',
  Returned = '8',
  AwaitedPartialPayment = '11',
  DeliveredOrder = '9',
}

enum OrderRefundStates {
  Requested = '1',
  Rejected = '2',
  Confirmed = '3',
}

enum PaymentStatusEnum {
  None = 1_104_001,
  Waiting,
  Success,
  Failed,
  Canceled,
}

enum CancelTypeEnum {
  Full = 1,
  Partial = 2,
}
interface CanceledProduct extends Required<Pick<CommerceDetailOrderItem, 'quantity'>> {
  productId: string
  cancelationReason?: string
  cancelationReasonTitle?: string
  count?: number
  formValidation?: boolean
}

interface CancelForm {
  reason: string
  reasonTitle: string
  count: string
}

interface ProductCancelationProps {
  shoppingCartId: string
  canceledProducts: CanceledProduct[]
}

enum CancelOrderStateCode {
  StateMachineCode = '50',
  Factor = '1',
}

interface RefundForm {
  reason: string
  complain: string
  count: string
}

enum RefundStateCode {
  FromStateCode = '7',
  ToStateCode = '10',
  StateMachineCode = '514',
}

enum RefundFactor {
  ShipmentBundleProduct = 'ShipmentBundleProduct',
  UploadImageFactor = 'refund',
}

enum ContentTypeEnums {
  Html = 1022001,
  Image = 1022002,
  Video = 1022003,
  Document = 1022004,
  Url = 1022005,
  Button = 1022006,
  ImageSlider = 1022007,
  BusinessSlider = 1022008,
  Banner = 1022010,
  LiveStream = 1022011,
  MultiCollection = 1022012,
}

enum EntityTypeEnums {
  Content = 1001,
  Widget = 1002,
  Section = 1003,
  Category = 2001,
  Brand = 2002,
  Attribute = 2003,
  AttributeValue = 2004,
  CategoryAttribute = 2005,
  CategoryCertificate = 2006,
  Certificate = 2007,
  CommisionLaw = 2008,
  ReturnLaw = 2010,
  UnitOfMeasurement = 2011,
  Product = 2012,
  Menugroups = 1007,
  User = 3001,
  Vendor = 3002,
  RefundFile = 8034,
  FAQ = 2014,
  Commission = 2013,
  Seller = 8001,
  Platform = 8002,
  MessageTemplate = 4030,
  Ticketing = 10001,
  Voucher = 8004,
  ProviderShippingState = 8003,
  Comment = 9001,
  RefundRequestItem = 8038,
  VendorContract = 8039,
  DartilQBanner = 3015,
}

export {
  CancelOrderStateCode,
  CancelTypeEnum,
  ConsignmentStatusEnum,
  ContentTypeEnums,
  EntityTypeEnums,
  OrderRefundStates,
  OrderServiceSectionEnum,
  OrderStateCode,
  PaymentStatusEnum,
  RefundFactor,
  RefundStateCode,
}
export type {
  CanceledProduct,
  CancelForm,
  ConsignmentCardHeaderProps,
  ConsignmentCardProduct,
  ConsignmentCardProps,
  OrderType,
  ProductCancelationProps,
  RefundForm,
}
