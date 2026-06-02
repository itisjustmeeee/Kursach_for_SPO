import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { issueDocument, returnDocument } from '../controllers/loanController.js'
import { issueDocumentSchema } from '../validation/loanSchemas.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/loans:
 *  post:
 *      summary: Issue document
 *      tags: [Loans]
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                          document_id:
 *                              type: integer
 *                          quantity:
 *                              type: integer
 *                          due_date:
 *                              type: string
 *                              format: date-time
 *      responses:
 *          201:
 *              description: document issued
 *          400:
 *              description: validation error
 *          403:
 *              description: forbidden
 *          500:
 *              description: Server error
 */

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('issue_document'), validate(issueDocumentSchema), issueDocument)

/**
 * @swagger
 *  /api/loans/{id}/return:
 *  post:
 *      summary: return document
 *      tags: [Loans]
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: document returned
 *          404:
 *              description: loan not found
 *          500:
 *              description: Server error
 */

router.patch('/:id/return', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), returnDocument)

export default router




