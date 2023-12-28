import { Box, styled } from '@mui/material'

import { useScale } from '@/shared/hooks/useScale'

type RoundedBoxContainerStyleProps = {
  size: number
  total: number
  animation: 'true' | 'false'
  duration?: number
}

export const RoundedBoxContainerRootStyle = styled(Box)<RoundedBoxContainerStyleProps>(({
  size,
  total,
  animation,
  duration,
}) => {
  const scale = useScale()
  return {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    paddingRight: total > 4 ? scale(48) : 0,
    '& .round-box-container': {
      width: size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: scale(8),
      paddingLeft: scale(5),
      paddingRight: scale(5),
      paddingTop: scale(10),
      '& .hb-round-box-background': {},
    },
    '& .round-box-circle-container': {
      width: size,
      height: size,
      borderRadius: '51%',
      position: 'relative',
      '& .round-box': {
        position: 'absolute',
        top: '51%',
        left: '51%',
        margin: `${scale(-35)}px`,
        animationDuration: animation === 'true' ? `${duration}ms` : '',
      },
      '& .deg-0': {
        zIndex: 10,
      },
      '& .deg-5': {
        transform: `rotate(6deg) translate(${size / 3}px) rotate(-6deg)`,
        animationName: animation === 'true' ? 'animation-deg-5' : '',
      },
      '& .deg-45': {
        transform: `rotate(46deg) translate(${size / 3}px) rotate(-46deg)`,
        animationName: animation === 'true' ? 'animation-deg-45' : '',
      },
      '& .deg-50': {
        transform: `rotate(51deg) translate(${size / 3}px) rotate(-51deg)`,
        animationName: animation === 'true' ? 'animation-deg-50' : '',
      },
      '& .deg-65': {
        transform: `rotate(66deg) translate(${size / 3}px) rotate(-66deg)`,
        animationName: animation === 'true' ? 'animation-deg-65' : '',
      },
      '& .deg-125': {
        transform: `rotate(126deg) translate(${size / 3}px) rotate(-126deg)`,
        animationName: animation === 'true' ? 'animation-deg-125' : '',
      },
      '& .deg-135': {
        transform: `rotate(136deg) translate(${size / 3}px) rotate(-136deg)`,
        animationName: animation === 'true' ? 'animation-deg-135' : '',
      },
      '& .deg-185': {
        transform: `rotate(186deg) translate(${size / 3}px) rotate(-186deg)`,
        animationName: animation === 'true' ? 'animation-deg-185' : '',
      },
      '& .deg-200': {
        transform: `rotate(201deg) translate(${size / 3}px) rotate(-201deg)`,
        animationName: animation === 'true' ? 'animation-deg-200' : '',
      },
      '& .deg-225': {
        transform: `rotate(226deg) translate(${size / 3}px) rotate(-226deg)`,
        animationName: animation === 'true' ? 'animation-deg-225' : '',
      },
      '& .deg-245': {
        transform: `rotate(246deg) translate(${size / 3}px) rotate(-246deg)`,
        animationName: animation === 'true' ? 'animation-deg-245' : '',
      },
      '& .deg-270': {
        transform: `rotate(271deg) translate(${size / 3}px) rotate(-271deg)`,
        animationName: animation === 'true' ? 'animation-deg-270' : '',
      },
      '& .deg-305': {
        transform: `rotate(306deg) translate(${size / 3}px) rotate(-306deg)`,
        animationName: animation === 'true' ? 'animation-deg-305' : '',
      },
      '& .deg-315': {
        transform: `rotate(316deg) translate(${size / 3}px) rotate(-316deg)`,
        animationName: animation === 'true' ? 'animation-deg-315' : '',
      },
      '& .deg-340': {
        transform: `rotate(341deg) translate(${size / 3}px) rotate(-341deg)`,
        animationName: animation === 'true' ? 'animation-deg-340' : '',
      },
      '@keyframes animation-deg-5': {
        '0%': { transform: `rotate(245deg) translate(0px) rotate(-245deg)` },
        '25%': { transform: `rotate(245deg) translate(0px) rotate(-245deg)` },
        '50%': { transform: `rotate(245deg) translate(${size / 3}px) rotate(-245deg)` },
        '100%': { transform: `rotate(366deg) translate(${size / 3}px) rotate(-366deg)` },
      },
      '@keyframes animation-deg-45': {
        '0%': { transform: `rotate(225deg) translate(0px) rotate(-225deg)` },
        '25%': { transform: `rotate(225deg) translate(0px) rotate(-225deg)` },
        '50%': { transform: `rotate(225deg) translate(${size / 3}px) rotate(-225deg)` },
        '100%': { transform: `rotate(405deg) translate(${size / 3}px) rotate(-405deg)` },
      },
      '@keyframes animation-deg-50': {
        '0%': { transform: `rotate(270deg) translate(0px) rotate(-270deg)` },
        '25%': { transform: `rotate(270deg) translate(0px) rotate(-270deg)` },
        '50%': { transform: `rotate(270deg) translate(${size / 3}px) rotate(-270deg)` },
        '100%': { transform: `rotate(410deg) translate(${size / 3}px) rotate(-410deg)` },
      },
      '@keyframes animation-deg-65': {
        '0%': { transform: `rotate(305deg) translate(0px) rotate(-305deg)` },
        '25%': { transform: `rotate(305deg) translate(0px) rotate(-305deg)` },
        '50%': { transform: `rotate(305deg) translate(${size / 3}px) rotate(-305deg)` },
        '100%': { transform: `rotate(426deg) translate(${size / 3}px) rotate(-426deg)` },
      },
      '@keyframes animation-deg-125': {
        '0%': { transform: `rotate(6deg) translate(0px) rotate(-6deg)` },
        '25%': { transform: `rotate(6deg) translate(0px) rotate(-6deg)` },
        '50%': { transform: `rotate(6deg) translate(${size / 3}px) rotate(-6deg)` },
        '100%': { transform: `rotate(126deg) translate(${size / 3}px) rotate(-126deg)` },
      },
      '@keyframes animation-deg-135': {
        '0%': { transform: `rotate(340deg) translate(0px) rotate(-340deg)` },
        '25%': { transform: `rotate(340deg) translate(0px) rotate(-340deg)` },
        '50%': { transform: `rotate(340deg) translate(${size / 3}px) rotate(-340deg)` },
        '100%': { transform: `rotate(495deg) translate(${size / 3}px) rotate(-495deg)` },
      },
      '@keyframes animation-deg-185': {
        '0%': { transform: `rotate(66deg) translate(0px) rotate(-66deg)` },
        '25%': { transform: `rotate(66deg) translate(0px) rotate(-66deg)` },
        '50%': { transform: `rotate(66deg) translate(${size / 3}px) rotate(-66deg)` },
        '100%': { transform: `rotate(186deg) translate(${size / 3}px) rotate(-186deg)` },
      },
      '@keyframes animation-deg-200': {
        '0%': { transform: `rotate(50deg) translate(0px) rotate(-50deg)` },
        '25%': { transform: `rotate(50deg) translate(0px) rotate(-50deg)` },
        '50%': { transform: `rotate(50deg) translate(${size / 3}px) rotate(-50deg)` },
        '100%': { transform: `rotate(201deg) translate(${size / 3}px) rotate(-201deg)` },
      },
      '@keyframes animation-deg-225': {
        '0%': { transform: `rotate(45deg) translate(0px) rotate(-45deg)` },
        '25%': { transform: `rotate(45deg) translate(0px) rotate(-45deg)` },
        '50%': { transform: `rotate(45deg) translate(${size / 3}px) rotate(-45deg)` },
        '100%': { transform: `rotate(226deg) translate(${size / 3}px) rotate(-226deg)` },
      },
      '@keyframes animation-deg-245': {
        '0%': { transform: `rotate(126deg) translate(0px) rotate(-126deg)` },
        '25%': { transform: `rotate(126deg) translate(0px) rotate(-126deg)` },
        '50%': { transform: `rotate(126deg) translate(${size / 3}px) rotate(-126deg)` },
        '100%': { transform: `rotate(246deg) translate(${size / 3}px) rotate(-246deg)` },
      },
      '@keyframes animation-deg-270': {
        '0%': { transform: `rotate(135deg) translate(0px) rotate(-135deg)` },
        '25%': { transform: `rotate(135deg) translate(0px) rotate(-135deg)` },
        '50%': { transform: `rotate(135deg) translate(${size / 3}px) rotate(-135deg)` },
        '100%': { transform: `rotate(271deg) translate(${size / 3}px) rotate(-271deg)` },
      },
      '@keyframes animation-deg-305': {
        '0%': { transform: `rotate(186deg) translate(0px) rotate(-186deg)` },
        '25%': { transform: `rotate(186deg) translate(0px) rotate(-186deg)` },
        '50%': { transform: `rotate(186deg) translate(${size / 3}px) rotate(-186deg)` },
        '100%': { transform: `rotate(306deg) translate(${size / 3}px) rotate(-306deg)` },
      },
      '@keyframes animation-deg-315': {
        '0%': { transform: `rotate(135deg) translate(0px) rotate(-135deg)` },
        '25%': { transform: `rotate(135deg) translate(0px) rotate(-135deg)` },
        '50%': { transform: `rotate(135deg) translate(${size / 3}px) rotate(-135deg)` },
        '100%': { transform: `rotate(316deg) translate(${size / 3}px) rotate(-316deg)` },
      },
      '@keyframes animation-deg-340': {
        '0%': { transform: `rotate(200deg) translate(0px) rotate(-200deg)` },
        '25%': { transform: `rotate(200deg) translate(0px) rotate(-200deg)` },
        '50%': { transform: `rotate(200deg) translate(${size / 3}px) rotate(-200deg)` },
        '100%': { transform: `rotate(341deg) translate(${size / 3}px) rotate(-341deg)` },
      },
    },
  }
})
