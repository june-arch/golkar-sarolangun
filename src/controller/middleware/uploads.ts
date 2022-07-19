import {
  editFileName,
  imageFileFilter,
  imageKtpFilter,
  videoFileFilter,
} from '@/lib/filter-uploads'
import multer from 'multer'

export const uploadMiddleware = (path: string) => {
  const upload = multer({
    limits: { fileSize: 1000 * 1024 },
    storage: multer.diskStorage({
      destination: './tmp/uploads/' + path,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  })
  return upload.single('image')
}

export const uploadMultipleMiddleware = (path: string) => {
  const upload = multer({
    limits: { fileSize: 1000 * 1024 },
    storage: multer.diskStorage({
      destination: './tmp/uploads/' + path,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  })
  return upload.array('image')
}

export const uploadDiffMiddleware = (path: string) => {
  const upload = multer({
    limits: { fileSize: 1000 * 1024 },
    storage: multer.diskStorage({
      destination: './tmp/uploads/' + path,
      filename: editFileName,
    }),
    fileFilter: imageKtpFilter,
  })
  return upload.fields([
    {
      name: 'photo',
      maxCount: 1,
    },
    {
      name: 'photo_ktp',
      maxCount: 1,
    },
  ])
}
