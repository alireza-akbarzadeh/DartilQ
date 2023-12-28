'use client'
import { Box, Divider, RadioGroup, Stack, Typography } from '@mui/material'
import { format } from 'date-fns-jalali'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { HBBottomSheet, HBButton, HBCarousel, HBIcon, HBNextImage, HBRadioButton } from '@/core/components'
import { glyphy } from '@/core/utils'
import { Inquiry } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { usePostWebSaleShippingOrderGetTimeSlotInquiry as getTimeSlotInquiry } from '@/services/sale-services/sale'

type DeliveryEstimateProps = {
  inquiry: Inquiry | undefined
  storeId: string
  addressId: string
  selectedDeliveryDay: number
  onChange: (payableAmountWithVoucher: number, totalShippingFee: number) => void
  setSelectedDeliveryDay: Dispatch<SetStateAction<number>>
  selectedDeliveryTimeFrame: string
  setSelectedDeliveryTimeFrame: Dispatch<SetStateAction<string>>
}
export const DeliveryEstimate = (props: DeliveryEstimateProps): JSX.Element => {
  const {
    inquiry,
    selectedDeliveryTimeFrame,
    setSelectedDeliveryTimeFrame,
    selectedDeliveryDay,
    setSelectedDeliveryDay,
    onChange,
  } = props
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false)
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(
    inquiry?.deliveryTimes?.[0]?.deliveryTimeFrames?.[0]?.price ?? 0,
  )
  const [payableAmount, setPayableAmount] = useState<number>(0)
  const { mutateAsync: getTimeInquiry, isPending } = getTimeSlotInquiry()
  const deliveryEstimate = {
    ...inquiry?.deliveryTimes?.[selectedDeliveryDay]?.deliveryTimeFrames?.find(
      item => item.id === selectedDeliveryTimeFrame,
    ),
  }
  const deliveryDayValue = inquiry?.deliveryTimes?.[selectedDeliveryDay]
  const selectedDeliveryTimeFrameRef = useRef<string>()
  const selectedDeliveryDayRef = useRef<number>()
  const handleChangeDay = (day: number) => {
    setSelectedDeliveryDay(day)
    setSelectedDeliveryTimeFrame('')
    setDeliveryPrice(null)
  }

  const handleSubmit = () => {
    onChange(payableAmount, deliveryPrice ?? 0)
    setOpenBottomSheet(false)
  }

  const handleClose = () => {
    setOpenBottomSheet(false)
    setSelectedDeliveryDay(selectedDeliveryDayRef.current ?? 0)
    setSelectedDeliveryTimeFrame(selectedDeliveryTimeFrameRef.current ?? '')
  }

  const handleChangeDeliveryTime = async (timeFrameId: string) => {
    try {
      setSelectedDeliveryTimeFrame(timeFrameId)
      const response = await getTimeInquiry({ data: { timeFrameId, shipmentOrderId: inquiry?.shipmentOrderId } })
      if (response.success) {
        const { data } = response
        setDeliveryPrice(data?.bundleInquiry?.price ?? 0)
        setPayableAmount(data?.summeryPrice?.payableAmountWithVoucher ?? 0)
      }
    } catch (error) {}
  }

  return (
    <>
      <Stack sx={{ gap: 4, pt: 4 }}>
        <Divider sx={{ color: 'border.lighter' }} />
        <Stack sx={{ gap: 2, px: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
            <Box>
              <Typography variant="titleMedium">زمان و هزینه ارسال</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 2,
                pr: 3,
                pl: 2,
                borderRadius: 10,
                bgcolor: 'background.light',
                color: 'textAndIcon.darker',
                height: 40,
              }}
              onClick={() => {
                setOpenBottomSheet(true)
                selectedDeliveryDayRef.current = selectedDeliveryDay
                selectedDeliveryTimeFrameRef.current = selectedDeliveryTimeFrame
              }}
            >
              <HBIcon name="editAlt" size="xSmall" />
              <Typography variant="bodySmall">تغییر زمان ارسال</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <HBNextImage
              src="/assets/svg/motorcycle.svg"
              alt="motorcycle"
              width={12}
              height={12}
              quality={100}
              isLocal
            />
            <Typography variant="labelMedium" color="textAndIcon.darker">
              {deliveryDayValue?.date && format(new Date(deliveryDayValue?.date ?? ''), 'EEEE d MMMM')}
            </Typography>
            <Box sx={{ borderRadius: '51%', bgcolor: 'background.darker', width: 8, height: 8 }} />
            <Typography variant="labelMedium" color="textAndIcon.darker">
              {deliveryEstimate?.title}
            </Typography>
            {(deliveryPrice ?? 0) > 0 && (
              <>
                <Box sx={{ borderRadius: '51%', bgcolor: 'background.darker', width: 8, height: 8 }} />
                <Typography variant="labelMedium" color="textAndIcon.darker">
                  {deliveryPrice?.toLocaleString()} {glyphy(deliveryEstimate?.currency)}
                </Typography>
              </>
            )}
          </Box>
        </Stack>
      </Stack>
      {openBottomSheet && (
        <HBBottomSheet open onClose={handleClose}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="titleLarge">انتخاب زمان ارسال</Typography>
            </Box>
          </Box>
          <Stack sx={{ gap: 4, px: 4, pt: 8 }}>
            <Box>
              <HBCarousel options={{ direction: 'rtl' }}>
                {inquiry?.deliveryTimes?.map((deliveryTime, index) => (
                  <Stack
                    sx={{ alignItems: 'center', gap: 1, pl: 4 }}
                    onClick={() => handleChangeDay(index)}
                    key={deliveryTime.date}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        height: 24,
                        border: '1px solid',
                        borderColor: selectedDeliveryDay === index ? 'primary.main' : 'background.light',
                        backgroundColor: 'background.light',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="labelMedium"
                        sx={{ color: selectedDeliveryDay === index ? 'primary.main' : 'textAndIcon.light' }}
                        noWrap
                      >
                        {format(new Date(deliveryTime.date ?? ''), 'd MMMM')}
                      </Typography>
                    </Box>
                    <Typography
                      variant="labelMedium"
                      sx={{ color: selectedDeliveryDay === index ? 'textAndIcon.darker' : 'textAndIcon.light' }}
                    >
                      {format(new Date(deliveryTime.date ?? ''), 'EEEE')}
                    </Typography>
                  </Stack>
                ))}
              </HBCarousel>
            </Box>
            <RadioGroup
              value={selectedDeliveryTimeFrame}
              onChange={(_, value) => {
                handleChangeDeliveryTime(value)
              }}
            >
              <Stack sx={{ gap: 3, minHeight: 200, maxHeight: 200, overflowY: 'auto' }}>
                {deliveryDayValue?.deliveryTimeFrames?.map((deliveryTimeFrame, index) => (
                  <Stack sx={{ gap: 3 }} key={deliveryTimeFrame.id}>
                    {index > 0 && <Divider sx={{ color: 'border.lighter' }} />}
                    <HBRadioButton
                      disabled={!deliveryTimeFrame?.isEnable}
                      title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 2,
                              color: deliveryTimeFrame?.isEnable ? 'textAndIcon.darker' : 'textAndIcon.lighter',
                            }}
                          >
                            <Typography variant="labelMedium">ساعت</Typography>
                            <Typography variant="labelMedium">{deliveryTimeFrame?.from}</Typography>
                            <Typography variant="labelMedium">تا</Typography>
                            <Typography variant="labelMedium">{deliveryTimeFrame?.to}</Typography>
                          </Box>
                          {!deliveryTimeFrame?.isEnable && (
                            <Typography variant="labelMedium" sx={{ color: 'textAndIcon.darker' }}>
                              {deliveryTimeFrame?.isEnableDescription}
                            </Typography>
                          )}
                        </Box>
                      }
                      value={deliveryTimeFrame.id}
                    />
                  </Stack>
                ))}
              </Stack>
            </RadioGroup>
            <Box
              sx={{
                display: 'flex',
                minHeight: 60,
                bgcolor: 'background.light',
                borderRadius: 2,
                px: 2,
                py: 1,
                color: 'textAndIcon.darker',
              }}
            >
              {!isPending ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography variant="labelMedium">هزینه ارسال</Typography>
                  {deliveryPrice && (
                    <Typography variant="labelMedium" color="textAndIcon.darker">
                      {deliveryPrice !== 0
                        ? `${deliveryPrice?.toLocaleString()} ${glyphy(deliveryEstimate?.currency)}`
                        : 'رایگان'}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor: 'background.dark',
                    borderRadius: 2,
                    my: 1,
                  }}
                >
                  <Typography variant="labelMedium">منتظر بمانید...</Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <HBButton variant="secondary" sx={{ minWidth: 156 }} onClick={handleClose}>
                انصراف
              </HBButton>
              <HBButton
                variant="primary"
                sx={{ minWidth: 156 }}
                onClick={handleSubmit}
                disabled={isPending || !selectedDeliveryTimeFrame}
              >
                تایید
              </HBButton>
            </Box>
          </Stack>
        </HBBottomSheet>
      )}
    </>
  )
}
