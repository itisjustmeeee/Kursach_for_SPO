import express from 'express'
import { createDocumentLocation, updateDocumentLocation, getDocumentLocation } from '../controllers/documentLocationController.js'
import { moveDocument } from '../controllers/documentMovementController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'
import { createDocumentLocationSchema, updateDocumentLocationSchema } from '../validation/locationSchemas.js'
import { moveDocumentSchema } from '../validation/documentValidation.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(createDocumentLocationSchema), createDocumentLocation)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(updateDocumentLocationSchema), updateDocumentLocation)
router.get('/document/:id', authMiddleware, roleMiddleware(['admin', 'user']), permissionMiddleware('view_document'), getDocumentLocation)
router.post('/move', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(moveDocumentSchema), moveDocument)

export default router