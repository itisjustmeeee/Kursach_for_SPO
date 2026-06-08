import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { getUsersStats } from '../controllers/usersStatsController.js'

const router = express.Router()

/**
 * @swagger
 * /api/users-stats/stats:
 *   get:
 *     summary: Получить статистику пользователей
 *     tags: [Users Statistics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Статистика пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 120
 *                 usersWithoutLoans:
 *                   type: integer
 *                   example: 45
 *                 usersWithActiveLoans:
 *                   type: integer
 *                   example: 18
 *                 overdueUsers:
 *                   type: integer
 *                   example: 3
 *                 totalLoans:
 *                   type: integer
 *                   example: 520
 *                 returnedLoans:
 *                   type: integer
 *                   example: 480
 *                 activeLoans:
 *                   type: integer
 *                   example: 40
 *                 overdueLoans:
 *                   type: integer
 *                   example: 5
 *                 mostActiveUser:
 *                   type: object
 *                   nullable: true
 */

router.get('/stats', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('issue_document'), getUsersStats)

export default router