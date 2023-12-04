import { SubCategory } from '@/domains/subCategory'

const CategoryPage = ({ params }: { params: { categoryId: string[] } }): JSX.Element => {
  return <SubCategory categoryId={params?.categoryId[1]} categoryName={params?.categoryId[0]} />
}

export default CategoryPage
