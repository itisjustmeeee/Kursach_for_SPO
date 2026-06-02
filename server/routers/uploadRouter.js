import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { uploadDocumentFile } from '../controllers/uploadController.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/uploads/documents/{id}/upload:
 *  post:
 *      summary: upload document file
 *      tags: [Documents]
 * 
 *      consumes:
 *          - multipart/form-data
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 * 
 *          - in: formData
 *            name: file
 *            type: file
 *            required: true
 * 
 *      responses:
 *          200:
 *              description: file uploaded
 *          500:
 *              description: Server error
 */

router.post('/documents/:id/upload', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('upload_documents'), upload.single('file'), uploadDocumentFile)

export default router
