import { success } from "zod"
import prisma from "../config/prisma.js"
import { createAuditLog } from "../services/auditService.js"

export const uploadDocumentFile = async (req, res, next) => {
    try {
        const { id } = req.params

        const document = await prisma.documents.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!document) {
            return res.status(404).json({
                message: 'document not found'
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'file not uploaded'
            })
        }

        const updated = await prisma.documents.update({
            where: {
                id: Number(id)
            },
            data: {
                file_path: req.file.path,
                file_name: req.file.filename,
                mime_type: req.file.mimetype
            }
        })

        await createAuditLog({
            user_id: req.user.id,
            action: 'UPLOAD_DOCUMENT',
            entity: 'DOCUMENT',
            entity_id: updated.id
        })

        return res.json({
            success: true, message: 'file uploaded', document: updated
        })
    } catch (err) {
        next(err)
    }
}