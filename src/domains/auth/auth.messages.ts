'use client'
import { defineMessages } from 'react-intl'

const scope = 'qcommerce.auth'

export const authMessages = defineMessages({
  enterPhoneNumber: {
    id: `${scope}.enterPhoneNumber`,
    defaultMessage: 'برای ادامه شماره موبایل خود را وارد کنید.',
  },
  phoneNumber: {
    id: `${scope}.phoneNumber`,
    defaultMessage: 'شماره موبایل',
  },
  termsAndPrivacyRules: {
    id: `${scope}.termsAndPrivacyRules`,
    defaultMessage: 'ورود شما به معنی پذیرش <b> شرایط دارتیل و قوانین حریم خصوصی </b> است.',
  },
  confirmAndReceiveTheCode: {
    id: `${scope}.confirmAndReceiveTheCode`,
    defaultMessage: 'تایید و دریافت کد',
  },
  digitalGoodsDescription: {
    id: `${scope}.digitalGoodsDescription`,
    defaultMessage:
      'کالاهای دیجیتال امروزه بخشی از زندگی روزمره ما هستند که امکانات بسیار گسترده‌ای در اختیار ما قرار می‌دهند. در دارتیل می‌توانید با توجه به بودجه و نیاز خود،  اقتصادی‌ترین تا گران‌ترین و جدیدترین کالاهای دیجیتال را خریداری نمایید. انواع گوشی موبایل از برندهای مختلفی مثل آیفون، گوشی سامسونگ s23 ultra، گوشی نوکیا، گوشی شیائومی، گوشی هواوی و...، انواع هدست و هندزفری، انواع ساعت هوشمند از جمله سامسونگ واچ 6، اپل واچ 11 و… انواع کنسول بازی مثل ایکس باکس، ps4 و ps5، انواع تبلت‌های پرطرفدار مثل تبلت سامسونگ، انواع هدفون، هندزفری و ایرپاد، انواع مانیتور و لوازم جانبی کامپیوتر تنها بخشی از محصولاتی هستند که زیرمجموعه <a>کالای دیجیتال</a> قرار دارند.',
  },
  enterOtpCode: {
    id: `${scope}.enterOtpCode`,
    defaultMessage: 'کد تایید ارسال‌شده به شماره {phoneNumber} را وارد کنید. ',
  },
  editPhoneNumber: {
    id: `${scope}.editPhoneNumber`,
    defaultMessage: 'ویرایش شماره',
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'تایید',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'بازگشت',
  },
  nextStep: {
    id: `${scope}.nextStep`,
    defaultMessage: 'مرحله بعد',
  },
  enterPassword: {
    id: `${scope}.enterPassword`,
    defaultMessage: 'رمز عبور خود را وارد کنید.',
  },
  forgetPassword: {
    id: `${scope}.forgetPassword`,
    defaultMessage: 'فراموشی کلمه عبور',
  },
  loginWithOtp: {
    id: `${scope}.loginWithOtp`,
    defaultMessage: 'ورود با رمز یکبار مصرف',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'کلمه عبور',
  },
  resendOtp: {
    id: `${scope}.resendOtp`,
    defaultMessage: 'ارسال مجدد کد',
  },
  extraTimerText: {
    id: `${scope}.extraTimerText`,
    defaultMessage: 'مانده تا دریافت مجدد کد',
  },
  loginWithPassword: {
    id: `${scope}.loginWithPassword`,
    defaultMessage: 'ورود با رمز عبور',
  },
  phoneNumberErrorMessage: {
    id: `${scope}.phoneNumberErrorMessage`,
    defaultMessage: 'شماره موبایل وارد شده نادرست است',
  },
  faultMessage: {
    id: `${scope}.faultMessage`,
    defaultMessage: 'دریافت اطلاعات با خطا مواجه شد',
  },
  enterInformationForRegister: {
    id: `${scope}.enterInformationForRegister`,
    defaultMessage: 'برای ثبت نام اطلاعات زیر را تکمیل کنید',
  },
  firstNameLabel: {
    id: `${scope}.firstNameLabel`,
    defaultMessage: 'نام (به فارسی)',
  },
  lastNameLabel: {
    id: `${scope}.lastNameLabel`,
    defaultMessage: 'نام خانوادگی (به فارسی)',
  },
})
