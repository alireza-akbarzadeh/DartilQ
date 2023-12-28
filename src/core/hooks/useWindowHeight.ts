import { useEffect, useState } from 'react'

const useWindowHeight = (): number | null => {
  if (typeof window === 'undefined') return null
  const [windowHeight, setWindowHeight] = useState<number | null>(null)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = (): void => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowHeight
}

export { useWindowHeight }
