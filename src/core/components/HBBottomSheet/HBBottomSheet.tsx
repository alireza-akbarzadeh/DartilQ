'use client'
import { backdropClasses, Box, Divider, styled, SwipeableDrawer } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import type { SxProps, Theme } from '@mui/material/styles'
import type { PropsWithChildren, ReactNode } from 'react'

type BottomSheetProps = {
  open: boolean
  onClose: () => void
  header?: ReactNode
  fullScreen?: boolean
  hidePuller?: boolean
  sx?: SxProps<Theme>
  height?: number | string
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
  const { open, onClose, children, header, fullScreen, hidePuller, sx, height } = props

  return (
    <SwipeableDrawer
      open={open}
      anchor="bottom"
      onClose={onClose}
      onOpen={() => undefined}
      disableSwipeToOpen
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
      <Box>
        {!hidePuller ? (
          <Box sx={{ height: 40 }}>
            <Puller />
          </Box>
        ) : (
          <Box mt={2} />
        )}
        {header && (
          <>
            <Box px={2}>{header}</Box>
            <Divider sx={{ my: 2, borderColor: 'background.neutral' }} />
          </>
        )}
        {children}
      </Box>
    </SwipeableDrawer>
  )
}
