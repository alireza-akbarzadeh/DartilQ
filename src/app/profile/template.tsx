import { Box } from '@mui/material'

const Template = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Box minHeight={'100dvh'} bgcolor="common.white">
      {children}
    </Box>
  )
}

export default Template
