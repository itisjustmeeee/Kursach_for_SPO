import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { getArchiveStats } from '../controllers/ArchiveController.js'

const router = express.Router()

/**
 * @swagger
 * /api/archive/stats:
 *   get:
 *     summary: Получить статистику архива
 *     tags: [Archive]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Статистика архива
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRacks:
 *                   type: integer
 *                   example: 15
 *                 totalShelves:
 *                   type: integer
 *                   example: 80
 *                 totalCells:
 *                   type: integer
 *                   example: 400
 *                 totalDocuments:
 *                   type: integer
 *                   example: 1200
 *                 totalCopies:
 *                   type: integer
 *                   example: 3500
 *                 emptyRacks:
 *                   type: integer
 *                   example: 2
 *                 emptyShelves:
 *                   type: integer
 *                   example: 5
 *                 emptyCells:
 *                   type: integer
 *                   example: 20
 *                 activeLoans:
 *                   type: integer
 *                   example: 14
 *                 overdueLoans:
 *                   type: integer
 *                   example: 3
 *                 unusedDocumentsCount:
 *                   type: integer
 *                   example: 12
 *                 mostLoadedCell:
 *                   type: object
 */

router.get('/stats', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('issue_document'), getArchiveStats)

export default router