import { issueDocumentService, returnDocumentsService } from "../services/loanService.js"
import { createAuditLog } from "../services/auditService.js"

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