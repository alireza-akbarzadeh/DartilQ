import { ProductVariant } from '@/services/Qcommerce Bff-services/Qcommerce Bff.schemas'

import { ComponentTypeEnum } from '../../product.types'
import { DropDownVariant } from './DropDownVariant'
import { RadioButtonVariant } from './RadioButtonVariant'

const ProductVariant = (props: ProductVariant) => {
  const { componentType } = props
  if (componentType === ComponentTypeEnum.RadioButton) return <RadioButtonVariant {...props} />
  else if (componentType === ComponentTypeEnum.DropDown) return <DropDownVariant {...props} />
}

export { ProductVariant }
