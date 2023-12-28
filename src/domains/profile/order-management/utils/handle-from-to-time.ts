/* eslint-disable no-nested-ternary */
import { format, isValid, parse } from 'date-fns'

export const handleFromToTime = (fromTime: string, toTime: string): string => {
  let validType: 'HH:mm' | 'HH:mm:ss' | '' = ''
  validType = isValid(parse(fromTime, 'HH:mm', new Date()))
    ? 'HH:mm'
    : isValid(parse(fromTime, 'HH:mm:ss', new Date()))
      ? 'HH:mm:ss'
      : ''
  if (!validType) {
    return ''
  }
  const fromTimeformat = format(parse(fromTime, validType, new Date()), 'H:mm')
  const toTimeformat = format(parse(toTime, validType, new Date()), 'H:mm')

  let timePrefix = ''

  const timeTime = Number(toTimeformat.split(':')[0])

  if (timeTime >= 6 && timeTime < 12) {
    timePrefix = 'صبح'
  } else if (timeTime >= 12 && timeTime < 15) {
    timePrefix = 'ظهر'
  } else if (timeTime >= 15 && timeTime < 18) {
    timePrefix = 'عصر'
  } else if (timeTime >= 18 && timeTime < 24) {
    timePrefix = 'شب'
  } else {
    timePrefix = 'بامداد'
  }

  return `${fromTimeformat} تا ${toTimeformat} ${timePrefix}`
}
