import prisma from '../config/prisma.js'
import { createAuditLog } from '../services/auditService.js'
import { getDocumentById, getDocumentsService } from '../services/documentService.js'

/**
 * @swagger
 * /api/documents:
 *  get:
 *      summary: get all documents
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *          - in: query
 *            name: order
 *            schema:
 *              type: string
 * 
 *      responses:
 *          200:
 *              description: List of documents with pagination
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              documents:
 *                                  type: array
 *                              total:
 *                                  type: integer
 *                              page:
 *                                  type: integer
 *                              limit:
 *                                  type: integer
 *                              totalPages:
 *                                  type: integer
 *          500:
 *              description: Server error
 */

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

/**
 * @swagger
 * /api/documents/{id}:
 *  get:
 *      summary: get one document
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: document found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          404:
 *              description: document not found
 *          500:
 *              description: Server error
 */

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

/**
 * @swagger
 * /api/documents/{id}:
 *  delete:
 *      summary: delete document
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: successfully deleted document
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: oject
 *                          properties:
 *                              message:
 *                                  type: string
 *          404:
 *              description: document not found
 *          500:
 *              description: Server error
 */

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

/**
 * @swagger
 * /api/documents/{id}:
 *  put:
 *      summary: update document parameters
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          inventory_number:
 *                              type: string
 *                          quantity_total:
 *                              type: integer
 *      responses:
 *          200:
 *              description: successfully updated document
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              document:
 *                                  type: object
 *          404:
 *              description: document not found
 *          500:
 *              description: Server error
 */

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

/**
 * @swagger
 * /api/documents:
 *  post:
 *      summary: create new document
 *      tags: [Documents]
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          inventory_number:
 *                              type: string
 *                          quantity_total:
 *                              type: string
 *      responses:
 *          201:
 *              description: created document
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              document:
 *                                  type: object
 *          500:
 *              description: Server error
 */

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

