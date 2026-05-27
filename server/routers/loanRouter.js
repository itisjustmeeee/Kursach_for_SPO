import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { issueDocument, returnDocument } from '../controllers/loanController.js'
import { issueDocumentSchema } from '../validation/loanSchemas.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('issue_document'), validate(issueDocumentSchema), issueDocument)
router.patch('/:id/return', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), returnDocument)

export default router




