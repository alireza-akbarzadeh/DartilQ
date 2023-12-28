import { NextRequest, NextResponse } from 'next/server'

interface ContentType {
  [x: string]: string | undefined
}

export const POST = async (request: NextRequest, { params }: { params: { providerType: string } }) => {
  const formData = await request.formData()

  const data: ContentType = {}
  let query = ''
  let index = 0
  formData.forEach((value, key) => {
    data[key] = value.toString()
    query = index === 0 ? `${query}${key}=${value.toString()}` : `${query}&${key}=${value.toString()}`
    index++
  })
  return NextResponse.redirect(
    new URL(`/payment/callback/${params.providerType}?${query}`, process.env.NEXT_PUBLIC_SITE_URL),
    {
      status: 301,
    },
  )
}

export const GET = async (request: NextRequest, { params }: { params: { providerType: string } }) => {
  const { providerType } = params

  let query = ''
  let index = 0
  request.nextUrl.searchParams.forEach((value, key) => {
    query =
      index === 0 ? `${query}${key}=${value.toString()}` : `${query}&${key}=${decodeURIComponent(value.toString())}`
    index++
  })

  return NextResponse.redirect(new URL(`/payment/callback/${providerType}?${query}`, request.url), {
    status: 301,
  })
}
