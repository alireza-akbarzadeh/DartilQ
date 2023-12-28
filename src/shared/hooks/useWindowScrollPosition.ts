import { useEffect, useState } from 'react'

interface WindowPositionReturnType {
  y: number
  x: number
}

export const useWindowScrollPosition = (targetPositionY?: number): WindowPositionReturnType => {
  const [windowScrollPosition, setWindowScrollPosition] = useState<WindowPositionReturnType>({ x: 0, y: 0 })
  useEffect(() => {
    const onScroll = () => {
      if (targetPositionY) {
        if (windowScrollPosition.y <= targetPositionY && window.scrollY >= targetPositionY)
          setWindowScrollPosition({ x: window.scrollX, y: window.scrollY })
        else if (windowScrollPosition.y + 100 > targetPositionY && window.scrollY + 100 < targetPositionY)
          setWindowScrollPosition({ x: window.scrollX, y: window.scrollY })
      } else {
        setWindowScrollPosition({ x: window.scrollX, y: window.scrollY })
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [windowScrollPosition?.y])

  return windowScrollPosition
}
