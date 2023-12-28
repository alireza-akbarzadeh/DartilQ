'use client'

import { TabContext, TabPanel } from '@mui/lab'
import { Box, Divider, Stack, Tab, Tabs, tabsClasses, tabScrollButtonClasses, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'

import { HBButton, HBCarousel, HBIcon, HBNextImage } from '@/core/components'
import { StoreCategoryHeaderSkeleton } from '@/domains/store/storeCategory/components/StoreCategorySkeleton'
import { CategoryStoreView } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

interface StoreCategoryHeaderProps {
  title?: string | null
  isFetching: boolean
  categories?: CategoryStoreView[] | null
  subCategoryId: string
}

const StoreCategoryHeader = forwardRef<HTMLDivElement, StoreCategoryHeaderProps>((props, ref) => {
  const { isFetching, title, categories, subCategoryId } = props
  const { back, push, replace } = useRouter()
  const [isMobile, setIsMobile] = useState(navigator.userAgent.includes('Mobile'))
  const params = useParams<{ latinName: string; categoryLatinName: string }>()

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(navigator.userAgent.includes('Mobile'))
    }
    window.addEventListener('resize', handleResize)

    return () => removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" px={4} py={2}>
        <Box display="flex" alignItems="center">
          <HBIcon name="angleRight" size="small" sx={{ color: 'textAndIcon.darker' }} onClick={back} />
          <Typography variant="titleSmall" color="textAndIcon.darker" ml={2}>
            فروشگاه {title}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <HBButton size="small" onClick={() => push(`/store/${params.latinName}/search?name=${title}`)}>
            <HBIcon name="searchAlt" size="small" sx={{ color: 'textAndIcon.darker' }} />
          </HBButton>
          <HBButton size="small">
            <HBIcon name="shareAlt" size="small" sx={{ color: 'textAndIcon.darker' }} />
          </HBButton>
        </Stack>
      </Box>

      <Box py={2}>
        {isFetching ? (
          <StoreCategoryHeaderSkeleton />
        ) : (
          <Box ref={ref}>
            <Tabs
              value={`${params.categoryLatinName}`}
              variant="scrollable"
              onChange={(event, value) =>
                replace(`/store/${params.latinName}/category/${value}#${event.currentTarget.id}`)
              }
              scrollButtons={!isMobile}
              allowScrollButtonsMobile
              sx={{
                [`& span.${tabsClasses.indicator}`]: {
                  zIndex: 1,
                },
                [`& .${tabScrollButtonClasses.root}.Mui-disabled`]: {
                  opacity: 0.3,
                },
              }}
            >
              {categories?.map(category => (
                <Tab
                  key={category.id}
                  value={`${category.latinName || 'offer'}`}
                  id={category?.children?.[0]?.latinName || ''}
                  sx={{
                    minWidth: 'max-content',
                    px: 4,
                    py: 2,
                  }}
                  disableFocusRipple
                  label={
                    <Typography
                      component="div"
                      variant="labelMedium"
                      color={params.categoryLatinName === category.id ? 'textAndIcon.darker' : 'textAndIcon.light'}
                    >
                      {category.name || ''}
                    </Typography>
                  }
                />
              ))}
            </Tabs>
            <Divider sx={{ bgcolor: 'background.light', height: 2, borderWidth: 0, bottom: 2, position: 'relative' }} />
            <TabContext value={params.categoryLatinName}>
              {categories?.map(
                category =>
                  (category.children?.length || 0) > 1 && (
                    <TabPanel value={category.latinName || ''} key={category.id}>
                      <HBCarousel>
                        {category.children?.map(item => (
                          <Stack
                            alignItems="center"
                            key={item.id}
                            width={84}
                            mr={2}
                            spacing={0.5}
                            onClick={() => replace(`#${item.latinName}`)}
                          >
                            <Box
                              width={40}
                              height={40}
                              borderRadius={50}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              position="relative"
                              border={theme =>
                                subCategoryId === item.latinName ? `2px solid ${theme.palette.primary.dark}` : ''
                              }
                            >
                              <HBNextImage
                                fill
                                src={item.iconPath || ''}
                                alt={item.name || ''}
                                style={{ borderRadius: 50 }}
                              />
                            </Box>
                            <Typography
                              variant="labelMedium"
                              color={subCategoryId === item.id ? 'primary.dark' : 'textAndIcon.darker'}
                              sx={{
                                textWrap: 'nowrap',
                                width: 85,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                textAlign: 'center',
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Stack>
                        ))}
                      </HBCarousel>
                    </TabPanel>
                  ),
              )}
            </TabContext>
          </Box>
        )}
      </Box>
    </>
  )
})

StoreCategoryHeader.displayName = 'StoreCategoryHeader'

export { StoreCategoryHeader }
