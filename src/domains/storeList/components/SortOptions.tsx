'use client'

import { Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { HBBottomSheet, HBButton, HBNextImage } from '@/core/components'
import {
  CategoryGroupedStoreList,
  SortOption,
  SortOptionList,
} from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

interface SortOptionsProps {
  onClose: () => void
  categories?: CategoryGroupedStoreList[] | null
  options?: SortOptionList[] | null
  categoryIdActive?: string | null
  sort?: SortOption | null
  onSubmit: (categoryId?: string | null, sortOption?: SortOption | null) => void
}

export const SortOptions = (props: SortOptionsProps) => {
  const { categories, onClose, options, categoryIdActive, onSubmit, sort: sortProps } = props
  const [categoryId, setCategoryId] = useState(categoryIdActive)
  const [sort, setSort] = useState<SortOption | null | undefined>(sortProps)

  return (
    <HBBottomSheet open onClose={onClose}>
      <Stack px={4} pb={5}>
        <Typography variant="bodyLarge" color="textAndIcon.darker" mb={3}>
          مرتب‌سازی براساس
        </Typography>
        <Stack direction={'row'} spacing={2} mb={6}>
          {options?.map(sortItem => (
            <HBButton
              key={sortItem.title}
              variant="secondary"
              onClick={() => setSort(prev => (prev === sortItem.option ? undefined : sortItem.option))}
              sx={
                sortItem.option === sort
                  ? {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.lighter',
                      '&:focus': {
                        backgroundColor: 'primary.lighter',
                        outline: 'unset',
                      },
                    }
                  : {
                      color: 'textAndIcon.darker',
                      borderColor: 'border.lightest',
                    }
              }
              startIcon={
                sortItem.icon && (
                  <HBNextImage src={sortItem.icon || ''} alt={sortItem.title || ''} width={12} height={12} />
                )
              }
            >
              <Typography variant="bodySmall" color="textAndIcon.darker">
                {sortItem.title}
              </Typography>
            </HBButton>
          ))}
        </Stack>
        <Typography variant="bodyLarge" color="textAndIcon.darker" mb={3}>
          انتخاب دسته‌بندی
        </Typography>
        <Stack direction={'row'} flexWrap={'wrap'} spacing={2} mb={6} rowGap={2}>
          {categories?.map(category => (
            <HBButton
              key={category.id}
              variant="secondary"
              onClick={() => setCategoryId(category.id)}
              sx={
                category.id === categoryId
                  ? {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      backgroundColor: 'primary.lighter',
                      '&:focus': {
                        backgroundColor: 'primary.lighter',
                        outline: 'unset',
                      },
                    }
                  : {
                      color: 'textAndIcon.darker',
                      borderColor: 'border.lightest',
                    }
              }
            >
              <Typography variant="bodySmall" color="textAndIcon.darker">
                {category.name}
              </Typography>
            </HBButton>
          ))}
        </Stack>
        <HBButton variant="primary" onClick={() => onSubmit(categoryId, sort)}>
          تایید
        </HBButton>
      </Stack>
    </HBBottomSheet>
  )
}
