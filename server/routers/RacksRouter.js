import express from 'express'
import { getRacks, getRackById, createRack, updateRack, deleteRack } from '../controllers/racksController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/racks:
 *   get:
 *     summary: Получить список стеллажей
 *     tags:
 *       - Racks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поиск по коду стеллажа
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Список стеллажей
 *       401:
 *         description: Не авторизован
 *      500:
 *         description: Server error 
 */

router.get('/', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getRacks)

/**
 * @swagger
 * /api/racks/{id}:
 *   get:
 *     summary: Получить стеллаж по ID
 *     tags: [Racks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID стеллажа
 *     responses:
 *       200:
 *         description: Информация о стеллаже
 *       404:
 *         description: Стеллаж не найден
 */

router.get('/:id', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getRackById)

/**
 * @swagger
 * /api/racks:
 *   post:
 *     summary: Создать новый стеллаж
 *     tags: [Racks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "A1"
 *     responses:
 *       201:
 *         description: Стеллаж создан
 */

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), createRack)

/**
 * @swagger
 * /api/racks/{id}:
 *   put:
 *     summary: Обновить стеллаж
 *     tags: [Racks]
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
 *                 example: "B2"
 *     responses:
 *       200:
 *         description: Стеллаж обновлен
 */

router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), updateRack)

/**
 * @swagger
 * /api/racks/{id}:
 *   delete:
 *     summary: Удалить стеллаж
 *     tags: [Racks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Стеллаж удален
 *       400:
 *         description: Ошибка удаления (например, есть полки)
 */

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), deleteRack)

export default router