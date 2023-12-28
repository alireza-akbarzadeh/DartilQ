import { useTheme } from '@mui/material'
import { useLayoutEffect, useState } from 'react'

const SM_BASE_SIZE = 360
const MD_BASE_SIZE = 550
export const useScale = (): ((value: number) => number) => {
  const theme = useTheme()
  const [baseSize, setBaseSize] = useState(SM_BASE_SIZE)
  const [rootSize, setRootSize] = useState(0)

  useLayoutEffect(() => {
    const rootWidth = document?.getElementById('root')?.clientWidth ?? 0

    if (rootWidth <= theme.breakpoints.values.sm) {
      setBaseSize(SM_BASE_SIZE)
    } else if (rootWidth > theme.breakpoints.values.sm && rootWidth <= theme.breakpoints.values.md) {
      setBaseSize(MD_BASE_SIZE)
    }
    setRootSize(rootWidth)
  }, [])

  const scale = (value: number) => {
    const ratio = rootSize / baseSize

    return ratio > 0 ? Math.ceil(value * ratio) : value
  }

  return scale
}
