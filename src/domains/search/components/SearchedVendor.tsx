import { Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { HBNextImage } from '@/core/components/HBNextImage/HBNextImage'
import { neutral } from '@/core/providers/material/theme'
import { StoreStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

type SearchedVendorProps = Pick<
  StoreStoreView,
  'name' | 'id' | 'finalExpressIcon' | 'finalExpressText' | 'imageUrl' | 'latinName'
> & {
  hasBorder?: boolean
}

const SearchedVendor = (props: SearchedVendorProps) => {
  const { latinName } = props
  return (
    <Link href={`/store/${latinName}`}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          ...(props.hasBorder && {
            border: `1px solid ${neutral[100]}`,
            p: 2,
            borderRadius: 4,
          }),
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: 3, overflow: 'hidden', height: 48, border: `1px solid ${neutral[200]}` }}
        >
          <HBNextImage alt="" src={props.imageUrl ?? ''} width={48} height={48} />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="labelLarge">{props.name}</Typography>
          <Stack
            direction="row"
            gap={1}
            sx={{ bgcolor: neutral[100], width: 'fit-content', borderRadius: 2, px: 2, py: '5px' }}
          >
            {props.finalExpressIcon && <HBNextImage alt="" src={props.finalExpressIcon} width={14} height={14} />}
            <Typography variant="labelSmall" color={neutral[600]}>
              {props.finalExpressText}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  )
}

export { SearchedVendor }
