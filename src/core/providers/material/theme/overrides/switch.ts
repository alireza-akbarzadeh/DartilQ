import { Components, switchClasses } from '@mui/material'

import { grey, neutral, primary } from '../colors'

type MuiSwitchType = Components['MuiSwitch']

const switchComponent: MuiSwitchType = {
  styleOverrides: {
    root: {
      width: 48,
      height: 24,
      padding: 0,
      [`& .${switchClasses.switchBase}`]: {
        margin: -7,
        transitionDuration: '300ms',
        [`&.${switchClasses.checked}`]: {
          marginLeft: -4,
          color: neutral[50],
          [`& + .${switchClasses.track}`]: {
            backgroundColor: primary[500],
            opacity: 1,
            border: 0,
          },
          [`&.Mui-disabled + .${switchClasses.track}`]: {
            opacity: 0.5,
            backgroundColor: primary[500],
          },
          [`&:hover + .${switchClasses.track}`]: {
            backgroundColor: primary[600],
          },
          [`&:focus + .${switchClasses.track}`]: {
            border: `2px solid ${primary[500]}`,
          },
        },
        [`&.Mui-focusVisible .${switchClasses.thumb}`]: {
          color: primary[500],
          border: `6px solid ${neutral[50]}`,
        },
        [`&.Mui-disabled .${switchClasses.thumb}`]: {
          color: grey[100],
        },
        [`&.Mui-disabled .${switchClasses.track}`]: {
          opacity: 0.5,
        },
      },
      [`& .${switchClasses.thumb}`]: {
        boxSizing: 'border-box',
        width: 20,
        height: 20,
      },
      [`& .${switchClasses.track}`]: {
        borderRadius: 16,
        backgroundColor: grey[300],
        opacity: 1,
      },
      [`&:hover .${switchClasses.track}`]: {
        backgroundColor: grey[500],
      },
      [`&:focus  .${switchClasses.track}`]: {
        border: `2px solid ${primary[500]}`,
      },
    },
  },
}

export { switchComponent }
