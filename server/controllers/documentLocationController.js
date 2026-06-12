import prisma from "../config/prisma.js"
import { createAuditLogService } from "../services/auditService.js"

export const updateDocumentLocation = async (req, res, next) => {
    try {
        const { id } = req.params

        const { cell_id, quantity } = req.validatedData

        const existing = await prisma.document_locations.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!existing) {
            throw new Error({
                message: 'document does not exist'
            })
        }

        const updatedLocation = await prisma.document_locations.update({
            where: {
                id: Number(id)
            },

            data: {
                cell_id: Number(cell_id),
                quantity: Number(quantity)
            }
        })

        await createAuditLogService({
            user_id: req.user.id,
            action: 'UPDATE_DOCUMENT_LOCATION',
            entity: 'LOCATION',
            entity_id: updatedLocation.id
        })

        return res.json({ message: 'Location updated',
            location: updatedLocation
        })
    } catch (err) {
        next(err)
    }
}

export const createDocumentLocation = async (req, res, next) => {
    try {
        const { document_id, cell_id, quantity } = req.validatedData

        const documentExist = await prisma.documents.findUnique({
            where: {
                id: Number(document_id)
            }
        })

        const cellExist = await prisma.cells.findUnique({
            where: {
                id: Number(cell_id)
            }
        })

        if (!documentExist || !cellExist) {
            return res.status(404).json({
                message: 'Document or cell not found'
            })
        }

        const stored = await prisma.document_locations.aggregate({
            where: {
                document_id: Number(document_id)
            },
            _sum: {
                quantity: true
            }
        })

        const currentStored = stored._sum.quantity || 0

        if (currentStored + Number(quantity) > documentExist.quantity_total) {
            throw new Error({
                message: 'quantity exceeds total amount'
            })
        }

        const cellLoad = await prisma.document_locations.aggregate({
            where: {
                cell_id: Number(cell_id)
            },
            _sum: {
                quantity: true
            }
        })

        currentCellLoad = cellLoad._sum.quantity || 0

        if (currentCellLoad + Number(quantity) > cellExist.max_capacity) {
            throw new Error({
                message: 'cell capacity exceeded'
            })
        }       

        const location = await prisma.document_locations.create({
            data: {
                document_id: Number(document_id),
                cell_id: Number(cell_id),
                quantity: Number(quantity)
            }
        })

        await createAuditLogService({
            user_id: req.user.id,
            action: 'CREATE_DOCUMENT_LOCATION',
            entity: 'LOCATION',
            entity_id: location.id
        })

        return res.status(201).json({ message: 'document location created',
            location
        })
    } catch (err) {
        next(err)
    }
}

export const getDocumentLocation = async (req, res, next) => {
    try {
        const { id } = req.params

        const location =  await prisma.document_locations.findMany({
            where: { document_id: Number(id) },
            include: {
                cells: {
                    include: {
                        shelves: {
                            include: {
                                racks: true
                            }
                        }
                    }
                }
            }
        })

        await createAuditLogService({
            user_id: req.user.id,
            action: 'GET_DOCUMENT_LOCATION',
            entity: 'LOCATION'
        })

        return res.json(location)
    } catch (err) {
        next(err)
    } 
}

