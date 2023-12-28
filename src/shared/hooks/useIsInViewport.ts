import { useEffect, useMemo, useState } from 'react'

export const useIsInViewport = (ref: Element, option?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [position, setPosition] = useState<DOMRectReadOnly>()
  DOMRectReadOnly
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setPosition(entry.boundingClientRect)
        setIsIntersecting(entry.isIntersecting)
      }, option),
    [],
  )

  useEffect(() => {
    observer?.observe(ref ?? document.body)

    return () => {
      observer?.disconnect()
    }
  }, [ref, observer])

  return { isIntersecting, position }
}
