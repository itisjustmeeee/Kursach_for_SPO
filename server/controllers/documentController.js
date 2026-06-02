import prisma from '../config/prisma.js'
import { createAuditLog } from '../services/auditService.js'
import { getDocumentById, getDocumentsService } from '../services/documentService.js'

export const getDocuments = async (req, res, next) => {
    try {
        const documents = await getDocumentsService(req.query)

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_DOCUMENTS',
            entity: 'DOCUMENT'
        })

        return res.json(documents)
    } catch (err) {
        next(err)
    }
}

export const getDocument = async(req, res, next) => {
    try {
        const { id } = req.params

        const document = await getDocumentById(id)

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            })
        }

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_DOCUMENT',
            entity: 'DOCUMENT',
            entity_id: document.id
        })

        return res.json(document)
    } catch (err) {
        next(err)
    }
}

export const deleteDocument = async (req, res, next) => {
    try {
        const { id } = req.params

        const existing = await prisma.documents.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!existing) {
            return res.status(404).json({
                message: 'document not found'
            })
        }

        await prisma.$transaction([
            prisma.document_locations.deleteMany({
                where: {
                    document_id: Number(id)
                }
            }),

            prisma.documents.delete({
                where: {
                    id: Number(id)
                }
            })
        ])

        await createAuditLog({
            user_id: req.user.id,
            action: 'DELETE_DOCUMENT',
            entity: 'DOCUMENT',
            entity_id: Number(id)
        })

        return res.json({ message: 'Document deleted' })
    } catch (err) {
        next(err)
    }
}

export const updateDocument = async (req, res, next) => {
    try {
        const { id } = req.params

        const {title, subject, inventory_number, quantity_total} = req.validatedData

        const existingDocument = await prisma.documents.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!existingDocument) {
            return res.status(404).json({ message: 'Document not found' })
        }

        if (inventory_number) {
            const duplicate = await prisma.documents.findFirst({
                where: {
                    inventory_number,

                    NOT: {
                        id: Number(id)
                    }
                }
            })

            if (duplicate) {
                return res.status(400).json({ message: 'Inventory number already exists' })
            }
        }

        const updateDocument = await prisma.documents.update({
            where: {
                id: Number(id)
            },

            data: {
                title, subject, inventory_number, quantity_total
            }
        })

        await createAuditLog({
            user_id: req.user.id,
            action: 'UPDATE_DOCUMENT',
            entity: 'DOCUMENT',
            entity_id: updateDocument.id
        })

        return res.json({ message: 'Document updated',
            document: updateDocument
        })
    } catch (err) {
        next(err)
    }
}

export const createDocument = async (req, res, next) => {
    try {
        const { title, subject, inventory_number, quantity_total } = req.validatedData

        const existing = await prisma.documents.findFirst({
            where: {
                inventory_number
            }
        })

        if (existing) {
            return res.status(400).json({
                message: 'Inventory number already exists'
            })
        }

        const document = await prisma.documents.create({
            data: {
                title,
                subject,
                inventory_number,
                quantity_total
            }
        })

        await createAuditLog({
            user_id: req.user.id,
            action: 'CREATE_DOCUMENT',
            entity: 'DOCUMENT',
            entity_id: document.id
        })

        return res.status(201).json({ message: 'document created',
            document
        })
    } catch (err) {
        next(err)
    }
}

