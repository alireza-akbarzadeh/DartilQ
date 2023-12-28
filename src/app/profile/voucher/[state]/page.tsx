import { Stack } from '@mui/material'

import { VoucherPage } from '@/domains/voucher'
import { StateType } from '@/domains/voucher/types'
import { AppBarHeight, AppTopBar } from '@/shared/layout'

const Page = ({ params }: { params: { state: StateType } }) => {
  return (
    <>
      <AppTopBar hasBackButton title="کدهای تخفیف" />
      <Stack sx={{ height: '100dvh', pt: `${AppBarHeight + 8}px` }}>
        <VoucherPage state={params.state} />
      </Stack>
    </>
  )
}

export default Page
