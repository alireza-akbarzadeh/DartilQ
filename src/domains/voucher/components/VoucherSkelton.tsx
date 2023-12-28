import { Skeleton } from '@mui/material'

const Skelton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton sx={{ borderRadius: 7.5 }} key={index} variant="rectangular" width="100%" height={221} />
      ))}
    </>
  )
}

export { Skelton }
