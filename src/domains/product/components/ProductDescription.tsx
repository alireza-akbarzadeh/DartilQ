import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'

import { HBButton } from '@/core/components'

import { useProduct } from '../hooks'

const ProductDescription = () => {
  const { product } = useProduct()
  const [showSeeMore, setShowSeeMore] = useState(false)
  const [seeMore, setSeeMore] = useState(false)
  const descriptionRef = useRef<HTMLSpanElement | null>(null)

  const canShowSeeMore = () => {
    if (descriptionRef.current) {
      const styles = window.getComputedStyle(descriptionRef.current)
      const lineHeight = parseInt(styles.getPropertyValue('line-height'))
      const height = descriptionRef.current.offsetHeight
      const countOfLines = Math.ceil(height / lineHeight)
      return countOfLines > 2
    }
  }

  useEffect(() => {
    setShowSeeMore(canShowSeeMore() ?? false)
  }, [descriptionRef.current, product?.introduce])

  const introduce = useMemo(() => {
    return product?.introduce?.replace(/<[^>]+>/g, '') ?? ''
  }, [product?.introduce])

  if (!product?.introduce) return

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        component={'div'}
        sx={{
          ...(!seeMore && {
            height: 56,
            overflow: 'hidden',
          }),
          '& > p': { margin: 0 },
        }}
        variant="bodyMedium"
        color="textAndIcon.dark"
        dangerouslySetInnerHTML={{ __html: introduce }}
      />

      <Typography
        sx={{ visibility: 'hidden', position: 'absolute', overflow: 'hidden', '& > p': { margin: 0 } }}
        component={'span'}
        variant="bodyMedium"
        color="textAndIcon.dark"
        ref={descriptionRef}
        dangerouslySetInnerHTML={{ __html: introduce }}
      />

      {showSeeMore && (
        <Stack
          spacing={1}
          sx={{
            ...(!seeMore && { position: 'absolute', bottom: 0, right: 0 }),
            bgcolor: 'background.lightest',
            justifyContent: 'flex-end',
          }}
          direction="row"
          alignItems="center"
        >
          {!seeMore && <Typography variant="bodyMedium">...</Typography>}
          <HBButton
            onClick={() => setSeeMore(prev => !prev)}
            variant="link"
            size="small"
            sx={{ p: 0, px: 1, height: 'auto' }}
          >
            {!seeMore ? 'مشاهده بیشتر' : 'مشاهده کمتر'}
          </HBButton>
        </Stack>
      )}
    </Box>
  )
}

export { ProductDescription }
