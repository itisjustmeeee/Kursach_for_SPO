import prisma from "../config/prisma"

export const issueDocumentService = async ({user_id, document_id, issued_by, quantity, due_date}) => {
    return await prisma.$transaction(
        async (tx) => {
            const document = await tx.documents.findUnique({
                where: {
                    id: Number(document_id)
                }
            })

            if (!document) {
                throw new Error('Document not found')
            }

            const stored = await tx.document_locations.aggregate({
                where: {
                    document_id: Number(document_id)   
                },
                _sum: {
                    quantity: true
                }
            })

            const avaliable = stored._sum.quantity || 0

            if (avaliable < quantity) {
                throw new Error('Not enough documents avaliable')
            }

            const loan = await tx.document_loans.create({
                data: {
                    user_id, document_id, quantity, due_date: new Date(due_date), status: 'ISSUED', issued_by
                }
            })

            return loan
        }
    )
}

export const returnDocumentsService = async (loan_id) => {
    return await prisma.$transaction(
        async (tx) => {
            const loan = await tx.document_loans.findUnique({
                where: {
                    id: Number(loan_id)
                }
            })

            if (!loan) {
                throw new Error('loan not found')
            }

            if (loan.status === 'RETURNED') {
                throw new Error('document already returned')
            }

            return await tx.document_loans.update({
                where: {
                    id: Number(loan_id)
                },
                data: {
                    returned_at: new Date(), status: 'RETURNED'
                }
            })
        }
    )
}