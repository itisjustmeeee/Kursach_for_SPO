import prisma from '../config/prisma.js'

export const checkDocumentAccess = async (req, res, next) => {
    try {
        const document_id = Number(req.params.id)
        const user_id = req.user.id

        const loan = await prisma.document_loans.findFirst({
            where: {
                user_id: user_id,
                document_id: document_id,
                status: {
                    in: ["approved", "issued"]
                }
            }
        })

        res.json({
            canDownload: !!loan
        })
    } catch (err) {
        next(err)
    }
}