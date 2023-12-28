import { SearchContainer } from '@/domains/search'

const Page = ({ searchParams }: { searchParams: { searched: string } }) => {
  return <SearchContainer searched={searchParams.searched} />
}

export default Page
