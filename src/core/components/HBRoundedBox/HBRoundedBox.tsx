import { Box, SxProps, Theme } from '@mui/material'

import { HBRoundedBoxRootStyle } from './HBRoundedBox.styles'

type HBRoundedBoxProps = {
  dataTestId?: string
  size: number
  style?: React.CSSProperties
  sx?: SxProps<Theme>
  children?: React.ReactNode
  border?: {
    width: number
    color: string
  }
  onClick?: () => void
  shadowSx?: SxProps<Theme>
  className?: string
}

const HBRoundedBox = ({
  sx,
  style,
  size,
  border = { width: 0, color: '' },
  children,
  onClick,
  shadowSx,
  className,
  ...props
}: HBRoundedBoxProps): JSX.Element => {
  return (
    <HBRoundedBoxRootStyle {...{ size, border }} className={className}>
      <Box className="hb-round-box-shadow" sx={shadowSx} />
      <Box className="hb-round-box-border">
        <Box
          className="hb-round-box-background"
          {...{ sx, style, onClick }}
          {...(props.dataTestId && { 'data-test-id': props.dataTestId })}
        >
          {children}
        </Box>
      </Box>
    </HBRoundedBoxRootStyle>
  )
}

HBRoundedBox.displayName = 'HBRoundedBox'

export type { HBRoundedBoxProps }
export { HBRoundedBox }
