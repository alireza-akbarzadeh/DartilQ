'use client'

import { Avatar, Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'

import { axiosInstance } from '@/core/api/custom-instance'
import { HBBottomSheet, HBIcon } from '@/core/components'
import { useDeleteWebIDRFilesRemoveProfileAvatar } from '@/services/idr-services/idr'

export const MainHeader = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  // Const { mutateAsync: uploadAvatar } = usePostWebIDRFilesUploadProfileAvatar()
  const { mutateAsync: removeAvatar, isPending } = useDeleteWebIDRFilesRemoveProfileAvatar()
  const { data: userSession, update } = useSession()
  const { back } = useRouter()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChangeAvatar = () => {
    if (userSession?.user?.avatarUrl) setOpenConfirm(true)
    else inputFileRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenConfirm(false)
    setLoading(true)
    const fileObj: File | null = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }

    const formData = new FormData()
    formData.append('File', fileObj || '')

    axiosInstance
      .post(`${process.env.NEXT_PUBLIC_GATEWAY}/Web/IDR/files/uploadProfileAvatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(userSession?.accessToken && { Authorization: `Bearer ${userSession?.accessToken}` }),
        },
      })
      .then(({ data }) => {
        if (data?.data?.value) {
          update({ ...userSession?.user, avatarUrl: process.env.NEXT_PUBLIC_CDN + data?.data?.value })
        }
        setLoading(false)
      })

    event.target.value = ''
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor="primary.main"
      spacing={4}
      sx={{
        position: 'relative',
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          borderRadius: '0 90%  0 0',
          width: '100%',
          height: 20,
          backgroundColor: 'background.paper',
          bottom: -1,
          left: -1,
        },
        px: 4,
        py: 4,
        pb: 10,
      }}
    >
      <HBIcon name="angleRight" sx={{ color: 'textAndIcon.lightest' }} onClick={back} />
      <Avatar
        sx={{ bgcolor: 'primary.light', border: '1px solid', borderColor: 'primary.lighter' }}
        src={loading || isPending ? '' : userSession?.user?.avatarUrl}
        onClick={handleChangeAvatar}
      >
        {loading || isPending ? <CircularProgress /> : <HBIcon name="cameraPlus" sx={{ color: 'primary.lighter' }} />}
      </Avatar>
      <Typography variant="titleSmall" color="textAndIcon.lightest">
        {userSession?.user?.firstName || userSession?.user?.userName} {userSession?.user?.lastName || ''}
      </Typography>
      <input type="file" hidden ref={inputFileRef} onChange={handleFileChange} />

      {openConfirm && (
        <HBBottomSheet open onClose={() => setOpenConfirm(false)}>
          <Box px={4}>
            <Box display="flex" alignItems="center" height={40} onClick={() => inputFileRef.current?.click()}>
              <HBIcon name="imageEdit" sx={{ color: 'textAndIcon.darker' }} />
              <Typography variant="bodyLarge" color="textAndIcon.darker" ml={3}>
                تغییر عکس
              </Typography>
            </Box>
            <Divider sx={{ borderColor: 'border.lightest', my: 2 }} />
            <Box
              display="flex"
              alignItems="center"
              height={40}
              onClick={() => {
                removeAvatar().then(res => {
                  if (res.success) update({ ...userSession?.user, avatarUrl: '' })
                })
                setOpenConfirm(false)
              }}
            >
              <HBIcon name="imageTimes" sx={{ color: 'textAndIcon.darker' }} />
              <Typography variant="bodyLarge" color="textAndIcon.darker" ml={3}>
                حذف عکس
              </Typography>
            </Box>
          </Box>
        </HBBottomSheet>
      )}
    </Stack>
  )
}
