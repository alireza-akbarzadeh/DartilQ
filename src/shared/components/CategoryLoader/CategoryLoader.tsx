import { useTheme } from '@mui/material'

import { HBRoundedBox } from '@/core/components'
import { useScale } from '@/shared/hooks/useScale'

import { HBLoaderRootStyle } from './CategoryLoader.styles'

export const CategoryLoader = () => {
  const { palette } = useTheme()
  const scale = useScale()
  return (
    <HBLoaderRootStyle>
      <HBRoundedBox
        border={{ width: scale(2), color: palette.primary.dark }}
        shadowSx={{ bgcolor: 'primary.dark', opacity: 0.4 }}
        size={scale(114)}
        sx={{
          bgcolor: 'common.white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="rounded-box-Loader"
      />
    </HBLoaderRootStyle>
  )
}
