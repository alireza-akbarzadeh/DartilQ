const copyToClipboard = async (text: string) => {
  try {
    if (navigator.clipboard) {
      return await navigator.clipboard.writeText(text)
    }
    throw new Error('مشکلی پیش آمده است')
  } catch (error) {
    throw error as string
  }
}

export { copyToClipboard }
