import { useEffect, useRef, useState } from 'react'

export const useTimer = (time: number): number => {
  const [timeLeft, setTimeLeft] = useState<number>(time)
  const timeLeftRef = useRef<number>(time)

  useEffect(() => {
    if (!time) return
    setTimeLeft(time)
    timeLeftRef.current = time
    const interval = setInterval(() => {
      if (timeLeftRef.current) {
        timeLeftRef.current -= 1
        setTimeLeft(timeLeftRef.current)
      }
    }, 60_000)
    return () => {
      clearInterval(interval)
    }
  }, [time])

  return timeLeft
}
