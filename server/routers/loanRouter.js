import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { permissionMiddleware } from '../middleware/permissionMiddleware'
import { roleMiddleware } from '../middleware/roleMiddleware'
import { issueDocument, returnDocument } from '../controllers/loanController'
import { issueDocumentSchema } from '../validation/loanSchemas'
import { validate } from '../middleware/validationMiddleware'

const router = express.Router()

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('issue_document'), validate(issueDocumentSchema), issueDocument)
router.patch('/:id/return', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), returnDocument)

export default router




