type TransformationType = 'normal' | 'first-transform' | 'second-transform' | 'third-transform'

const glyphy = (text?: string | null, transform: TransformationType = 'third-transform'): string => {
  const addTransform = (): string => {
    switch (transform) {
      case 'normal': {
        return ''
      }
      case 'first-transform': {
        return 'ء'
      }
      case 'second-transform': {
        return 'ءء'
      }
      case 'third-transform': {
        return 'ءءء'
      }
      default: {
        return ''
      }
    }
  }

  if (text) {
    return `${text}${addTransform()}`
  }
  return ''
}

export { glyphy }
