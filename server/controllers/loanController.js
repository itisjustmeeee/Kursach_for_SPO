import { issueDocumentService, returnDocumentsService, getLoansService, getLoanService, approveLoanService, rejectLoanService, getActiveLoansService, getOverdueLoansService, getUserLoansService, getPendingLoansService, getHistoryLoansService } from "../services/loanService.js"
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

export const getLoans = async (req, res, next) => {
    try {
        const loans = await getLoanService()

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_LOANS',
            entity: 'LOAN'
        })

        res.json(loans)
    } catch (err) {
        next(err)
    }
}

export const getLoanById = async (req, res, next) => {
    try {
        const loan = await getLoanService(req.params.id)

        if(!loan) {
            return res.status(404).json({
                message: "Loan not found"
            })
        }

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_LOAN',
            entity: 'LOAN',
            entity_id: loan.id
        })

        res.json(loan)
    } catch (err) {
        next(err)
    }
}

export const approveLoan = async (req, res, next) => {
    try {
        const loan = await approveLoanService(req.params.id, req.user.id)

        await createAuditLog({
            user_id: req.user.id,
            action: 'APPROVE_LOAN',
            entity: 'LOAN',
            entity_id: loan.id
        })

        res.json({
            success: true,
            message: "Loan approved",
            loan
        })
    } catch (err) {
        next(err)
    }
}

export const rejectLoan = async (req, res, next) => {
    try {
        const loan = await rejectLoanService(req.params.id)

        await createAuditLog({
            user_id: req.user.id,
            action: 'REJECT_LOAN',
            entity: 'LOAN',
            entity_id: loan.id
        })

        res.json({
            success: true,
            message: "Loan rejected",
            loan
        })
    } catch (err) {
        next(err)
    }
}

export const getActiveLoans = async (req, res, next) => {
    try {
        const loans = await getActiveLoansService()

        res.json(loans)
    } catch (err) {
        next(err)
    }
}

export const getOverdueLoans = async (req, res, next) => {
    try {
        const loans = await getOverdueLoansService()

        res.json(loans)
    } catch (err) {
        next(err)
    }
}

export const getUsersLoans = async (req, res, next) => {
    try {
        const loans = await getUserLoansService(req.params.user_id)

        res.json(loans)
    } catch (err) {
        next(err)
    }
}

export const getPendingLoans = async (req, res, next) => {
    try {
        const loans = await getPendingLoansService()

        res.json(loans)
    } catch (err) {
        next(err)
    }
}

export const getHistoryLoans = async (req, res, next) => {
    try {
        const loans = await getHistoryLoansService(req.query)

        res.json(loans)
    } catch (err) {
        next(err)
    }
}