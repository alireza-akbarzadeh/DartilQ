import { IconTypes } from './HBIcon.data'

type HBIconType = (typeof IconTypes)[number]

type IconSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'

export type { HBIconType, IconSize }
