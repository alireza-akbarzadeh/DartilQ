import { Theme } from '@mui/material'

import { button, switchComponent, textField } from './overrides'

const overrides: Theme['components'] = {
  MuiButton: button,
  MuiTextField: textField,
  MuiSwitch: switchComponent,
}

export { overrides }
