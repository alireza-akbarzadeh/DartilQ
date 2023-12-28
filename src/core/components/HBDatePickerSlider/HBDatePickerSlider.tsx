/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Stack, Typography } from '@mui/material'
import { format, newDate } from 'date-fns-jalali'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const Picker = dynamic<any>(() => import('react-scrollable-picker'))
const dayAndYearGenerator = (from: number, to: number) => {
  const items = []
  for (let i = from; i <= to; i++) {
    items.push({ value: i, label: i.toString() })
  }
  return items
}

const day = dayAndYearGenerator(1, 31)
const month = [
  { value: 1, label: 'فروردین' },
  { value: 2, label: 'اردیبهشت' },
  { value: 3, label: 'خرداد' },
  { value: 4, label: 'تیر' },
  { value: 5, label: 'مرداد' },
  { value: 6, label: 'شهریور' },
  { value: 7, label: 'مهر' },
  { value: 8, label: 'آبان' },
  { value: 9, label: 'آذر' },
  { value: 10, label: 'دی' },
  { value: 11, label: 'بهمن' },
  { value: 12, label: 'اسفند' },
]
const year = dayAndYearGenerator(1300, 1402)

interface HBDatePickerSliderProps {
  value?: Date
  onChange: (value: Date) => void
}

export const HBDatePickerSlider = (props: HBDatePickerSliderProps) => {
  const { value = new Date(), onChange } = props
  const formatValueDate = format(value, 'yyyy-MM-dd').split('-')
  const [time, setTime] = useState({ day: +formatValueDate[2], month: +formatValueDate[1], year: +formatValueDate[0] })
  const handleChange = (name: string, value: number) => {
    setTime(prev => ({
      ...prev,
      [name]: value,
    }))

    switch (name) {
      case 'day': {
        onChange(newDate(time.year, time.month - 1, value))
        break
      }
      case 'month': {
        onChange(newDate(time.year, value - 1, time.day))
        break
      }
      case 'year': {
        onChange(newDate(value, time.month - 1, time.day))
        break
      }
      default:
        break
    }
  }

  return (
    <Box
      sx={theme => ({
        '& div.picker-inner': { padding: 0 },
        '& .picker-item': {
          ...theme.typography.bodyMedium,
          color: theme.palette.textAndIcon.light,
          '&.picker-item-selected': { color: theme.palette.textAndIcon.darker },
        },
      })}
    >
      <Stack direction="row" mb={1} justifyContent="space-between">
        <Stack flex={1} textAlign="center">
          <Typography variant="titleSmall" color="textAndIcon.darker">
            روز
          </Typography>
        </Stack>
        <Stack flex={1} textAlign="center">
          <Typography variant="titleSmall" color="textAndIcon.darker">
            ماه
          </Typography>
        </Stack>
        <Stack flex={1} textAlign="center">
          <Typography variant="titleSmall" color="textAndIcon.darker">
            سال
          </Typography>
        </Stack>
      </Stack>
      <Picker
        optionGroups={{
          day,
          month,
          year,
        }}
        valueGroups={time}
        onChange={handleChange}
        itemHeight={40}
        height={140}
      />
    </Box>
  )
}
