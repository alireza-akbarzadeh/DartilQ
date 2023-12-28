import { Stack } from '@mui/material'

import { ConsignmentCardProps } from '../types'
import { ConsignmentCardHeader } from './ConsignmentCardHeader'
import { ConsignmentCardProducts } from './ConsignmentCardProducts'

export type ConsignmentCardProduct = {
  src?: string | null
  count?: number | null
  productId?: string | null
  productClassId?: string | null
  productName?: string | null
  slug?: string | null
  hsin?: string | null
}

export const ConsignmentCard = (props: ConsignmentCardProps) => {
  const {
    name,
    texts,
    products,
    cargoId,
    partyId,
    shoppingCartId,
    hideCommentButton = false,
    hideHeader = false,
  } = props
  return (
    <Stack spacing={8}>
      {!hideHeader && (
        <ConsignmentCardHeader
          cargoId={cargoId ?? ''}
          hideCommentButton={hideCommentButton}
          name={name}
          partyId={partyId ?? ''}
          shoppingCartId={shoppingCartId ?? ''}
          spacing={8}
          texts={texts}
        />
      )}

      {products.length > 0 && <ConsignmentCardProducts items={products} />}
    </Stack>
  )
}
