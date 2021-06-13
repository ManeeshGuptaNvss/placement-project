import multer from 'multer'
import path from 'path'
import express from 'express'
const router = express.Router()
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    const name = file.originalname.split('.')[0]
    cb(null, `resume-${name}-${Date.now()}.${ext}`)
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf') {
    cb(null, true)
  } else {
    cb(new AppError('not a valid document!', 400), false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

const uploadResume = upload.single('resume')
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router