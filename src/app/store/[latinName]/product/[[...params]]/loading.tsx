import { CircularProgress, Skeleton, Stack } from '@mui/material'

import { AppTopBar } from '@/shared/layout'

const Loading = () => {
  return (
    <Stack>
      <AppTopBar>
        <Skeleton variant="rectangular" width={177} height={25} sx={{ borderRadius: 10.5 }} />
      </AppTopBar>
      <Stack sx={{ height: '100dvh' }} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    </Stack>
  )
}

export default Loading
