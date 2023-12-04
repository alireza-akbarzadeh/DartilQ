import { LoadingButton } from '@mui/lab'
import { ButtonProps } from '@mui/material'
import { forwardRef } from 'react'

type HBButtonProps = ButtonProps & {
  dataTestId?: string
  /* TODO (sahand): add loading prop after figma design completed*/
  loading?: boolean
}

const HBButton = forwardRef<HTMLButtonElement, HBButtonProps>((props, ref) => {
  return <LoadingButton ref={ref} {...props} {...(props.dataTestId && { 'data-test-id': props.dataTestId })} />
})

HBButton.displayName = 'HBButton'

export type { HBButtonProps }
export { HBButton }
