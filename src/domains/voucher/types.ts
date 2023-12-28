type StateType = 'Active' | 'Expired' | 'Used'

enum VoucherTypeEnum {
  Active = 1,
  Expired,
  Used,
}

enum PriceValueEnum {
  FixedPrice = 1052001,
  Percent,
}

export { PriceValueEnum, VoucherTypeEnum }
export type { StateType }
