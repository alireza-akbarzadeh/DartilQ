'use client'

import { Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { HBBottomSheet, HBIcon, HBNextImage } from '@/core/components'
import { CategoryCardStyle, CategoryWrapperStyle } from '@/domains/store/store.styles'
import { CategoryStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

interface StoreCategoryProps {
  data?: CategoryStoreView[] | null
}

const SHOW_ITEM_COUNT = 6

export const StoreCategorySection = (props: StoreCategoryProps) => {
  const { data } = props
  const { push } = useRouter()
  const params = useParams<{ latinName: string }>()

  const [showMore, setShowMore] = useState(false)

  const { finalData, numbordernthchild } = useMemo(() => {
    if ((data?.length || 0) > SHOW_ITEM_COUNT)
      return { finalData: data?.slice(0, SHOW_ITEM_COUNT - 1), numbordernthchild: 3 }
    return { finalData: data, numbordernthchild: ((data?.length || 0) & 1) === 1 ? 2 : 3 }
  }, [data])

  return (
    <>
      <CategoryWrapperStyle mt={4} numbordernthchild={numbordernthchild}>
        {finalData?.map(category => (
          <CategoryCardStyle
            key={category.id}
            onClick={() =>
              push(
                `/store/${params.latinName}/category/${category.latinName || 'offer'}#${
                  category?.children?.[0]?.latinName || ''
                }`,
              )
            }
          >
            <HBNextImage src={category.iconPath || ''} alt={category.name || ''} width={40} height={40} />
            <Typography
              variant="labelMedium"
              color="textAndIcon.darker"
              ml={4}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textWrap: 'nowrap',
              }}
            >
              {category.name}
            </Typography>
          </CategoryCardStyle>
        ))}
        {(data?.length || 0) > SHOW_ITEM_COUNT && (
          <CategoryCardStyle onClick={() => setShowMore(true)}>
            <HBIcon
              name="ellipsisH"
              size="large"
              sx={{ color: 'info.dark', width: 40, height: 40, justifyContent: 'center' }}
            />
            <Typography
              variant="labelMedium"
              color="textAndIcon.darker"
              ml={4}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textWrap: 'nowrap',
              }}
            >
              بیشتر
            </Typography>
          </CategoryCardStyle>
        )}
      </CategoryWrapperStyle>
      {showMore && (
        <HBBottomSheet open onClose={() => setShowMore(false)}>
          <CategoryWrapperStyle
            maxHeight={'70dvh'}
            sx={{ overflow: 'auto' }}
            numbordernthchild={((data?.length || 0) & 1) === 1 ? 2 : 3}
          >
            {data?.map(category => (
              <CategoryCardStyle
                key={category.id}
                onClick={() =>
                  push(
                    `/store/${params.latinName}/category/${category.latinName || category.id}#${
                      category?.children?.[0]?.latinName || category?.children?.[0]?.id
                    }`,
                  )
                }
              >
                <HBNextImage src={category.iconPath || ''} alt={category.name || ''} width={40} height={40} />
                <Typography
                  variant="labelMedium"
                  color="textAndIcon.darker"
                  ml={4}
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    textWrap: 'nowrap',
                  }}
                >
                  {category.name}
                </Typography>
              </CategoryCardStyle>
            ))}
          </CategoryWrapperStyle>
        </HBBottomSheet>
      )}
    </>
  )
}
