import { FormControl, formLabelClasses, Select, styled } from '@mui/material'

export const HBSelectRootStyle = styled(Select)(() => ({
  display: 'flex',
}))

export const HBFormControlRootStyle = styled(FormControl)(() => ({
  minWidth: 160,
  [`& .${formLabelClasses.asterisk}`]: {
    fontFamily: 'arial',
  },
})) as typeof FormControl
export const HBHelperTextWrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.typography.caption.fontSize,
}))

export const HBHelperTextStyle = styled('span')(({ theme }) => ({
  margin: theme.spacing(1),
}))
