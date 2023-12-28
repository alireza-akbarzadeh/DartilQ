import { Box, ButtonBase, Stack, Typography, useTheme } from '@mui/material'
import { useSpring } from '@react-spring/web'
import { animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRef, useState } from 'react'

import { HBIcon, HBNextImage } from '@/core/components'
import { glyphy } from '@/core/utils'
import { BasketItem } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

const handleNegativeMovement = (xMovement: number, isDown: boolean) => {
  if (isDown) return xMovement
  if (xMovement < -30 && !isDown) return -60
  if (xMovement > -30 && !isDown) return 0
}

type PropsType = {
  onRemoved: (id: string) => void
} & BasketItem

const BasketItem = (props: PropsType) => {
  const { onRemoved, productName, currency, originalPrice, finalPrice, quantity, imageUrl, productId } = props
  const { palette } = useTheme()
  const [{ x }, api] = useSpring(() => ({ x: 0 }))
  const currentPosition = useRef(0)
  const [hasDragged, setHasDragged] = useState(false)

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      if (mx < 0 && currentPosition.current !== -60) {
        const x = handleNegativeMovement(mx, down)
        currentPosition.current = x ?? 0
        if (currentPosition.current < 0) {
          setHasDragged(true)
        } else {
          setHasDragged(false)
        }
        api.start({ x })
      }
      if (mx > 0 && currentPosition.current < 0) {
        if (!down) {
          currentPosition.current = 0
          api.start({ x: 0 })
          setHasDragged(false)
        } else {
          const x = -60 + mx
          if (x >= 0) {
            api.start({ x: 0 })
            currentPosition.current = 0
            setHasDragged(false)
          } else {
            api.start({ x })
            currentPosition.current = x
          }
        }
      }
    },
    { axis: 'x' },
  )

  const handleRemove = () => {
    onRemoved(productId ?? '')
    api.start({ x: 0 })
    setHasDragged(false)
    currentPosition.current = 0
  }

  return (
    <Box sx={{ position: 'relative', bgcolor: 'error.main' }}>
      <ButtonBase onClick={handleRemove} sx={{ position: 'absolute', height: '100%', pr: 4.5, pl: 5 }}>
        <HBIcon size="small" sx={{ color: 'background.lightest' }} name="trashAlt" />
      </ButtonBase>
      <animated.div
        {...bind()}
        style={{ x, userSelect: 'none', touchAction: 'none', backgroundColor: palette.background.lightest }}
      >
        <Stack
          sx={{
            ...(hasDragged && { borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }),
            bgcolor: 'background.lightest',
            px: 4,
            py: 2,
            position: 'relative',
            zIndex: 1,
          }}
          direction="row"
          spacing={2}
        >
          <Stack alignItems="flex-start" direction="row" gap={1}>
            <Typography variant="bodyLarge">{quantity}</Typography>
            <HBIcon sx={{ mt: '5px' }} name="multiply" size="xSmall" />
          </Stack>
          <Stack
            sx={{
              borderRadius: 2,
              border: theme => `1px solid ${theme.palette.background.light}`,
              overflow: 'hidden',
            }}
          >
            <HBNextImage draggable={false} alt="" width={48} height={48} src={imageUrl ?? ''} />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="labelMedium">{productName}</Typography>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              {originalPrice !== finalPrice && (
                <Typography
                  variant="labelSmall"
                  color="textAndIcon.light"
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      right: 0,
                      height: '1px',
                      bgcolor: 'textAndIcon.light',
                      transform: 'rotate(-11deg)',
                    },
                  }}
                >
                  {originalPrice?.toLocaleString()}
                </Typography>
              )}

              <Typography variant="labelMedium">{finalPrice?.toLocaleString()}</Typography>
              <Typography variant="labelMedium">{glyphy(currency)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </animated.div>
    </Box>
  )
}

export { BasketItem }
