import { Box, Divider, Grid, Stack, Typography } from '@mui/material'

import { useProduct } from '../hooks'

const ProductAttributes = () => {
  const { activeProduct } = useProduct()
  const { attributes } = { ...activeProduct }
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ color: 'textAndIcon.darker' }}>
        مشخصات کالا
      </Typography>
      {attributes?.map((attribute, index) => (
        <Stack key={`attribute-${index}`} spacing={2}>
          <Box sx={{ flexShrink: 1 }}>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: 'textAndIcon.dark' }}>
                  {attribute.name}
                </Typography>
              </Grid>
              <Grid container item xs={6} sx={{ justifyContent: 'flex-end' }}>
                <Typography variant="overline" sx={{ color: 'textAndIcon.dark' }}>
                  {attribute.name}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {index !== attributes.length - 1 && <Divider sx={{ borderColor: 'border.lightest' }} />}
        </Stack>
      ))}
    </Stack>
  )
}

export { ProductAttributes }
