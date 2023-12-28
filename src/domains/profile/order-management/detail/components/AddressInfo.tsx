import { Box, Stack, styled, Typography } from '@mui/material'
import { FC } from 'react'

import { HBIcon, HBIconType } from '@/core/components'
const AddressInfoClasses = {
  iconWrapper: 'icon-wrapper',
  text: 'text',
}

const WrapperStyle = styled(Stack)(({ theme }) => ({
  [`& .${AddressInfoClasses.iconWrapper}`]: {
    color: theme.palette.grey[700],
  },
  [`& .${AddressInfoClasses.text}`]: {
    color: theme.palette.text.secondary,
  },
}))

const AddressInfo: FC<{ icon?: HBIconType; text: string; spacing?: number }> = ({ icon, text, spacing = 3 }) => (
  <WrapperStyle alignItems="flex-start" direction="row" spacing={spacing}>
    {icon && (
      <Box className={AddressInfoClasses.iconWrapper}>
        <HBIcon size="small" sx={{ display: 'flex' }} name={icon} />
      </Box>
    )}

    <Typography className={AddressInfoClasses.text} sx={{ userSelect: 'text' }} variant="subtitle2">
      {text}
    </Typography>
  </WrapperStyle>
)

export { AddressInfo, AddressInfoClasses }
