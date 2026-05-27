import express from 'express'
import { getDocument, getDocuments, createDocument, updateDocument, deleteDocument } from '../controllers/documentController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'
import { createDocumentSchema, updateDocumentSchema } from '../validation/documentValidation.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getDocuments)
router.get('/:id', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getDocument)
router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('create_document'), validate(createDocumentSchema), createDocument)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('update_document'), validate(updateDocumentSchema), updateDocument)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('delete_document'), deleteDocument)

export default router