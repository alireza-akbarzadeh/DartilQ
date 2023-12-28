import { Stack, Typography } from '@mui/material'

import { HBNextImage } from '@/core/components'

const NotFound = () => {
  return (
    <Stack sx={{ width: '100%', height: '100%' }} alignItems="center" justifyContent="center" rowGap={4}>
      <HBNextImage width={106} height={127} alt="" isLocal src="/assets/svg/not-found.svg" />
      <Typography variant="bodyMedium" color="textAndIcon.darker">
        نتیجه‌ای یافت نشد!
      </Typography>
    </Stack>
  )
}

export { NotFound }
