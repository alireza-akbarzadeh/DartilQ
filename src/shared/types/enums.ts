export enum ProviderEnum {
  CustomerCommerce = 0,
  CustomerBasket = 1,
  CustomerFavorite = 2,
  CustomerComment = 3,
  CustomerSocial = 4,
  CustomerPLPSavedSearch = 5,
  CustomerFavoriteSeller = 6,
  Vendor = 7,
}

export enum ProcessEventEnum {
  RefundRule = 'Catalog_ReturnRule_ViewReturnRules',
  DepositWalletRule = 'Wallet_PlatformWallets_WalletDeposite',
}

export enum PageOwnerTypeEnum {
  Brand = 0,
  Vendor = 1,
  Category = 2,
}

export enum SaleCenterEnum {
  All = 1121001,
  QCommerce,
  Commerce,
}

export enum WalletDiscriminatorEnum {
  creditCard = 1,
  wallet,
}
