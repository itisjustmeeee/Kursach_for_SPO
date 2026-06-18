import path from "path"
import prisma from "../config/prisma.js"
import { createAuditLogService } from "../services/auditService.js"
import { optimizePdf } from "../services/pdfService.js"

export const uploadDocumentFile = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!req.file) {
            return res.status(400).json({ message: "file not uploaded" })
        }

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

        const inputPath = req.file.path

        const outputFileName = `optimized-${req.file.filename}`
        const outputPath = path.join("uploads", outputFileName)

        await optimizePdf(inputPath, outputPath)

        const updated = await prisma.documents.update({
            where: {
                id: Number(id)
            },
            data: {
                file_path: `/uploads/${outputFileName}`,
                file_name: outputFileName,
                mime_type: req.file.mimetype
            }
        })

        await createAuditLogService({
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