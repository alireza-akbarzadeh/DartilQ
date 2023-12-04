import { useEffect, useMemo, useState } from 'react'

export const useIsInViewport = (ref: Element) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), [])

  useEffect(() => {
    observer?.observe(ref ?? document.body)

    return () => {
      observer?.disconnect()
    }
  }, [ref, observer])

  return isIntersecting
}
