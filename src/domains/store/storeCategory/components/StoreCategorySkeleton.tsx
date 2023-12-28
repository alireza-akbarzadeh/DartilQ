import { Divider, Skeleton, Stack } from '@mui/material'

export const StoreCategoryHeaderSkeleton = () => {
  return (
    <>
      <Stack direction="row" spacing={2} ml={2}>
        <Skeleton width={100} height={44} /> <Skeleton width={100} height={44} />
      </Stack>
      <Divider sx={{ borderColor: 'background.light' }} />
      <Stack ml={2} mt={2}>
        <Skeleton variant="circular" width={40} height={40} sx={{ ml: 2 }} />
        <Skeleton width={55} height={18} />
      </Stack>
    </>
  )
}
