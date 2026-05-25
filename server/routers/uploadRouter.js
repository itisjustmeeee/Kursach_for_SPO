import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { permissionMiddleware } from '../middleware/permissionMiddleware'
import { roleMiddleware } from '../middleware/roleMiddleware'
import { uploadDocumentFile } from '../controllers/uploadController'
import { upload } from '../middleware/uploadMiddleware'

const router = express.Router()

router.post('/documents/:id/upload', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('upload_documents'), upload.single('file'), uploadDocumentFile)

export default router
