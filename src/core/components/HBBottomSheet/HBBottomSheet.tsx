'use client'
import { backdropClasses, Box, Divider, styled, SwipeableDrawer } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import type { SxProps, Theme } from '@mui/material/styles'
import type { PropsWithChildren, ReactNode, TouchEvent } from 'react'

type BottomSheetProps = {
  open: boolean
  onClose: () => void
  header?: ReactNode
  fullScreen?: boolean
  hidePuller?: boolean
  sx?: SxProps<Theme>
  height?: number | string
  hideDivider?: boolean
  onTouchStart?: (event: TouchEvent<HTMLDivElement>) => void
}

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}))

export const HBBottomSheet = (props: PropsWithChildren<BottomSheetProps>) => {
  const { open, onClose, children, header, fullScreen, hidePuller, sx, height, hideDivider, onTouchStart } = props

  return (
    <SwipeableDrawer
      open={open}
      anchor="bottom"
      onClose={onClose}
      onOpen={() => undefined}
      disableSwipeToOpen
      onTouchStart={onTouchStart}
      sx={{
        zIndex: 100,
        maxWidth: 'sm',
        margin: '0 auto',
        [`& .${backdropClasses.root}`]: {
          maxWidth: 'sm',
          margin: '0 auto',
        },
        [`& .${paperClasses.root}`]: {
          pb: 3,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          height: fullScreen ? '100vh' : height,
          overflowY: 'hidden',
          maxWidth: 'sm',
          margin: '0 auto',
        },
        ...sx,
      }}
    >
      <Box sx={{ height: '100%' }}>
        {!hidePuller && (
          <Box sx={{ height: 24 }}>
            <Puller />
          </Box>
        )}
        {header && (
          <>
            <Box p={2}>{header}</Box>
            {!hideDivider && <Divider sx={{ my: 2, borderColor: 'background.neutral' }} />}
          </>
        )}
        {children}
      </Box>
    </SwipeableDrawer>
  )
}
