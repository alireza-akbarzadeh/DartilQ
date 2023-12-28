'use client'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

import { HBButton, HBIcon, HBNextImage } from '@/core/components'

export const FooterSection = (): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false)
  const [dartilLinkExpanded, setDartilLinkExpanded] = useState<boolean>(false)
  const [buyHelperExpanded, setBuyHelperExpanded] = useState<boolean>(false)
  const [crmExpanded, setCrmExpanded] = useState<boolean>(false)
  const { spacing } = useTheme()

  return (
    <Box sx={{ backgroundColor: 'textAndIcon.darker' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: spacing(4),
          paddingTop: spacing(6),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'textAndIcon.lightest',
          }}
        >
          <HBIcon name="phone" />
          <Typography
            variant="bodyMedium"
            component={'a'}
            href="tel:+98-21-57603"
            sx={{
              color: 'textAndIcon.lightest',
              textDecoration: 'none',
            }}
          >
            پشتیبانی ۵۷۶۰۳-۰۲۱
          </Typography>
        </Box>
        <HBButton
          variant="secondary"
          size="small"
          sx={{ color: 'textAndIcon.darker', borderWidth: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <HBIcon name="angleUp" />
        </HBButton>
      </Box>
      <Box sx={{ paddingY: spacing(5), paddingX: spacing(4) }}>
        <Divider sx={{ color: 'common.white' }} />
      </Box>
      <Box sx={{ paddingX: spacing(4) }}>
        <Accordion
          expanded={dartilLinkExpanded}
          onChange={() => setDartilLinkExpanded(value => !value)}
          elevation={0}
          sx={{
            backgroundColor: 'textAndIcon.darker',
            color: 'common.white',
          }}
        >
          <AccordionSummary expandIcon={<HBIcon name="angleUp" sx={{ color: 'common.white' }} />}>
            <Typography variant="titleSmall">دارتیل</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing(4),
                color: 'textAndIcon.lighter',
              }}
            >
              <Typography variant="bodyMedium">ارتباط با ما</Typography>
              <Typography variant="bodyMedium">درباره دارتیل</Typography>
              <Typography variant="bodyMedium">فرصت های شغلی</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={buyHelperExpanded}
          onChange={() => setBuyHelperExpanded(value => !value)}
          elevation={0}
          sx={{
            backgroundColor: 'textAndIcon.darker',
            color: 'textAndIcon.lightest',
          }}
        >
          <AccordionSummary expandIcon={<HBIcon name="angleUp" sx={{ color: 'textAndIcon.lightest' }} />}>
            <Typography variant="titleSmall">راهنمای خرید</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing(4),
                color: 'textAndIcon.lighter',
              }}
            >
              <Typography variant="bodyMedium">راهنمای ثبت سفارش</Typography>
              <Typography variant="bodyMedium">روش‌های ارسال کالا</Typography>
              <Typography variant="bodyMedium">شیوه‌های پرداخت کالا</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={crmExpanded}
          onChange={() => setCrmExpanded(value => !value)}
          elevation={0}
          sx={{
            backgroundColor: 'textAndIcon.darker',
            color: 'textAndIcon.lightest',
          }}
        >
          <AccordionSummary
            expandIcon={<HBIcon name="angleUp" sx={{ color: 'textAndIcon.lightest' }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="titleSmall">خدمات مشتریان</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing(4),
                color: 'textAndIcon.lighter',
              }}
            >
              <Typography variant="bodyMedium">سوالات متداول</Typography>
              <Typography variant="bodyMedium">نحوه بازگرداندن کالا</Typography>
              <Typography variant="bodyMedium">شرایط استفاده از دارتیل</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          paddingX: spacing(4),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            paddingTop: spacing(5),
            color: 'textAndIcon.lightest',
          }}
        >
          <Link href="https://instagram.com/dartil.official" target="_blank" style={{ textDecoration: 'none' }}>
            <HBIcon name="instagram" sx={{ color: 'textAndIcon.lightest' }} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/dartil-official"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <HBIcon name="linkedinAlt" sx={{ color: 'textAndIcon.lightest' }} />
          </Link>
          <Link href="https://www.aparat.com/dartil" target="_blank" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HBNextImage isLocal alt="logo" height={24} src="/assets/png/aparat.png" width={24} />
            </Box>
          </Link>
        </Box>
        <Box>
          <Divider sx={{ color: 'common.white' }} />
        </Box>
        <Box>
          <HBNextImage isLocal alt="logo" height={24} src="/assets/png/dartil.png" width={81} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="bodyMedium" sx={{ color: 'textAndIcon.lighter' }}>
            با دارتیل خریدت به راهه!
          </Typography>
          <Box>
            <Typography variant="bodyMedium" sx={{ color: 'textAndIcon.lighter' }}>
              «دارتیل» از برندهای گروه صنعتی گلرنگ و یکی از شرکت‌های زیرمجموعه گروه سرمایه‌گذاری کوروش است که از سال
              1401
            </Typography>
            {showMore && (
              <Typography
                variant="bodyMedium"
                sx={{ color: 'textAndIcon.lighter', textAlign: 'left', wordWrap: 'break-word' }}
              >
                به‌عنوان نسل سوم خرده‌فروشی یا کیوکامرس (Q-Commerce) و با هدف تسهیل فرآیند خرید و فروش آنلاین آغاز به
                کار کرد. بازار اینترنتی دارتیل در حال حاضر در شهر تهران فعالیت دارد و به کاربران این امکان را می‌دهد تا
                به فروشگاه‌های نزدیک خود دسترسی داشته باشند و کالاهای مورد نیاز خود را با بهترین قیمت و بدون واسطه از
                فروشندگان خریداری کنند. تضمین اصالت و بهترین قیمت بازار، ارسال سریع، گارانتی، تخفیف‌های شگفت‌انگیز،
                مرجوعی کالا و پشتیبانی در هفت روز هفته اولویت‌هایی هستند که دارتیل برای خلق یک تجربه متفاوت از خرید
                آنلاین به آن‌ها پایبند است. خرید از فروشگاه‌‌های اطراف: در دارتیل به فروشگاه‌های اطرافتان دسترسی خواهید
                داشت و می‌توانید به جای گشت‌وگذار در مغازه‌ها، کالاهای مورد نیاز و مایحتاج روزانه‌تان را بدون دردسر و با
                چند کلیک تهیه کنید. کافیست فروشگاه دلخواه‌ خود را انتخاب کرده، سفارشتان را به ثبت برسانید و با ارسال
                فوری تحویل بگیرید. ارسال سریع زیر 2 ساعت: مهم‌ترین مزیت رقابتی دارتیل برای تامین‌کنندگان و مشتریان ارسال
                سریع سفارش‎‌ها در کمتر از 2 ساعت است. به این ترتیب اگر فروشگاه انتخابی شما، قابلیت ارسال سریع را داشته
                باشد بلافاصله بعد از ثبت سفارش، فروشگاه سفارش شما را آماده کرده و تحویل پیک می‌دهد ‌تا زیر 2 ساعت به
                دست‌تان برسد. حداکثر زمان ارسال سفارش‌ها در دارتیل نیز به 24 ساعت خواهد رسید. تنوع بی‌نظیر در کالاها:
                هرچه که نیاز داشته باشید در دارتیل برای شما مهیاست. در حال حاضر دسترسی به بیش از 200 هزار کالا در
                دسته‌بندی‌های زیر در دسترس شما هستند: کالای دیجیتال: کالاهای دیجیتال امروزه بخشی از زندگی روزمره ما
                هستند که امکانات بسیار گسترده‌ای در اختیار ما قرار می‌دهند. در دارتیل می‌توانید با توجه به بودجه و نیاز
                خود، اقتصادی‌ترین تا گران‌ترین و جدیدترین کالاهای دیجیتال را خریداری نمایید. انواع گوشی موبایل از
                برندهای مختلفی مثل آیفون، گوشی سامسونگ s23 ultra، گوشی نوکیا، گوشی شیائومی، گوشی هواوی و...، انواع هدست
                و هندزفری، انواع ساعت هوشمند از جمله سامسونگ واچ 6، اپل واچ 11 و… انواع کنسول بازی مثل ایکس باکس، ps4 و
                ps5، انواع تبلت‌های پرطرفدار مثل تبلت سامسونگ، انواع هدفون، هندزفری و ایرپاد، انواع مانیتور و لوازم
                جانبی کامپیوتر تنها بخشی از محصولاتی هستند که زیرمجموعه کالای دیجیتال قرار دارند. زیبایی و سلامت: در
                فروشگاه اینترنتی دارتیل به مجموعه کاملی از لوازم آرایشی و بهداشتی اورجینال و اصل دسترسی خواهید داشت.
                انواع لوازم آرایش صورت مثل کرم پودر و پنکک، کانسیلر و رژ گونه، انواع لوازم آرایش چشم، لب و ابرو، انواع
                کرم مرطوب‌کننده و آبرسان، کرم ضد آفتاب، ضد لک و روشن‌کننده، مجموعه بی‌نظیری از عطر و ادکلن اورجینال
                زنانه و مردانه در دسترس شما قرار دارند. در این دسته‌بندی، امکان خرید اینترنتی محصولات بهداشت جنسی نیز
                فراهم شده تا به سهولت، کالاهای مورد نظر خود را به‌صورت اینترنتی خریداری نمایید و در کمترین زمان جلوی درب
                منزل تحویل بگیرید. ما در دارتیل بهترین برندهای لوازم آرایشی بهداشتی مثل اوریفلیم، فارماسی، ایزدین،
                اردینری، لورال، میبلین، گارنیر، بورژوا، اسنس، آرت دکو، بیو، بایودرما، نوروا، ویشی، لیراک و ده‌ها برند
                مطرح دنیا را گرد هم آورده‌ایم تا با اطمینان از اصالت کالا و بهترین قیمت، از خرید اینترنتی خود لذت ببرید.
                کالاهای سوپرمارکتی: در دسته‌بندی کالاهای سوپرمارکتی می‌توانید تمامی کالاهای اساسی و خواروبار مورد نیاز
                آشپزخانه‌تان را خریداری کنید. محصولات پرطرفدار مانند انواع برنج ایرانی مثل برنج هاشمی، طارم، گلستان،
                انواع روغن آفتابگردان و سرخ کردنی از برندهای معتبری همچون بهار، غنچه، انواع چاشنی مثل انواع رب، سس،
                انواع ملزومات صبحانه مثل کره بادام زمینی، مربا، عسل و... در اختیار شما هستند. خانه و آشپزخانه: دسته‌بندی
                خانه و آشپزخانه یکی از متنوع‌ترین بخش‌های بازار اینترنتی دارتیل است که می‌توانید برندهای معتبری مثل بوش،
                فیلیپس، گوسونیک، ال جی، اسنوا، جی پلاس را در آن پیدا کنید. در این بخش انواع لوازم برقی آشپزخانه مثل
                توستر، قهوه جوش اسمگ، مایکروفر، سرخ کن، چای ساز، انواع تلویزیون و میز تلویزیون، انواع لباسشویی اسنوا،
                انواع ظروف و ملزومات پخت‌و‌پز مانند انواع قابلمه و تابه از برندهای معتبری نظیر زرساب، سرویس غذاخوری،
                انواع سرویس قاشق و چنگال ناب استیل، انواع ظروف دکوراتیو و… نیز قرار دارند. غذا و لوازم حیوانات خانگی: در
                بخش غذا و لوازم حیوانات خانگی انواع غذای خشک سگ ، غذای خشک گربه ، کنسرو و پوچ سگ، کنسرو و پوچ گربه،
                انواع تشویقی سگ و گربه، انواع مالت و مکمل غذای سگ و مکمل غذای گربه، لوازم بهداشتی حیوانات خانگی مانند
                خاک گربه و شامپو، پوشاک و لباس، قلاده سگ، اسباب بازی، جای خواب گربه و سگ و غذا و لوازم آبزیان وجود دارد.
                در این دسته‌بندی به برندهای معتبر جهانی مانند رویال کنین، وینستون، رفلکس و جوسرا و برندهای خوب ایرانی
                مانند نوتری پت، رویال فید و مفید دسترسی خواهید داشت. فرهنگ و هنر: انواع کتاب و مجله، لوازم‌ التحریر،
                انواع بازی‌های فکری و آموزشی و انواع سازها مثل گیتار، پیانو، سنتور، دف، ملودیکا، هنگ درام و... با بهترین
                قیمت‌ها و از بهترین برندها در دسته‌بندی فرهنگ و هنر قرار دارند. خودرو و موتور سیکلت: برای خرید انواع
                لوازم مصرفی خودرو و موتورسیکلت مثل روغن و ضدیخ، مکمل سوخت و..، انواع لوازم جانبی خودرو مانند سیستم صوتی
                تصویری، ضبط، بلندگو و...، لوازم یدکی مثل دیسک و صفحه کلاچ و... و لوازم نظافت و نگهداری خودرو مثل پولیش و
                واکس بدنه، کفپوش و… کافیست سری به دسته‌بندی خودرو و موتورسیکلت بزنید. در این بخش به برندهای معتبری نظیر
                ایرانول، ووفر، سرکان و… با بهترین قیمت دسترسی خواهید داشت. ابزار و لوازم ساختمانی و صنعتی: هر نوع وسیله
                و ابزار ساختمانی و صنعتی که فکرش را کنید از انواع ابزار برقی و شارژی گرفته تا یراق آلات و تجهیزات ایمنی
                و کار، در این بخش قرار دارند. ضمانت قیمت و کیفیت: ما در دارتیل طیف گسترده‌ای از محصولات موجود در بازار
                با بهترین قیمت‌ها را گردآوری کرده‌ایم تا شما با هر بودجه‌ای توانایی خرید را داشته باشید. تمامی محصولات
                موجود در دارتیل ضمانت بازگشت کالا دارند و خیال شما از بابت خرید اینترنتی راحت خواهد بود. خریدی مطمئن‌تر
                با «برولایو» دارتیل: «پخش زنده» یا «برولایو» قابلیتی جدید و جذاب در دارتیل است که به وسیله آن، می‌توانید
                درست مانند یک خرید حضوری در فضای آنلاین با فروشنده تعامل داشته باشید. مراحل آنباکسینگ محصول توسط فروشنده
                را ببینید، سوالات خود را بپرسید، نظرات دیگران کاربران را مشاهده کنید و در همان لحظه محصول مورد نظر را به
                سبد خرید خود اضافه کنید. خرید با تخفیف‌های بیشتر: تنوع تخفیف در دارتیل بسیار زیاد است و مطمئن باشید با
                کمی گشت‌وگذار می‌توانید کالای موردنظرتان را با تخفیف خریداری کنید. علاوه‌بر این، دارتیل کد‌های تخفیف‌
                هیجان‌انگیزی برای خرید اول، خرید سر ماه و تخفیف‌های هفتگی در نظر گرفته است تا بتوانید خرید به‌صرفه‌تری
                داشته باشید. پیگیری دقیق برای خریدی مطمئن: در دارتیل هر سفارش با امکان پیگیری و پشتیبانی کامل به دست
                مشتری می‌رسد و با خیالی راحت می‌توانید سفارش خود را تحویل بگیرید. ما در دارتیل برای تحقق یک رویای بزرگ
                در جهت افزایش اعتماد مشتریان به خرید اینترنتی، در تلاش هستیم تا بتوانیم با استفاده از جدیدترین فناوری‌ها
                به اولین انتخاب ایرانیان تبدیل شویم.
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', color: 'textAndIcon.lightest' }} onClick={() => setShowMore(value => !value)}>
            <Typography variant="bodyMedium">{showMore ? 'بستن' : 'مشاهده بیشتر'}</Typography>
            <HBIcon name={showMore ? 'angleUp' : 'angleDown'} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <HBNextImage isLocal alt="logo" height={88} src="/assets/png/resaneDigital.png" width={88} />
          <Link href="https://trustseal.enamad.ir/?id=304155&Code=CWAVGCIodF4V8igyroue" target="_blank">
            <HBNextImage isLocal alt="logo" height={88} src="/assets/png/enamad.png" width={88} />
          </Link>
        </Box>
        <Box>
          <Divider sx={{ color: 'common.white' }} />
        </Box>
        <Box>
          <Typography
            variant="bodySmall"
            component="div"
            sx={{
              textAlign: 'center',
              wordWrap: 'break-word',
              color: 'textAndIcon.lighter',
              paddingBottom: spacing(4),
            }}
          >
            {/* {formatMessage(introLandingMessages.installApp)} */}
            کلیه حقوق مادی و معنوی این سایت محفوظ و متعلق به گروه صعنتی گلرنگ است. تير ۱۴۰۱ (نسخه ۱.۱۶.۱)
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
