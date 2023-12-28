export const regexps = {
  OnlyNumbers: /^\d+((\.|\/|-)\d+)?$/,
  MobileNumber: /^09[0-3|8-9][0-9]{8}$/,
  allowNumbers: '^[0-9۰-۹]*$',
  allowLetters: '^[\\x00-\\x7f\\۰-۹]*$',
  cardNumber: '^.{16,16}$',
  shebaNumber: '^.{24,24}$',
} as const
