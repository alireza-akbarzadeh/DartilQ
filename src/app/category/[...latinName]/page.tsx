import { SubCategory } from '@/domains/category'
import { StoreList } from '@/domains/storeList/StoreList'

const CategoryPage = ({
  params,
  searchParams,
}: {
  params: { latinName: string[] }
  searchParams?: { [key: string]: string }
}): JSX.Element => {
  if (searchParams?.name)
    return <SubCategory categoryId={params?.latinName[0]} categoryName={searchParams?.name || ''} />
  return <StoreList latinName={params?.latinName[0]} />
}

export default CategoryPage
