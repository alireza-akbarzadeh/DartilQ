import { Box, Typography } from '@mui/material'

import { HBButton, HBIcon } from '@/core/components'

interface HeaderProps {
  title: string
  onClick: () => void
}

export const Header = ({ onClick, title }: HeaderProps) => {
  return (
    <Box display="flex" alignItems="center" height={56} borderBottom="1px solid" borderColor="border.lightest">
      <HBButton onClick={onClick}>
        <HBIcon name="angleRight" sx={{ color: 'textAndIcon.darker' }} />
      </HBButton>
      <Typography variant="titleMedium" color="textAndIcon.darker">
        {title}
      </Typography>
    </Box>
  )
}
