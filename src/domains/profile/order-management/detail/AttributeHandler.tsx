/* eslint-disable no-nested-ternary */
import { Stack, StackProps, Typography } from '@mui/material'
import { FC, Fragment, useMemo } from 'react'

import { AttributeDto, SpecificAttributeDto } from '@/services/sale-services/sale.schemas'

import { TextWithColor } from './components/TextWithColor'
import { TextWithIcon } from './components/TextWithIcon'

interface AttributeHandlerProps {
  attributes: AttributeDto[]
  specificAttributes: SpecificAttributeDto[]
  componentProps?: StackProps
}

const AttributeHandler: FC<AttributeHandlerProps> = props => {
  const { attributes, specificAttributes, componentProps } = props

  const renderAttributes = (attribute: {
    icon?: string | null
    color?: string | null
    name?: string | null
    value?: string | null
  }): JSX.Element | null => {
    const { icon, value, color, name } = attribute

    if (!value) return null

    return color ? (
      <TextWithColor color={color} text={value} />
    ) : icon ? (
      <TextWithIcon icon={`${process.env.NEXT_PUBLIC_CDN}${icon}`} text={value} />
    ) : name ? (
      <Typography
        sx={{
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          whiteSpace: 'pre-wrap',
        }}
        variant="subtitle2"
      >{`${name}: ${value}`}</Typography>
    ) : null
  }

  const otherAttributes = useMemo(() => {
    const topAttributes = attributes?.filter(item => item.isTop).slice(0, 3 - (specificAttributes?.length ?? 0))
    const notTopAttribute = attributes
      .filter(item => !item.isTop && specificAttributes.findIndex(sa => sa.value === item.value) === -1)
      .slice(0, 3 - ((specificAttributes?.length ?? 0) + topAttributes.length))

    return [...topAttributes, ...notTopAttribute].map(item => (
      <Fragment key={item.id}>{renderAttributes(item)}</Fragment>
    ))
  }, [attributes, specificAttributes])

  return (
    <Stack {...componentProps}>
      {/* Specific Attributes */}
      {specificAttributes?.map(item => <Fragment key={item.valueId}>{renderAttributes(item)}</Fragment>)}

      {/* Attributes */}
      {otherAttributes}
    </Stack>
  )
}

AttributeHandler.defaultProps = {
  componentProps: {
    spacing: 2,
  },
}

export { AttributeHandler }
