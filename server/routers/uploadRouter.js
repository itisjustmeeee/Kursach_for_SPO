import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { uploadDocumentFile } from '../controllers/uploadController.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.post('/documents/:id/upload', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('upload_documents'), upload.single('file'), uploadDocumentFile)

export default router
