import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { getDocumentsStats } from '../controllers/documentsStatsController.js'

const router = express.Router()

/**
 * @swagger
 * /api/documents-stats/stats:
 *   get:
 *     summary: Получить статистику документов
 *     tags: [Documents Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Статистика документов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDocuments:
 *                   type: integer
 *                 totalCopies:
 *                   type: integer
 *                 documentsWithFiles:
 *                   type: integer
 *                 issuedDocuments:
 *                   type: integer
 *                 subjectsCount:
 *                   type: integer
 */

router.get('/stats', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('issue_document'), getDocumentsStats)

export default router