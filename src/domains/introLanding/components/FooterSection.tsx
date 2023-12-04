'use client'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { HBButton, HBIcon } from '@/core/components'
import { HBNextImage } from '@/core/components'

import { introLandingMessages } from '../introLanding.messages'
import { WrapperInstallAppButton } from './styles'

export const FooterSection = (): JSX.Element => {
  const [downloadAppExpanded, setDownloadAppExpanded] = useState<boolean>(false)
  const [dartilLinkExpanded, setDartilLinkExpanded] = useState<boolean>(false)
  const [buyHelperExpanded, setBuyHelperExpanded] = useState<boolean>(false)
  const [crmExpanded, setCrmExpanded] = useState<boolean>(false)
  const { spacing } = useTheme()
  const { formatMessage } = useIntl()
  const { push } = useRouter()
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
            {formatMessage(introLandingMessages.callCenter)}
          </Typography>
        </Box>
        <HBButton
          variant="secondary"
          size="small"
          sx={{ color: 'textAndIcon.darker', borderWidth: 0 }}
          onClick={() => {
            push('https://dartil.com/seller-landing/')
          }}
        >
          <Typography variant="bodySmall">{formatMessage(introLandingMessages.sellInDartil)}</Typography>
        </HBButton>
      </Box>
      <Box sx={{ paddingY: spacing(5), paddingX: spacing(4) }}>
        <Divider sx={{ color: 'common.white' }} />
      </Box>
      <Box sx={{ paddingX: spacing(4) }}>
        <Accordion
          expanded={downloadAppExpanded}
          onChange={() => setDownloadAppExpanded(value => !value)}
          elevation={0}
          sx={{
            backgroundColor: 'textAndIcon.darker',
            color: 'common.white',
          }}
        >
          <AccordionSummary expandIcon={<HBIcon name="angleUp" sx={{ color: 'common.white' }} />}>
            <Typography variant="titleSmall">{formatMessage(introLandingMessages.downloadApp)}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
                maxWidth: 360,
              }}
            >
              <Link href="https://trc.metrix.ir/bmrg2x" target="_blank" style={{ textDecoration: 'none' }}>
                <WrapperInstallAppButton
                  bgcolor="common.white"
                  sx={{
                    color: 'common.black',
                  }}
                >
                  <Typography variant="bodySmall">{formatMessage(introLandingMessages.downloadFrom)}</Typography>
                  <HBNextImage isLocal alt="bazarWhite" height={27} src="/assets/downloadApp/bazar.png" width={66} />
                </WrapperInstallAppButton>
              </Link>
              <Link href="https://trc.metrix.ir/9idvht" target="_blank" style={{ textDecoration: 'none' }}>
                <WrapperInstallAppButton
                  bgcolor="common.white"
                  sx={{
                    color: 'common.black',
                  }}
                >
                  <Typography variant="bodySmall">{formatMessage(introLandingMessages.downloadFrom)}</Typography>
                  <HBNextImage isLocal alt="myketWhite" height={21} src="/assets/downloadApp/myketApp.png" width={67} />
                </WrapperInstallAppButton>
              </Link>
              <Link href="https://trc.metrix.ir/x4ibvf" target="_blank" style={{ textDecoration: 'none' }}>
                <WrapperInstallAppButton
                  bgcolor="common.white"
                  sx={{
                    color: 'common.black',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="smallCaption">
                      {formatMessage(introLandingMessages.downloadIosFrom)}
                    </Typography>
                    <HBNextImage
                      isLocal
                      alt="sibAppWhite"
                      height={17}
                      src="/assets/downloadApp/sibappText.png"
                      width={62}
                    />
                  </Box>
                  <HBNextImage
                    isLocal
                    alt="bazarWhite"
                    height={30}
                    src="/assets/downloadApp/sibappIcon.png"
                    width={22}
                  />
                </WrapperInstallAppButton>
              </Link>
              <Link href="https://sibche.com/applications/dartil" target="_blank" style={{ textDecoration: 'none' }}>
                <WrapperInstallAppButton
                  bgcolor="common.white"
                  sx={{
                    color: 'common.black',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="smallCaption">
                      {formatMessage(introLandingMessages.downloadIosFrom)}
                    </Typography>
                    <HBNextImage
                      isLocal
                      alt="sibcheTextWhite"
                      height={17}
                      src="/assets/downloadApp/sibcheTextBlack.png"
                      width={62}
                    />
                  </Box>
                  <HBNextImage
                    isLocal
                    alt="sibcheWhite"
                    height={30}
                    src="/assets/downloadApp/sibcheIcon.png"
                    width={22}
                  />
                </WrapperInstallAppButton>
              </Link>
              <Link href="https://cdn.dartil.com/dartil.apk" target="_blank" style={{ textDecoration: 'none' }}>
                <WrapperInstallAppButton
                  bgcolor="common.white"
                  sx={{
                    color: 'common.black',
                  }}
                >
                  <Box>
                    <Typography color="common.black" component="div" variant="smallCaption">
                      {formatMessage(introLandingMessages.directDownload)}
                    </Typography>
                    <Typography color="common.black" component="div" variant="caption">
                      {formatMessage(introLandingMessages.androidApp)}
                    </Typography>
                  </Box>
                  <HBIcon sx={{ color: '#9EBC4A' }} name="android" />
                </WrapperInstallAppButton>
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>
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
            <Typography variant="titleSmall">{formatMessage(introLandingMessages.dartil)}</Typography>
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
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.contactUs)}</Typography>
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.aboutUs)}</Typography>
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.careerOpportunities)}</Typography>
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
            <Typography variant="titleSmall">{formatMessage(introLandingMessages.buyGuide)}</Typography>
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
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.orderRegisterGuide)}</Typography>
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.sendingProductMethods)}</Typography>
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.productPaymentMethods)}</Typography>
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
            <Typography variant="titleSmall">{formatMessage(introLandingMessages.customerServices)}</Typography>
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
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.commonQuestions)}</Typography>
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.howToReturnProduct)}</Typography>
              <Typography variant="bodyMedium">{formatMessage(introLandingMessages.dartilUseCondition)}</Typography>
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
            {formatMessage(introLandingMessages.about)}
          </Typography>
          <Box sx={{ display: 'flex', color: 'textAndIcon.lightest' }}>
            <Typography variant="bodyMedium">{formatMessage(introLandingMessages.moreView)}</Typography>
            <HBIcon name="angleDown" />
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
