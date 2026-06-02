import express from 'express'
import { getShelves, getShelfById, createShelf, updateShelf, deleteShelf } from '../controllers/shelvesController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/shelves:
 *   get:
 *     summary: Получить список полок
 *     tags:
 *       - Shelves
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: rackId
 *         schema:
 *           type: integer
 *         description: ID стеллажа
 *     responses:
 *       200:
 *         description: Список полок
 *       401:
 *         description: Не авторизован
 *      500:
 *          description: Server error
 */

router.get('/', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getShelves)

/**
 * @swagger
 * /api/shelves/{id}:
 *   get:
 *     summary: Получить полку по ID
 *     tags: [Shelves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о полке
 *       404:
 *         description: Полка не найдена
 */

router.get('/:id', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getShelfById)

/**
 * @swagger
 * /api/shelves:
 *   post:
 *     summary: Создать полку
 *     tags: [Shelves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rack_id
 *               - code
 *             properties:
 *               rack_id:
 *                 type: integer
 *                 example: 1
 *               code:
 *                 type: string
 *                 example: P-01
 *     responses:
 *       201:
 *         description: Полка создана
 */

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), createShelf)

/**
 * @swagger
 * /api/shelves/{id}:
 *   put:
 *     summary: Обновить полку
 *     tags: [Shelves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: P-02
 *     responses:
 *       200:
 *         description: Полка обновлена
 */

router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), updateShelf)

/**
 * @swagger
 * /api/shelves/{id}:
 *   delete:
 *     summary: Удалить полку
 *     tags: [Shelves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Полка удалена
 *       400:
 *         description: Полка содержит ячейки
 *       404:
 *         description: Полка не найдена
 */

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), deleteShelf)

export default router
