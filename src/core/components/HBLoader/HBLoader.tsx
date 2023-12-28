import { Box, Stack, SxProps, Theme, Typography } from '@mui/material'

import { HBLoaderRootStyle } from './HBLoader.styles'

type HBLoaderProps = {
  rootSx?: SxProps<Theme>
  circleSx?: SxProps<Theme>
  type?: 'default' | 'line'
}

const HBLoader = ({ rootSx, circleSx, type = 'default' }: HBLoaderProps) => {
  return (
    <Stack sx={{ gap: 4, alignItems: 'center' }}>
      <HBLoaderRootStyle
        sx={rootSx}
        width={type === 'default' ? 70 : 'unset'}
        height={type === 'default' ? 70 : 'unset'}
      >
        <Box>
          <Box className="circle circle-Delay1" sx={circleSx} />
        </Box>
        <Box>
          <Box className="circle circle-Delay2" sx={circleSx} />
        </Box>
        <Box>
          <Box className="circle circle-Delay1" sx={circleSx} />
        </Box>
        {type === 'default' && (
          <>
            <Box>
              <Box className="circle circle-Delay2" sx={circleSx} />
            </Box>
            <Box>
              <Box className="circle circle-Delay3" sx={circleSx}>
                {' '}
              </Box>
            </Box>
            <Box>
              <Box className="circle circle-Delay2" sx={circleSx} />
            </Box>
            <Box>
              <Box className="circle circle-Delay1" sx={circleSx} />
            </Box>
            <Box>
              <Box className="circle circle-Delay2" sx={circleSx} />
            </Box>
            <Box>
              <Box className="circle circle-Delay1" sx={circleSx} />
            </Box>
          </>
        )}
      </HBLoaderRootStyle>
      {type === 'default' && <Typography variant="labelLarge">منتظر بمانید ...</Typography>}
    </Stack>
  )
}

HBLoader.displayName = 'HBLoader'

export { HBLoader }
