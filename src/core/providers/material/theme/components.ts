import { Theme } from '@mui/material'

import { button, textField } from './overrides'

const overrides: Theme['components'] = {
  MuiButton: button,
  MuiTextField: textField,
}

export { overrides }
