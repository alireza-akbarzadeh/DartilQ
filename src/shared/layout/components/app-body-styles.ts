'use client'

import { styled } from '@mui/material'

import { AppBarHeight } from '@/shared/layout/constants'

const BodyStyle = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(AppBarHeight / 4),
}))

export { BodyStyle }
