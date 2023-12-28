'use client'
import { Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { HBButton, HBCarousel, HBIcon, HBNextImage } from '@/core/components'
import { CategoryGroupedStoreList } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'
import { useWindowScrollPosition } from '@/shared/hooks/useWindowScrollPosition'

interface StoreListHeaderProps {
  loading: boolean
  filterOnClick: () => void
  data?: CategoryGroupedStoreList[] | null
  categoryOnClick: (id?: string | null) => void
  categoryActive?: string | null
  title: string
  hasFilter?: boolean
}

export const StoreListHeader = (props: StoreListHeaderProps) => {
  const { filterOnClick, loading, data, categoryOnClick, categoryActive, title, hasFilter } = props
  const { back, push } = useRouter()
  const windowPosition = useWindowScrollPosition(300)

  const showImageCategory = useMemo(() => windowPosition.y < 300, [windowPosition.y])
  return (
    <Stack
      mb={4}
      borderBottom={showImageCategory ? '1px solid' : ''}
      borderColor="border.lightest"
      position={'sticky'}
      top={0}
      zIndex={90}
      bgcolor="background.paper"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={2}>
        <Box display="flex" alignItems="center" py={2}>
          <HBButton size="small" onClick={() => back()}>
            <HBIcon name="angleRight" sx={{ color: 'textAndIcon.darker' }} size="medium" />
          </HBButton>
          <Typography variant="titleMedium" color="textAndIcon.darker">
            {title}
          </Typography>
        </Box>
        <HBButton size="small" onClick={() => push('/search')}>
          <HBIcon name="searchAlt" sx={{ color: 'textAndIcon.darker' }} size="medium" />
        </HBButton>
      </Box>
      {!loading && (
        <Box pt={2} pb={!showImageCategory ? 0 : 2} display="flex" pl={4}>
          <Stack alignItems="center" mr={3} spacing={0.5} onClick={filterOnClick}>
            <Box
              bgcolor={hasFilter ? 'primary.lighter' : 'background.light'}
              width={40}
              height={40}
              borderRadius={50}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <HBIcon
                name="slidersVAlt"
                size="medium"
                sx={{ color: hasFilter ? 'primary.main' : 'textAndIcon.darker' }}
              />
              {hasFilter && (
                <Box
                  bgcolor="error.main"
                  width={12}
                  height={12}
                  position="absolute"
                  top={6}
                  right={6}
                  borderRadius={50}
                />
              )}
            </Box>

            {showImageCategory && (
              <Typography variant="labelMedium" color="textAndIcon.darker">
                فیلتر
              </Typography>
            )}
          </Stack>
          <Box width="calc(100% - 56px)">
            {(data?.length || 0) > 1 && (
              <HBCarousel>
                {data?.map(item => (
                  <Stack
                    alignItems="center"
                    key={item.id}
                    width={84}
                    mr={2}
                    spacing={0.5}
                    onClick={() => categoryOnClick(item.id)}
                  >
                    {showImageCategory && (
                      <Box
                        width={40}
                        height={40}
                        borderRadius={50}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        border={theme => (categoryActive === item.id ? `1px solid ${theme.palette.primary.dark}` : '')}
                      >
                        <HBNextImage
                          fill
                          src={item.iconPath || ''}
                          alt={item.name || ''}
                          style={{ borderRadius: 50 }}
                        />
                      </Box>
                    )}
                    <Typography
                      variant="labelMedium"
                      color={showImageCategory && categoryActive === item.id ? 'primary.dark' : 'textAndIcon.darker'}
                      borderBottom={
                        !showImageCategory && categoryActive === item.id
                          ? theme => `2px solid ${theme.palette.primary.main}`
                          : ''
                      }
                      sx={{
                        textWrap: 'nowrap',
                        width: 85,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        textAlign: 'right',
                        ...(!showImageCategory &&
                          categoryActive === item.id && {
                            paddingBottom: 1,
                            borderBottom: theme => `2px solid ${theme.palette.primary.main}`,
                          }),
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Stack>
                ))}
              </HBCarousel>
            )}
          </Box>
        </Box>
      )}
    </Stack>
  )
}
