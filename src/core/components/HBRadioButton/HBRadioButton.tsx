import { Box, Radio, RadioProps, Stack } from '@mui/material'
import { ReactNode } from 'react'

import { HBSelectedRadio, HBUnSelectedRadio } from './HBRadioButton.styles'

export type HBRadioButtonProps = Omit<RadioProps, 'ref' | 'title'> & {
  discription?: string | ReactNode
  title: string | ReactNode
}

export const HBRadioButton = (props: HBRadioButtonProps) => {
  const { title, discription, ...otherProps } = props
  return (
    <Stack direction="column">
      <Stack alignItems="center" direction="row" spacing={1}>
        <Radio {...otherProps} checkedIcon={<HBSelectedRadio />} icon={<HBUnSelectedRadio />} />
        <Box sx={{ width: '100%' }}>{title}</Box>
      </Stack>
      <Box>{discription}</Box>
    </Stack>
  )
}

HBRadioButton.displayName = 'HBRadioButton'
