import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { HBBottomSheet, HBButton, HBIcon } from '@/core/components'
import { useGetWebLocalityIranProvinceLatinTitle as getCitiesByLatinName } from '@/services/locality-services/locality'

type Props = {
  isHide: boolean
  cityId?: string
  provinceId?: string
  onChange?: (location: string) => void
}

const CitySelect = (props: Props) => {
  const { isHide, cityId, onChange } = props
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const { data: citiesData, isLoading } = getCitiesByLatinName('Tehran')
  const selectedCity = citiesData?.data?.items?.find(
    item => cityId === item.id || item.latinTitle === 'TehranCity' || item.code === 'tr',
  )

  const handleChoose = (lat: number, lng: number) => {
    onChange?.(`${lat},${lng}`)
    setOpenBottomSheet(false)
  }

  useEffect(() => {
    if (citiesData?.success && citiesData.data?.totalItems === 0) toast.error('در استان Tehran شهری یافت نشد')
  }, [citiesData])

  return (
    <>
      <HBButton
        loading={isLoading}
        sx={{
          border: 'none',
          transition: 'max-width 0.1s ease,padding 0.1s linear,opacity 0.1s linear',
          borderRadius: theme => theme.spacing(2, 0, 0, 2),
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          px: 4,
          '&:focus': {
            outline: 'none',
          },
          ...(isHide && { maxWidth: 0, p: 0, opacity: 0 }),
        }}
        size="small"
        onClick={() => setOpenBottomSheet(true)}
        variant="neutral1"
      >
        {selectedCity?.title}
      </HBButton>
      {openBottomSheet && (
        <HBBottomSheet
          height={300}
          hideDivider
          hidePuller
          header={
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, pt: 4 }}>
              <Typography variant="titleMedium" color="textAndIcon.darker">
                انتخاب شهر{' '}
                <Typography variant="titleMedium" color="textAndIcon.light">
                  (استان تهران)
                </Typography>
              </Typography>
              <HBIcon
                onClick={() => setOpenBottomSheet(false)}
                name="timesCircle"
                sx={{ cursor: 'pointer', userSelect: 'none', color: 'textAndIcon.light' }}
              />
            </Stack>
          }
          onClose={() => setOpenBottomSheet(false)}
          open
        >
          <List sx={{ height: 'calc(100% - 36px)', overflowY: 'auto' }}>
            {citiesData?.data?.items?.map(city => (
              <ListItem key={city.id} disablePadding>
                <ListItemButton onClick={() => handleChoose(city.lat ?? 0, city.lng ?? 0)} sx={{ p: 3 }}>
                  {selectedCity?.id === city.id && (
                    <ListItemIcon sx={{ minWidth: 'fit-content', mr: 3 }}>
                      <HBIcon sx={{ color: 'primary.main' }} name="check" size="small" />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={city.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </HBBottomSheet>
      )}
    </>
  )
}

export { CitySelect }
