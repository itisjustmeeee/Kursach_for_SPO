import express from 'express'
import { createDocumentLocation, updateDocumentLocation, getDocumentLocation } from '../controllers/documentLocationController'
import { moveDocument } from '../controllers/documentMovementController'
import { authMiddleware } from '../middleware/authMiddleware'
import { permissionMiddleware } from '../middleware/permissionMiddleware'
import { validate } from '../middleware/validationMiddleware'
import { createDocumentLocationSchema, updateDocumentLocationSchema } from '../validation/locationSchemas'
import { moveDocumentSchema } from '../validation/documentValidation'
import { roleMiddleware } from '../middleware/roleMiddleware'

const router = express.Router()

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(createDocumentLocationSchema), createDocumentLocation)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(updateDocumentLocationSchema), updateDocumentLocation)
router.get('/document/:id', authMiddleware, roleMiddleware(['admin', 'user']), permissionMiddleware('view_document'), getDocumentLocation)
router.post('/move', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(moveDocumentSchema), moveDocument)

export default router