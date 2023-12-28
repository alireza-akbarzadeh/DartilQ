import { Box, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { HBButton } from '@/core/components'

const countDownValue = 4000

type PropsType = {
  countDownFinished: (status: boolean) => void
}

const RemoveCountDown = (props: PropsType) => {
  const { countDownFinished } = props
  const [timesLeft, setTimesLeft] = useState(countDownValue)
  const interval = useRef<NodeJS.Timeout | null>()
  const timerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!timerRef.current) return
    interval.current = setInterval(() => {
      setTimesLeft(prevCountdown => prevCountdown - 10)
    }, 10)
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [timerRef.current])

  useEffect(() => {
    if (timesLeft <= 0 && interval.current) {
      clearInterval(interval.current)
      countDownFinished(true)
    }
    if (timerRef.current) {
      timerRef.current.style.width = `${(timesLeft * 100) / countDownValue}%`
    }
  }, [timesLeft])

  const handleDecline = () => {
    countDownFinished(false)
  }

  return (
    <HBButton
      variant="neutral2"
      fullWidth
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={handleDecline}
    >
      <Typography sx={{ zIndex: 1 }} variant="bodyMedium" color="primary.main">
        نمی‌خواهم کالا(ها) را حذف کنم
      </Typography>

      <Box ref={timerRef} sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, bgcolor: 'primary.light' }} />
    </HBButton>
  )
}

export { RemoveCountDown }
