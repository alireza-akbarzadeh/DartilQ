import { Box, Radio, RadioProps, Stack } from '@mui/material'
import { ReactNode } from 'react'

import { HBIcon } from '../HBIcon/HBIcon'
import { HBSelectedCheckRadio, HBSelectedRadio, HBUnSelectedRadio } from './HBRadioButton.styles'

type HBRadioButtonProps = Omit<RadioProps, 'ref' | 'title'> & {
  description?: string | ReactNode
  title: string | ReactNode
  type?: 'circle' | 'check'
}

const HBRadioButton = (props: HBRadioButtonProps) => {
  const { title, description: description, type, ...otherProps } = props
  return (
    <Stack direction="column">
      <Stack alignItems="center" direction="row" spacing={1}>
        <Radio
          {...otherProps}
          checkedIcon={
            type === 'check' ? (
              <HBSelectedCheckRadio>
                <HBIcon name="check" sx={{ color: 'white' }} />
              </HBSelectedCheckRadio>
            ) : (
              <HBSelectedRadio />
            )
          }
          icon={<HBUnSelectedRadio />}
        />
        <Box sx={{ width: '100%' }}>{title}</Box>
      </Stack>
      <Box>{description}</Box>
    </Stack>
  )
}

HBRadioButton.defaultProps = { type: 'circle' }
HBRadioButton.displayName = 'HBRadioButton'

export type { HBRadioButtonProps }
export { HBRadioButton }
