'use client'

import { Box } from '@mui/material'
import { forwardRef, ForwardRefRenderFunction, PropsWithChildren } from 'react'

const ForwardedAppBottomBar: ForwardRefRenderFunction<HTMLElement, PropsWithChildren> = (props, ref) => (
  <Box
    ref={ref}
    sx={{
      position: 'fixed',
      bottom: 0,
      height: 'fit-content',
      maxWidth: theme => theme.breakpoints.values.sm,
      width: '100%',
    }}
  >
    {props.children}
  </Box>
)

const AppBottomBar = forwardRef(ForwardedAppBottomBar)

AppBottomBar.displayName = 'AppBottomBar'

export { AppBottomBar }
