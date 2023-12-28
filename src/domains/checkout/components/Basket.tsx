import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { HBIcon, HBNextImage } from '@/core/components'
import { glyphy } from '@/core/utils'
import { Basket as BasketInfo } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type BasketProps = {
  basketInfo: BasketInfo | undefined
}

export const Basket = ({ basketInfo }: BasketProps): JSX.Element => {
  return (
    <Stack sx={{ gap: 4, px: 4 }}>
      <Stack sx={{ gap: 2 }}>
        {basketInfo?.basketItems?.map(basketItem => (
          <Box sx={{ display: 'flex', gap: 2 }} key={basketItem.id}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="bodyLarge">{basketItem.quantity}</Typography>
              <HBIcon name="multiply" size="xSmall" sx={{ fontSize: '12px', alignItems: 'start', pt: 1.5 }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'background.light',
                alignSelf: 'start',
                height: 53,
                minWidth: 53,
              }}
            >
              <HBNextImage alt="" width={48} height={48} src={basketItem?.imageUrl ?? ''} quality={100} />
            </Box>
            <Stack sx={{ gap: 2 }}>
              <Typography variant="titleSmall" color="textAndIcon.dark">
                {basketItem.productName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {basketItem.originalPrice !== basketItem.finalPrice && (
                  <Typography
                    variant="smallOverline"
                    color="textAndIcon.lighter"
                    sx={{ textDecorationLine: 'line-through' }}
                  >
                    {basketItem.originalPrice?.toLocaleString()}
                  </Typography>
                )}
                <Typography variant="labelMedium" color="textAndIcon.darker">
                  {basketItem.finalPrice?.toLocaleString()}
                </Typography>
                <Typography variant="labelSmall" color="textAndIcon.darker">
                  {glyphy(basketItem.currency)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Link href={`/store/${basketInfo?.latinName}`}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 2,
              pr: 3,
              pl: 2,
              borderRadius: 10,
              bgcolor: 'background.light',
              color: 'textAndIcon.darker',
              height: 40,
            }}
          >
            <HBIcon name="plusSquare" size="xSmall" />
            <Typography variant="bodySmall"> افزودن کالا</Typography>
          </Box>
        </Link>
      </Box>
    </Stack>
  )
}
