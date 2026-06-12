import prisma from "../config/prisma.js"
import { createAuditLogService } from "../services/auditService.js"

export const moveDocument = async (req, res, next) => {
    try {
        const { location_id, new_cell_id } = req.validatedData

        const location = await prisma.document_locations.findUnique({
            where: {
                id: Number(location_id)
            }
        })

        if (!location) {
            return res.status(404).json({
                message: 'Location not found'
            })
        }

        const newCell = await prisma.cells.findUnique({
            where: {
                id: Number(new_cell_id)
            }
        })

        if (!newCell) {
            return res.status(404).json({
                message: 'new cell not found'
            })
        }

        const cellLoad = await prisma.document_locations.aggregate({
            where: {
                cell_id: Number(new_cell_id)
            },
            _sum: {
                quantity: true
            }
        })

        const currentLoad = cellLoad._sum.quantity || 0

        if (currentLoad + location.quantity > newCell.max_capacity) {
            return res.status(400).json({
                message: 'cell capacity exceeded'
            })
        }

        const moved = await prisma.document_locations.update({
            where: {
                id: Number(location_id)
            },
            data: {
                cell_id: Number(new_cell_id)
            }
        })

        await createAuditLogService({
            user_id: req.user.id,
            action: 'MOVE_DOCUMENT',
            entity: 'LOCATION',
            entity_id: moved.id
        })

        return res.json({success: true, message: 'document moved', moved})
    } catch (err) {
        next(err)
    }
}