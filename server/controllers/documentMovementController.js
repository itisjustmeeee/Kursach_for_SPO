import prisma from "../config/prisma"
import { createAuditLog } from "../services/auditService"

/**
 * @swagger
 * /document-move:
 *  post:
 *      summary: move document
 *      tags: [Document movement]
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      location_id:
 *                          type: integer
 *                      new_cell_id:
 *                          type: integer
 *      responses:
 *          200:
 *              description: document moved
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              moved:
 *                                  type: object
 *          500:
 *              description: Server error
 */

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

        await createAuditLog({
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