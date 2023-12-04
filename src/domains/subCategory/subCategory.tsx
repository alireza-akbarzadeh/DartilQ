'use client'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { HBBottomSheet, HBIcon, HBNextImage } from '@/core/components'
import { useGetCategoryCategories } from '@/services/Qcommerce Bff-services/Qcommerce Bff'
//TODO fixed the /shared/componets name
import { RoundedBoxContainer } from '@/shared/componets/RoundedBoxContainer'

type CategoryProps = {
  categoryId: string
  categoryName: string
}

export const SubCategory = ({ categoryId, categoryName }: CategoryProps): JSX.Element => {
  const { push } = useRouter()
  const { data: userSession } = useSession()
  const [open, setOpen] = useState<boolean>(false)
  const defaultAddress = userSession?.user.address
  const { data: { data: { categories: categoriesData = [] } = {} } = {} } = useGetCategoryCategories(
    {
      Latitude: defaultAddress?.latitude,
      Longitude: defaultAddress?.longitude,
      CityId: defaultAddress?.cityId,
      ParentCategoryId: categoryId,
    },
    { query: { enabled: !!defaultAddress?.latitude } },
  )

  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'primary.main',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              color: 'textAndIcon.lightest',
              px: 4,
              py: 1.5,
              height: 56,
              width: '100%',
            }}
          >
            <HBIcon name="angleRight" onClick={() => push('/')} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                px: 4,
                py: 1.5,
                flex: '1 0 0',
                bgcolor: 'primary.dark',
                borderRadius: 37,
                height: 40,
              }}
            >
              <HBIcon name="searchAlt" />
              <Typography variant="labelMedium">جستجو فروشنده یا کالا...</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'primary.main',
          }}
        >
          <RoundedBoxContainer size={350} data={categoriesData ?? []} showAnimation={false}></RoundedBoxContainer>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'textAndIcon.lightest',
            height: 70,
            pt: 16,
            cursor: 'pointer',
          }}
        >
          <Typography variant="h5">{decodeURIComponent(categoryName)}</Typography>
        </Box>
        {(categoriesData?.length ?? 0) > 7 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 56,
              bgcolor: 'background.lightest',
              color: 'primary.main',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderRadius: '16px 16px 0 0',
            }}
            onClick={() => setOpen(true)}
          >
            <Typography variant="titleSmall">بیشتر</Typography>
          </Box>
        ) : null}
      </Box>
      <HBBottomSheet open={open} onClose={() => setOpen(false)} fullScreen hidePuller>
        <Box sx={{ display: 'flex', gap: 2, p: 4 }}>
          <HBIcon name="angleRight" size="large" onClick={() => setOpen(false)} />
          <Typography variant="titleLarge">{`همه دسته بندی های ${categoryName}`}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {categoriesData?.map((category, index) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                borderTop: 1,
                borderLeft: index % 2 ? 1 : 0,
                borderColor: 'background.light',
                width: '50%',
                py: 2,
                px: 4,
                cursor: 'pointer',
              }}
              onClick={() => push(`/category/${category.id}`)}
              key={category.id}
            >
              <HBNextImage alt="" height={40} src={category?.icon ?? ''} width={40} />
              <Typography variant="labelMedium">{category?.name}</Typography>
            </Box>
          ))}
        </Box>
      </HBBottomSheet>
    </>
  )
}
