/* eslint-disable no-nested-ternary */
import { Box, Button, ButtonBase, CircularProgress, Stack, styled, Typography } from '@mui/material'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { HBButton, HBIcon } from '@/core/components'

import { OrderManagementMessages } from '../../order-management.messages'
import { ContentTypeEnums } from '../../types'
import { useRefund, useRefundUpdater } from '../context/RefundContext'
import { VideoThumbnail } from './VideoTumbnail'

const TextStyle = styled(Typography)(() => ({
  textAlign: 'center',
}))

interface FileResponse {
  type: 'image' | 'video'
  link: string
  id: string
}

const thumbnailSize = 120

interface RefundFileUploaderProps {
  readOnly?: boolean
  productId: string
  orderItemId: string
}

type StatusType = {
  variant: 'error' | 'success' | 'progress'
  value?: string | number
}

export const RefundFileUploader = (props: RefundFileUploaderProps): JSX.Element => {
  const { readOnly, productId, orderItemId } = props
  const { data } = useSession()
  const { accessToken } = { ...data }
  const { refundFiles } = useRefund()
  const [sendedFiles, setSendedFiles] = useState<FileResponse[]>([])
  const [status, setStatus] = useState<StatusType | null>(null)
  const { formatMessage } = useIntl()
  const { setRefundFiles } = useRefundUpdater()
  const fileUploaderRequest = useRef<XMLHttpRequest>()

  // FIXME:create a hook or use a available writted hookfor upload image
  const handleAddFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setStatus(null)
    const uploadedFile = event.target.files && (event.target.files[0] as File)
    event.target.value = ''

    if (!uploadedFile) return

    if (!uploadedFile.type.startsWith('image')) {
      setStatus({
        variant: 'error',
        value: formatMessage({ ...OrderManagementMessages.correctFileFormat }),
      })
      return
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      setStatus({
        variant: 'error',
        value: formatMessage({ ...OrderManagementMessages.fileUploadSizeError }),
      })
      return
    }

    const ContentType = uploadedFile.type.includes('image') ? ContentTypeEnums.Image : ContentTypeEnums.Video

    const sendedFile: FileResponse = {
      link: '',
      id: '',
      type: ContentType === ContentTypeEnums.Image ? 'image' : 'video',
    }

    const formData = new FormData()
    formData.append('EntityId', orderItemId)
    formData.append('File', uploadedFile)

    fileUploaderRequest.current = new XMLHttpRequest()
    const request = fileUploaderRequest.current
    request.open('POST', `${process.env.NEXT_PUBLIC_GATEWAY}/Web/Sale/RefundOrder/file`)
    request.setRequestHeader('Authorization', `Bearer ${accessToken}`)

    request.upload.addEventListener('progress', event => {
      setStatus({ variant: 'progress', value: (event.loaded / event.total) * 100 })
    })

    request.addEventListener('loadend', () => {
      if (request.status === 200) {
        setStatus({ variant: 'success' })
        sendedFile.link = JSON.parse(request.response).data.value
        sendedFile.id = JSON.parse(request.response).data.id
        setSendedFiles([...sendedFiles, sendedFile])
        setTimeout(() => {
          setStatus(null)
        }, 2000)
        if (refundFiles.findIndex(x => x.productId === productId) === -1) {
          setRefundFiles([...refundFiles, { productId, files: [...sendedFiles, sendedFile] }])
        } else {
          const index = refundFiles.findIndex(x => x.productId === productId)
          refundFiles[index].files.push(sendedFile)
        }
      } else {
        setStatus({
          variant: 'error',
          value: request.response ? JSON.parse(request.response).messages[0].message : '',
        })
      }
    })

    request.send(formData)
  }

  const removeFile = (index: number): void => {
    const newFiles = [...sendedFiles]
    newFiles.splice(index, 1)
    setSendedFiles(newFiles)
  }

  const cancelRequest = (): void => {
    fileUploaderRequest.current?.abort()
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={4}>
      {!readOnly && (
        <Stack sx={{ position: 'relative' }}>
          {status?.variant === 'progress' && (
            <ButtonBase
              sx={{
                borderRadius: '100%',
                border: theme => `1px solid ${theme.palette.grey[200]}`,
                position: 'absolute',
                top: -12,
                left: -12,
                width: 25,
                zIndex: 1,
                bgcolor: 'common.white',
              }}
              onClick={() => cancelRequest()}
            >
              <HBIcon size="small" name="multiply" />
            </ButtonBase>
          )}

          <Button
            component="label"
            disabled={['success', 'progress'].includes(status?.variant ?? '')}
            sx={{
              border: theme => `1px dashed ${theme.palette.grey[500]}`,
              width: 120,
              minHeight: 120,
              borderRadius: 2,
              position: 'relative',
            }}
            variant="link"
          >
            {status?.variant !== 'progress' && status?.variant !== 'success' ? (
              <Stack alignItems="center" spacing={4}>
                <HBIcon size="small" sx={{ color: 'grey.500' }} name="upload" />
                <Stack alignItems="center">
                  <TextStyle color="text.secondary" variant="caption">
                    <FormattedMessage {...OrderManagementMessages.uploadFile} />
                  </TextStyle>
                  {status?.variant === 'error' ? (
                    <TextStyle color="error.main" variant="caption">
                      {status.value}
                    </TextStyle>
                  ) : null}
                </Stack>
              </Stack>
            ) : status?.variant === 'success' ? (
              <Stack alignItems="center" spacing={4}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ bgcolor: 'success.main', width: 32, height: 32, borderRadius: '100%' }}
                >
                  <HBIcon size="small" sx={{ color: 'common.white' }} name="check" />
                </Stack>
                <TextStyle color="text.secondary" variant="caption">
                  <FormattedMessage {...OrderManagementMessages.withSuccess} />
                </TextStyle>
              </Stack>
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress value={status.value as number} variant="determinate" />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="grey.700" component="div" variant="caption">{`${Math.round(
                    status.value as number,
                  )}%`}</Typography>
                </Box>
              </Box>
            )}

            <input
              accept="image/*"
              hidden
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleAddFile(event)
              }}
            />
          </Button>
        </Stack>
      )}

      {sendedFiles.map((file, index) => (
        <Box key={file.link} sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              bgcolor: '#FFFFFFCC',
              zIndex: 2,
            }}
          />

          {file.type === 'image' ? (
            <Box
              sx={{
                overflow: 'hidden',
                width: thumbnailSize,
                height: thumbnailSize,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <HBButton
                sx={{ position: 'absolute', left: 0, top: 0, zIndex: 2, borderRadius: '100%' }}
                onClick={() => removeFile(index)}
              >
                <HBIcon size="small" name="multiply" />
              </HBButton>

              <Image
                alt={`refund-image-${index}`}
                layout="fill"
                loading="lazy"
                objectFit="contain"
                objectPosition="center"
                src={`${process.env.NEXT_PUBLIC_CDN}${file.link}`}
              />
            </Box>
          ) : (
            <Box sx={{ position: 'relative' }}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 3,
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ borderRadius: '100%', bgcolor: 'common.white', width: 40, height: 40 }}
                >
                  <HBIcon size="small" sx={{ color: 'grey.500' }} name="play" />
                </Stack>
              </Stack>
              <VideoThumbnail height={thumbnailSize} hideDuration src={file.link} width={thumbnailSize} />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )
}
