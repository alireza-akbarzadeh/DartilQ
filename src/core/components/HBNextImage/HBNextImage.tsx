'use client'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

const cdnUrl = process.env['NEXT_PUBLIC_CDN']
const notFoundUrl = `${cdnUrl}/cdn/images/not-found.svg`

const handleSrc = (src: ImageProps['src'], isLocal?: boolean) => {
  if (!src) return notFoundUrl
  let returnedSrc = src
  if (!isLocal) returnedSrc = `${cdnUrl}${returnedSrc}`
  return returnedSrc
}

export const HBNextImage = (props: ImageProps & { imageNotFound?: string; isLocal?: boolean }): JSX.Element => {
  const { width, height, src: srcProps, imageNotFound, quality = 75, isLocal, ...rest } = props
  const [src, setSrc] = useState(() => handleSrc(srcProps, isLocal))

  useEffect(() => {
    setSrc(() => handleSrc(srcProps, isLocal))
  }, [srcProps])

  return (
    <Image
      width={width && height ? width : undefined}
      height={width && height ? height : undefined}
      blurDataURL={'/assets/svg/skeleton-image.svg'}
      src={src}
      loader={({ src, width: defaultWidth }) => {
        const width = props.width || defaultWidth ? `&w=${props.width || defaultWidth}` : ''
        const height = props.height ? `&h=${props.height}` : ''
        return `${src}?q=${quality}${width}${height}`
      }}
      onError={() => setSrc(imageNotFound || notFoundUrl)}
      sizes="(max-width: 512px) 100vw"
      {...{
        quality,
        ...rest,
      }}
    />
  )
}
