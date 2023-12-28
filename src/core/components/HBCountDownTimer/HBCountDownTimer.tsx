'use client'
import { SxProps, Theme, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { intervalToDuration } from 'date-fns'
import { FC, ReactNode, useEffect, useState } from 'react'

import { HBIcon } from '../HBIcon/HBIcon'
import { HBCountDownTimerRootStyle, RefreshCodeStyle } from './HBCountDownTimer.styles'

type HBCountDownTimerProps = {
  targetDate: number | Date
  linkText: ReactNode
  onClick?: () => void
  disabledButton?: boolean
  extraTimerText?: ReactNode
  sx?: SxProps<Theme>
  maximumShowed?: 'second' | 'minute' | 'hours' | 'days'
  onFinished?: () => void
  textVariant?: Variant
  dateNow?: number
}

const maximumShowedArray = ['second', 'minute', 'hours', 'days']

const HBCountDownTimer: FC<HBCountDownTimerProps> = props => {
  const {
    extraTimerText,
    targetDate: targetDateProps,
    linkText,
    onClick,
    sx,
    maximumShowed = 'days',
    onFinished,
    textVariant = 'bodySmall',
    dateNow,
  } = props
  const [targetDate, setTargetDate] = useState<number | Date | undefined>(targetDateProps)
  const remaining = () => {
    const now = dateNow || new Date()
    const end = new Date(targetDate as number)
    if (now < end)
      return intervalToDuration({
        start: now,
        end,
      })
    return { hours: 0, minutes: 0, seconds: 0, days: 0 }
  }

  useEffect(() => {
    if (targetDateProps) setTargetDate(targetDateProps)
  }, [targetDateProps])

  const maximumShowedIndex = maximumShowedArray.findIndex(i => i === maximumShowed)
  const [timer, setTimer] = useState<Duration>(remaining())
  const { hours = 0, minutes = 0, seconds = 0, days = 0 } = timer

  const handleClick = () => {
    setTargetDate(new Date().getTime() + 1000 * 60 * 2)
    !props.disabledButton && onClick?.()
  }

  useEffect(() => {
    if (targetDate) {
      const timerInterval = setInterval(() => {
        const now = new Date()
        const end = new Date(targetDate as number)
        if (now < end)
          setTimer(
            intervalToDuration({
              start: now,
              end,
            }),
          )
        else {
          setTimer({ hours: 0, minutes: 0, seconds: 0, days: 0 })
          clearInterval(timerInterval)
          onFinished?.()
        }
      }, 1000)
      return () => clearInterval(timerInterval)
    }
    return () => null
  }, [targetDate])

  if (days + hours + minutes + seconds <= 0 && linkText)
    return (
      <RefreshCodeStyle className={props.disabledButton ? 'refresh-btn-disabled' : 'refresh-btn'} onClick={handleClick}>
        <HBIcon size="small" name="historyAlt" />
        <Typography variant={textVariant} className="resend-code">
          {linkText}
        </Typography>
      </RefreshCodeStyle>
    )
  if (days + hours + minutes + seconds <= 0) {
    return null
  }
  return (
    <HBCountDownTimerRootStyle sx={{ ...sx }}>
      {extraTimerText && (
        <Typography
          variant={textVariant}
          component={'span'}
          sx={{
            color: theme => theme.palette.textAndIcon.darker,
            ml: theme => theme.spacing(1),
          }}
        >
          {extraTimerText}
        </Typography>
      )}
      {maximumShowedIndex >= 3 && !!days && (
        <>
          <Typography variant={textVariant} sx={{ textAlign: 'center' }}>
            {days ? days.toString() : '00'}
          </Typography>
          <Typography>: </Typography>
        </>
      )}

      {maximumShowedIndex >= 2 && !!hours && (
        <>
          <Typography variant={textVariant} sx={{ textAlign: 'center' }}>
            {' '}
            {hours ? hours + (maximumShowed === 'hours' && !!days ? days * 24 : 0) : '00'}
          </Typography>
          <Typography>: </Typography>
        </>
      )}

      {maximumShowedIndex >= 1 && !!minutes && (
        <>
          <Typography variant={textVariant} sx={{ textAlign: 'center' }}>
            {' '}
            {minutes ? minutes : '00'}
          </Typography>
          <Typography>: </Typography>
        </>
      )}

      {maximumShowedIndex >= 0 && (
        <Typography variant={textVariant} sx={{ textAlign: 'center' }}>
          {' '}
          {seconds ? seconds : '00'}{' '}
        </Typography>
      )}
    </HBCountDownTimerRootStyle>
  )
}

HBCountDownTimer.displayName = 'HBCountDownTimer'

export type { HBCountDownTimerProps }
export { HBCountDownTimer }
