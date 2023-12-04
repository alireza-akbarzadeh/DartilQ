'use client'
import { SxProps, Theme } from '@mui/material'

import { HBIconType, IconSize } from '@/core/components/HBIcon/HBIcon.types'

import { Icons, IconTypes } from './HBIcon.data'
import { HBIconRootStyle } from './HBIcon.styles'

type HBIconProps = {
  size?: IconSize
  name: HBIconType
  style?: React.CSSProperties
  sx?: SxProps<Theme>
  onClick?: () => void
}

const HBIcon = ({ name, size = 'medium', onClick, ...props }: HBIconProps): JSX.Element => {
  return <HBIconRootStyle onClick={onClick} size={size} className={Icons[name]} {...props} />
}

export type { HBIconProps, HBIconType }
export { HBIcon, IconTypes }
