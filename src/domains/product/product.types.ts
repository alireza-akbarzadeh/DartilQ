type ProductPageType = {
  params: string[]
}

type ProductVariants = {
  allVariants: Record<string, string>[][]
  currentVariants: Record<string, string>
}

enum ComponentTypeEnum {
  RadioButton = 'Radio Button',
  DropDown = 'Drop Down List',
}

export { ComponentTypeEnum }
export type { ProductPageType, ProductVariants }
