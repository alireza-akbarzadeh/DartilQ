import { Stack, Typography } from '@mui/material'

import { HBNextImage } from '@/core/components/HBNextImage/HBNextImage'
import { neutral } from '@/core/providers/material/theme'
import { glyphy } from '@/core/utils'
import { ProductSearchView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type SearchCardProps = Pick<
  ProductSearchView,
  'currency' | 'originalPrice' | 'finalPrice' | 'imageUrl' | 'name' | 'discount'
>

const SearchCard = (props: SearchCardProps) => {
  return (
    <Stack spacing={2} alignItems="center" p={2} width={140}>
      <Stack sx={{ p: 2, position: 'relative' }}>
        {!!props.discount && (
          <Stack
            alignItems="center"
            sx={{
              position: 'absolute',
              top: 0,
              left: 8,
              border: `1px solid ${neutral[100]}`,
              borderRadius: theme => theme.spacing(0, 0, 1, 1),
              bgcolor: 'primary.main',
              height: 20,
              minWidth: 28,
            }}
          >
            <Typography variant="overline" color="common.white">
              {props.discount}%
            </Typography>
          </Stack>
        )}
        <HBNextImage width={124} height={124} src={props.imageUrl ?? ''} alt="" />
      </Stack>
      <Stack sx={{ width: '100%' }}>
        <Typography
          variant="bodySmall"
          color={neutral[800]}
          sx={{
            minHeight: 36,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {props.name}
        </Typography>
        <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="flex-end">
          {props.originalPrice && (
            <Typography
              variant="labelSmall"
              color={neutral[600]}
              sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: neutral[600],
                  transform: 'rotate(-11deg)',
                },
              }}
            >
              {props.originalPrice}
            </Typography>
          )}
          <Typography variant="bodyLarge" color={neutral[800]}>
            {props.finalPrice}
          </Typography>
          <Typography variant="bodyLarge" fontSize="7px">
            {glyphy(props.currency)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export { SearchCard }
