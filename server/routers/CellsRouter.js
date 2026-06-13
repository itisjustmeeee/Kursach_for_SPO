import express from 'express'
import { getCells, getCellById, createCell, updateCell, deleteCell } from '../controllers/cellsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { getCellDocuments } from '../controllers/cellsDocumentsController.js'

const router = express.Router()

/**
 * @swagger
 * /api/cells:
 *  get:
 *      summary: Получить список ячеек
 *      tags: [Cells]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: shelf_id
 *            schema:
 *              type: integer
 *            description: ID полки
 *      responses:
 *          200:
 *              description: Список ячеек
 *          401:
 *              description: Не авторизован
 *          500:
 *              description: Server error
 */

router.get('/', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getCells)

/**
 * @swagger
 * /api/cells:
 *   post:
 *     summary: Создать ячейку
 *     tags: [Cells]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shelf_id
 *               - code
 *               - max_capacity
 *             properties:
 *               shelf_id:
 *                 type: integer
 *                 example: 3
 *               code:
 *                 type: string
 *                 example: C-01
 *               max_capacity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Ячейка создана
 */

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), createCell)

/**
 * @swagger
 * /api/cells/{id}:
 *   get:
 *     summary: Получить ячейку по ID
 *     tags: [Cells]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о ячейке
 *       404:
 *         description: Ячейка не найдена
 */

router.get('/:id', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getCellById)

/**
 * @swagger
 * /api/cells/{id}:
 *   put:
 *     summary: Обновить ячейку
 *     tags: [Cells]
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
 *                 example: C-02
 *               max_capacity:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Ячейка обновлена
 */

router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), updateCell)

/**
 * @swagger
 * /api/cells/{id}:
 *   delete:
 *     summary: Удалить ячейку
 *     tags: [Cells]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ячейка удалена
 *       400:
 *         description: Ячейка содержит документы
 *       404:
 *         description: Ячейка не найдена
 */

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), deleteCell)

/**
 * @swagger
 * /api/cells/{id}/documents:
 *   get:
 *     summary: Получить все документы в ячейке
 *     tags: [Cells]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ячейки
 *     responses:
 *       200:
 *         description: Список документов в ячейке
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   document_id:
 *                     type: integer
 *                   cell_id:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   documents:
 *                     type: object
 *                     description: Информация о документе
 *       404:
 *         description: Ячейка не найдена или пуста
 */

router.get('/:id/documents', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getCellDocuments)

export default router