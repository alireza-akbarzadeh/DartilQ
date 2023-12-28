import { Stack, SxProps, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import Image from 'next/image'
import { FC, ReactNode, useState } from 'react'

export const TextWithIcon: FC<{
  icon?: ReactNode
  text?: string
  sx?: SxProps
  variant?: Variant
  size?: number
  spacing?: number
}> = ({ icon, text, sx, variant = 'subtitle2', size = 16, spacing = 1 }) => {
  const [baseIcon, setBaseIcon] = useState<string>(typeof icon === 'string' ? icon : '')
  return (
    <Stack alignItems="center" direction="row" {...{ spacing, sx }}>
      {icon && typeof icon === 'string' ? (
        <Image
          alt="icon"
          height={size}
          src={baseIcon}
          width={size}
          onError={() => {
            setBaseIcon('/assets/svg/attribute-default.svg')
          }}
        />
      ) : (
        icon
      )}

      {text && <Typography {...{ variant }}>{text}</Typography>}
    </Stack>
  )
}
