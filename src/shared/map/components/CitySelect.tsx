import { Stack, SwipeableDrawer, Typography } from '@mui/material'
import { useState } from 'react'

import { HBButton, HBIcon } from '@/core/components'
import { neutral } from '@/core/providers/material/theme'

const CitySelect = () => {
  const selectedCity = 'بیرمهنگام'
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  return (
    <>
      <HBButton onClick={() => setOpenBottomSheet(true)} variant="neutral1">
        {selectedCity}
      </HBButton>
      <SwipeableDrawer
        title="wfwevcwev"
        disableSwipeToOpen
        onOpen={() => setOpenBottomSheet(true)}
        anchor="bottom"
        open={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
      >
        <Stack sx={{ p: 4 }} spacing={6} direction="row">
          <Typography variant="subtitle1"></Typography>
          <HBIcon sx={{ color: neutral[600] }} name="timesCircle"></HBIcon>
        </Stack>
      </SwipeableDrawer>
    </>
  )
}

export { CitySelect }
