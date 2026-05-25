import { issueDocumentService, returnDocumentsService } from "../services/loanService"
import { createAuditLog } from "../services/auditService"

/**
 * @swagger
 * /loans/issue:
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

export const issueDocument = async (req, res, next) => {
    try {
        const loan = await issueDocumentService({...req.validatedData, issued_by: req.user.id})

        await createAuditLog({
            user_id: req.user.id,
            action: 'LOAN_DOCUMENT',
            entity: 'LOAN',
            entity_id: loan.id
        })

        return res.status(201).json({
            success: true,
            message: 'Document issued',
            loan
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @swagger
 *  /loans/return/{id}:
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

export const returnDocument = async (req, res, next) => {
    try {
        const loan = await returnDocumentsService(req.params.id)

        await createAuditLog({
            user_id: req.user.id,
            action: 'RETURN_DOCUMENT',
            entity: 'LOAN',
            entity_id: loan.id
        })

        return res.json({
            success: true,
            message: 'Document returned',
            loan
        })
    } catch (err) {
        next (err)
    }
}