import { Stack, StackProps, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { FC, ReactNode } from 'react'

import { HBIcon, HBIconProps, HBIconType } from '@/core/components'

interface TextWithHBIconProps extends StackProps, Pick<HBIconProps, 'size'> {
  iconType: HBIconType
  text: ReactNode
  textColor?: string
  iconColor?: string
  bold?: boolean
  customVariant?: Variant
}

export const TextWithHBIcon: FC<TextWithHBIconProps> = ({
  text,
  iconType,
  bold,
  spacing = 2,
  size = 'medium',
  customVariant = 'body2',
  iconColor = 'inherit',
  textColor = 'inherit',
  alignItems = 'center',
  direction = 'row',
  ...rest
}) => (
  <Stack {...{ direction, spacing, alignItems }} {...rest}>
    <HBIcon size={size} sx={{ color: iconColor }} name={iconType} />
    <Typography color={textColor} component="span" variant={customVariant} {...(bold && { fontWeight: 'bold' })}>
      {text}
    </Typography>
  </Stack>
)
