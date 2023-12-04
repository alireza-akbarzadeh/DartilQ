import { Box, Typography } from '@mui/material'

const Page = ({ params }: { params: { latinName: string } }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      {`Category: ${params.latinName}`}
      <Typography variant="titleLarge">کارگران مشغول کار هستن</Typography>
    </Box>
  )
}

export default Page
