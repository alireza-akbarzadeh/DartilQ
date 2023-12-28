import { CheckboxProps } from '@mui/material'
import { ForwardedRef, forwardRef } from 'react'

import { HBCheckBoxCheckedStyle, HBCheckboxInput, HBCheckBoxUncheckedStyle } from './HBCheckBox.styles'

type HBCheckBoxProps = Omit<CheckboxProps, 'ref'>

const HBCheckBox = forwardRef(<T extends HTMLButtonElement>(props: CheckboxProps, ref: ForwardedRef<T>) => {
  return (
    <HBCheckboxInput
      disableRipple
      checkedIcon={<HBCheckBoxCheckedStyle />}
      icon={<HBCheckBoxUncheckedStyle />}
      ref={ref}
      {...props}
    />
  )
})

HBCheckBox.displayName = 'HBCheckBox'
HBCheckBox.defaultProps = {}

export type { HBCheckBoxProps }
export { HBCheckBox }
