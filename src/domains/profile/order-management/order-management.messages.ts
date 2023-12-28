import { defineMessages } from 'react-intl'

const scope = 'QCommerce-order-management'

export const OrderManagementMessages = defineMessages({
  currentOrder: {
    id: `${scope}.currentOrder`,
    defaultMessage: 'جاری',
  },
  returnedOrder: {
    id: `${scope}.returnedOrder`,
    defaultMessage: 'مرجوع شده',
  },
  canceledOrder: {
    id: `${scope}.canceledOrder`,
    defaultMessage: 'سفارشات لغو شده',
  },
  idOrProductName: {
    id: `${scope}.idOrProductName`,
    defaultMessage: 'شماره پیگیری/نام کالا',
  },
  'await-payment': {
    id: `${scope}.awaitPayment`,
    defaultMessage: 'در انتظار پرداخت',
  },
  awaitPaymentOrder: {
    id: `${scope}.awaitPaymentOrder`,
    defaultMessage: 'سفارشات در انتظار پرداخت',
  },
  'system-cancel': {
    id: `${scope}.systemCancel`,
    defaultMessage: 'لغو سیستمی',
  },
  canceled: {
    id: `${scope}.canceled`,
    defaultMessage: 'لغو ‌شده',
  },
  Delivered: {
    id: `${scope}.Delivered`,
    defaultMessage: 'تحویل‌شده',
  },
  paid: {
    id: `${scope}.paid`,
    defaultMessage: 'پرداخت‌شده',
  },
  returned: {
    id: `${scope}.returned`,
    defaultMessage: 'مرجوع‌شده',
  },
  orderDateTime: {
    id: `${scope}.orderDateTime`,
    defaultMessage: 'تاریخ ثبت سفارش:',
  },
  addressTitle: {
    id: `${scope}.addressTitle`,
    defaultMessage: 'عنوان آدرس:',
  },
  orderCode: {
    id: `${scope}.orderCode`,
    defaultMessage: 'کد سفارش:',
  },
  ConsignmentCount: {
    id: `${scope}.ConsignmentCount`,
    defaultMessage: 'تعداد مرسوله:',
  },
  paymentType: {
    id: `${scope}.paymentType`,
    defaultMessage: 'روش پرداخت:',
  },
  ConsignmentCountText: {
    id: `${scope}.ConsignmentCountText`,
    defaultMessage: '{count} مرسوله',
  },
  orderAmount: {
    id: `${scope}.orderAmount`,
    defaultMessage: 'مبلغ سفارش:',
  },
  discount: {
    id: `${scope}.discount`,
    defaultMessage: 'تخفیف:',
  },
  deliveredDate: {
    id: `${scope}.deliveredDate`,
    defaultMessage: 'تاریخ تحویل:',
  },
  canceledAmount: {
    id: `${scope}.canceledAmount`,
    defaultMessage: 'مبلغ کالاهای لغو شده:',
  },
  canceledDate: {
    id: `${scope}.canceledDate`,
    defaultMessage: 'تاریخ لغو:',
  },
  orderDetail: {
    id: `${scope}.orderDetail`,
    defaultMessage: 'جزئیات سفارش',
  },
  requestDetail: {
    id: `${scope}.requestDetail`,
    defaultMessage: 'جزئیات درخواست',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'بازگشت به مرحله قبل',
  },
  paymentAwaitingWithTime: {
    id: `${scope}.paymentAwaitingWithTime`,
    defaultMessage: 'در صورت عدم پرداخت صورت حساب، سفارش شما تا {time} دقیقه دیگر لغو می‌شود.',
  },
  fullAmount: {
    id: `${scope}.fullAmount`,
    defaultMessage: 'مبلغ کل:',
  },
  deliveryAddress: {
    id: `${scope}.deliveryAddress`,
    defaultMessage: 'آدرس تحویل',
  },
  orderHistory: {
    id: `${scope}.orderHistory`,
    defaultMessage: 'تاریخچه تراکنش',
  },
  orderSuccess: {
    id: `${scope}.orderSuccess`,
    defaultMessage: 'پرداخت موفق',
  },
  orderUnSuccess: {
    id: `${scope}.orderUnSuccess`,
    defaultMessage: 'پرداخت ناموفق',
  },
  followUpCode: {
    id: `${scope}.followUpCode`,
    defaultMessage: 'شماره پیگیری',
  },
  cancelOrder: {
    id: `${scope}.cancelOrder`,
    defaultMessage: 'لغو سفارش',
  },
  orderPayment: {
    id: `${scope}.orderPayment`,
    defaultMessage: 'پرداخت سفارش',
  },
  cancelConsignment: {
    id: `${scope}.cancelConsignment`,
    defaultMessage: 'لغو مرسوله',
  },
  cancelConsignmentAlert: {
    id: `${scope}.cancelConsignmentAlert`,
    defaultMessage:
      'تنها کالاهایی امکان لغو دارند که توسط حمل کننده دریافت نشده باشند و از سوی فروشگاه امکان لغو کالا وجود داشته باشد.',
  },
  cancelAllConsignments: {
    id: `${scope}.cancelAllConsignments`,
    defaultMessage: 'لغو تمامی کالاهای قابل لغو در سفارش',
  },
  cancelReason: {
    id: `${scope}.cancelReason`,
    defaultMessage: 'علت لغو',
  },
  cancelSomeConsignments: {
    id: `${scope}.cancelSomeConsignments`,
    defaultMessage: 'لغو برخی کالاهای موجود در سفارش',
  },
  priceWithCurrency: {
    id: `${scope}.priceWithCurrency`,
    defaultMessage: '{price} {currency}',
  },
  checkCancelOrder: {
    id: `${scope}.checkCancelOrder`,
    defaultMessage: 'بررسی درخواست لغو',
  },
  orderCancelSuccess: {
    id: `${scope}.orderCancelSuccess`,
    defaultMessage: 'سفارش شما با موفقیت لغو شد',
  },
  cancelDate: {
    id: `${scope}.cancelDate`,
    defaultMessage: 'تاریخ لغو:',
  },
  refundedDate: {
    id: `${scope}.refundedDate`,
    defaultMessage: 'تاریخ مرجوعی:',
  },
  canceledOrderPrice: {
    id: `${scope}.canceledOrderPrice`,
    defaultMessage: 'مبلغ کالاهای لغو شده در سفارش:',
  },
  returnToOrder: {
    id: `${scope}.returnToOrder`,
    defaultMessage: 'بازگشت به بخش سفارش',
  },
  canceledProducts: {
    id: `${scope}.canceledProducts`,
    defaultMessage: 'کالاهای لغو شده',
  },
  consignmentNumber: {
    id: `${scope}.consignmentNumber`,
    defaultMessage: 'مرسوله {number}',
  },
  allConsignmentAmount: {
    id: `${scope}.allConsignmentAmount`,
    defaultMessage: 'مبلغ کل سفارش:',
  },
  consignmentAmount: {
    id: `${scope}.consignmentAmount`,
    defaultMessage: 'مبلغ مرسوله:',
  },
  howToDelivery: {
    id: `${scope}.howToDelivery`,
    defaultMessage: 'نحوه ارسال:',
  },
  payAwaitOrder: {
    id: `${scope}.payAwaitOrder`,
    defaultMessage: 'در صورت عدم پرداخت صورت حساب، سفارش شما تا {time} دقیقه دیگر لغو می‌شود.',
  },
  pay: {
    id: `${scope}.pay`,
    defaultMessage: 'پرداخت',
  },
  buyAgain: {
    id: `${scope}.buyAgain`,
    defaultMessage: 'خرید مجدد سفارش',
  },
  buyAgainOrder: {
    id: `${scope}.buyAgainOrder`,
    defaultMessage: 'خرید مجدد',
  },
  paidAmount: {
    id: `${scope}.paidAmount`,
    defaultMessage: 'مبلغ پرداختی',
  },
  addComment: {
    id: `${scope}.addComment`,
    defaultMessage: 'ثبت نظر',
  },
  addCommentForProduct: {
    id: `${scope}.addCommentForProduct`,
    defaultMessage: 'ثبت نظر برای کالا',
  },
  draftCommentMessage: {
    id: `${scope}.commentReactionMessage`,
    defaultMessage: 'نظر شما در حال بررسی می‌باشد.',
  },
  shippingCost: {
    id: `${scope}.shippingCost`,
    defaultMessage: 'هزینه ارسال:',
  },
  free: {
    id: `${scope}.free`,
    defaultMessage: 'رایگان',
  },
  selectProductForComment: {
    id: `${scope}.selectProductForComment`,
    defaultMessage: 'محصول مورد نظر برای ثبت نظر انتخاب کنید.',
  },
  seeOrderFactor: {
    id: `${scope}.seeOrderFactor`,
    defaultMessage: 'مشاهده فاکتور سفارش',
  },
  internetPay: {
    id: `${scope}.internetPay`,
    defaultMessage: 'پرداخت اینترنتی',
  },
  refundOrder: {
    id: `${scope}.refundOrder`,
    defaultMessage: 'مرجوع کردن سفارش',
  },
  refundOrderItem: {
    id: `${scope}.refundOrderItem`,
    defaultMessage: 'مرجوع کردن مرسوله',
  },
  orderRefundSuccess: {
    id: `${scope}.orderRefundSuccess`,
    defaultMessage: 'درخواست شما ثبت شد',
  },
  refundOrderPrice: {
    id: `${scope}.refundOrderPrice`,
    defaultMessage: 'مبلغ کالاهای مرجوع شده در سفارش:',
  },
  refundedProducts: {
    id: `${scope}.refundedProducts`,
    defaultMessage: 'کالاهای مرجوع شده',
  },
  refundCode: {
    id: `${scope}.refundCode`,
    defaultMessage: 'کد پیگیری مرجوعی:',
  },
  shipmentTrackingCode: {
    id: `${scope}.shipmentTrackingCode`,
    defaultMessage: 'کد پیگیری مرسوله:',
  },
  refundDate: {
    id: `${scope}.refundDate`,
    defaultMessage: 'تاریخ مرجوعی',
  },
  refundPrice: {
    id: `${scope}.refundPrice`,
    defaultMessage: 'مبلغ مرجوعی',
  },
  refundCondition: {
    id: `${scope}.refundCondition`,
    defaultMessage: 'تنها کالاهایی امکان مرجوع دارند که از سوی فروشگاه امکان مرجوع کالا وجود داشته باشد.',
  },
  refundReason: {
    id: `${scope}.refundReason`,
    defaultMessage: 'علت مرجوعی',
  },
  refundProductReason: {
    id: `${scope}.refundProductReason`,
    defaultMessage: 'علت مرجوع کالا',
  },
  refundComplaint: {
    id: `${scope}.refundComplaint`,
    defaultMessage: 'شرح شکایت',
  },
  refundCount: {
    id: `${scope}.refundCount`,
    defaultMessage: 'تعداد کالاهای مرجوعی',
  },
  checkRefundOrder: {
    id: `${scope}.checkRefundOrder`,
    defaultMessage: 'بررسی درخواست مرجوعی',
  },
  uploadFile: {
    id: `${scope}.uploadFile`,
    defaultMessage: 'آپلود فایل',
  },
  fileUploadSizeError: {
    id: `${scope}.fileUploadSizeError`,
    defaultMessage: 'حجم بیشتر ازmb ۱۰ است.',
  },
  withSuccess: {
    id: `${scope}.withSuccess`,
    defaultMessage: 'با موفقیت انجام شد.',
  },
  canceledCount: {
    id: `${scope}.canceledCount`,
    defaultMessage: 'تعداد کالاهای لغوی',
  },
  productDetail: {
    id: `${scope}.productDetail`,
    defaultMessage: 'جزئیات محصول',
  },
  discountCode: {
    id: `${scope}.discountCode`,
    defaultMessage: 'تخفیف : {code}{currency}',
  },
  fullAddress: {
    id: `${scope}.fullAddress`,
    defaultMessage: '{mainAddress} محله {district} پلاک {plaque} واحد {unit}',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'توضیحات:',
  },
  orderNumber: {
    id: `${scope}.orderNumber`,
    defaultMessage: 'شماره سفارش',
  },
  consignmentCode: {
    id: `${scope}.consignmentCode`,
    defaultMessage: 'شماره مرسوله',
  },
  deliveredTime: {
    id: `${scope}.deliveredTime`,
    defaultMessage: 'زمان تحویل:',
  },
  giveDeliveryCodeToAgent: {
    id: `${scope}.giveDeliveryCodeToAgent`,
    defaultMessage: 'این کد را هنگام دریافت مرسوله به مامور ارسال اعلام کنید',
  },
  consignmentDeliveryCode: {
    id: `${scope}.consignmentDeliveryCode`,
    defaultMessage: 'کد تحویل مرسوله:',
  },
  partialPayMsg: {
    id: `${scope}.partialPayMsg`,
    defaultMessage: 'شما یک سفارش چند مرحله‌ای دارید. برای تکمیل سفارش خود مابقی مبلغ را پرداخت کنید',
  },
  orderRemainingAmount: {
    id: `${scope}.orderRemainingAmount`,
    defaultMessage: 'مبلغ باقی مانده سفارش (چند مرحله‌ای)',
  },
  'pending-returned': {
    id: `${scope}.pendingReturned`,
    defaultMessage: 'در حال بررسی درخواست مرجوعی',
  },
  'await-partial-payment': {
    id: `${scope}.awaitPartialPayment`,
    defaultMessage: 'در انتظار تکمیل وجه',
  },
  cancelPayMessage: {
    id: `${scope}.cancelPayMessage`,
    defaultMessage: 'پرداخت لغو شده',
  },
  nonePayMessage: {
    id: `${scope}.nonePayMessage`,
    defaultMessage: 'وضعیت نامشخص!',
  },
  rejected: {
    id: `${scope}.rejected`,
    defaultMessage: 'رد شده',
  },
  correctFileFormat: {
    id: `${scope}.correctFileFormat`,
    defaultMessage: 'فرمت ارسالی اشتباه میباشد.فقط عکس مورد قبول است',
  },
})
