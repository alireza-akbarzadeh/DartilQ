import { Box, Stack, Typography } from '@mui/material'
import { CSSProperties, FC } from 'react'

export const TextWithColor: FC<{ color: CSSProperties['backgroundColor']; text: string }> = ({ color, text }) => (
  <Stack alignItems="center" direction="row" spacing={1}>
    <Box
      sx={{
        borderRadius: '100%',
        border: theme => `1px solid ${theme.palette.grey[100]}`,
        width: 16,
        height: 16,
        backgroundColor: color,
      }}
    />

    <Typography variant="subtitle2">{text}</Typography>
  </Stack>
)
