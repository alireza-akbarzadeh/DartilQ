import { ThemeOptions } from '@mui/material'

import { breakpoints } from './breakpoints'
import { overrides } from './components'
import { defaultLightPalette as palette } from './defaultLightPalette'
import { typography } from './typography'

export const themeOptions: ThemeOptions = {
  direction: 'rtl',
  palette,
  typography,
  spacing: 4,
  breakpoints,
  shape: { borderRadius: 4 },
  components: overrides,
}
