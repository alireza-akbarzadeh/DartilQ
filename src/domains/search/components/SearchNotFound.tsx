import { Stack, Typography } from '@mui/material'

import { HBNextImage } from '@/core/components'

const SearchNotFound = () => {
  return (
    <Stack alignItems="center" justifyContent="center" gap={4} mt={45}>
      <HBNextImage alt="" width={144} height={105} isLocal src="/assets/svg/no-result.svg" />
      <Typography variant="subtitle2">برای جستجوی شما نتیجه‌ای یافت نشد!</Typography>
    </Stack>
  )
}

export { SearchNotFound }
