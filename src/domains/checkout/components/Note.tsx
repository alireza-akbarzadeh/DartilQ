/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { HBBottomSheet, HBButton, HBIcon, HBTextFieldController } from '@/core/components'

type NoteProps = {
  noteFormProvider: UseFormReturn<{ note: string }, any, undefined>
}

export const Note = ({ noteFormProvider }: NoteProps): JSX.Element => {
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>()
  const [openDeleteBottomSheet, setOpenDeleteBottomSheet] = useState<boolean>()
  const { watch, getValues, setValue } = noteFormProvider
  const [isNoteFocused, setIsNoteFocused] = useState<boolean>(false)
  const lastNote = useRef<string>('')

  const handleClose = () => {
    setOpenBottomSheet(false)
    setValue('note', lastNote.current)
  }

  return (
    <>
      <Stack sx={{ gap: 4, pt: 4 }}>
        <Divider sx={{ color: 'border.lighter' }} />
        <Stack sx={{ gap: 2, px: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
            <Box>
              <Typography variant="titleMedium">افزودن یادداشت</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                py: 2,
                pl: 2,
                borderRadius: 10,
                color: 'textAndIcon.darker',
                height: 40,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: 34,
                  height: 34,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6.5,
                  bgcolor: 'background.light',
                }}
              >
                <HBIcon
                  name={watch('note') ? 'editAlt' : 'plusSquare'}
                  size="xSmall"
                  onClick={() => {
                    setOpenBottomSheet(true)
                    lastNote.current = getValues('note')
                  }}
                />
              </Box>
              {watch('note') && (
                <Box
                  sx={{
                    display: 'flex',
                    width: 34,
                    height: 34,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6.5,
                    bgcolor: 'background.light',
                  }}
                >
                  <HBIcon name="trashAlt" size="xSmall" onClick={() => setOpenDeleteBottomSheet(true)} />
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="bodySmall" color="textAndIcon.dark">
              {watch('note')}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      {openBottomSheet && (
        <HBBottomSheet open={openBottomSheet} onClose={handleClose} height="90%">
          <Stack sx={{ gap: 4, px: 4, height: '100%', position: 'relative' }}>
            <Box>
              <Typography variant="titleMedium">افزودن یادداشت</Typography>
            </Box>
            <FormProvider {...noteFormProvider}>
              <Stack sx={{ gap: 2 }}>
                <HBTextFieldController
                  name="note"
                  label="پیام خود را بنویسید..."
                  rules={{
                    maxLength: 100,
                  }}
                  inputProps={{
                    maxLength: 100,
                    onFocus: () => setIsNoteFocused(true),
                  }}
                  minRows={4}
                  maxRows={4}
                  multiline
                />
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', px: 4 }}>
                  <Typography variant="labelMedium">{`100 / ${watch('note')?.length ?? '0'}`}</Typography>
                </Box>
              </Stack>
            </FormProvider>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                position: isNoteFocused ? 'relative' : 'absolute',
                bottom: 35,
                py: isNoteFocused ? 8 : 4,
                width: isNoteFocused ? 'unset' : 'calc(100% - 32px)',
              }}
            >
              <HBButton variant="secondary" sx={{ minWidth: 156 }} onClick={handleClose}>
                انصراف
              </HBButton>
              <HBButton
                variant="primary"
                sx={{ minWidth: 156 }}
                disabled={!watch('note')}
                onClick={() => setOpenBottomSheet(false)}
              >
                تایید
              </HBButton>
            </Box>
          </Stack>
        </HBBottomSheet>
      )}
      {openDeleteBottomSheet && (
        <HBBottomSheet open={openDeleteBottomSheet} onClose={() => setOpenDeleteBottomSheet(false)} hidePuller>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="titleLarge">حذف یادداشت</Typography>
            </Box>
          </Box>
          <Stack sx={{ gap: 4, px: 4 }}>
            <Box sx={{ color: 'textAndIcon.darker', borderRadius: 2, py: 1 }}>
              <Typography variant="bodyMedium">آیا از حذف یادداشت اطمینان دارید؟</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 4,
              }}
            >
              <HBButton variant="secondary" sx={{ minWidth: 156 }} onClick={() => setOpenDeleteBottomSheet(false)}>
                انصراف
              </HBButton>
              <HBButton
                variant="primary"
                sx={{ minWidth: 156 }}
                disabled={!watch('note')}
                onClick={() => {
                  setValue('note', '')
                  setOpenDeleteBottomSheet(false)
                }}
              >
                تایید
              </HBButton>
            </Box>
          </Stack>
        </HBBottomSheet>
      )}
    </>
  )
}
