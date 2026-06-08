import express from 'express'
import { getDocumentsLocationReport, getUsersBySubjectReport, getMostLoadedCellReport, getLastBorrowerReport, getEmptyCellsReport, getEmptyShelvesReport, getEmptyRacksReport, getUnusedDocumentsReport } from '../controllers/reportController'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/reports/document-locations/{documentId}:
 *   get:
 *     summary: получить местоположение документа
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: id документа
 *     responses:
 *       200:
 *         description: Информация о местоположении документа
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   cells:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       code:
 *                         type: string
 *                       shelves:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           code:
 *                             type: string
 *                           racks:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               code:
 *                                 type: string
 *       404:
 *         description: Документ не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get('document-locations/:document_id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getDocumentsLocationReport)

/**
 * @swagger
 * /api/reports/users-by-subject:
 *  get:
 *      summary: получить пользователей, получивших документы по теме
 *      tags: [Reports]
 * 
 *      parameters:
 *          - in: query
 *            name: subject
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: список пользователей
 *          500:
 *              description: Server error
 */

router.get('/users-by-subject', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getUsersBySubjectReport)

/**
 * @swagger
 * /api/reports/most-loaded-cell:
 *  get:
 *      summary: Максимально заполненная ячейка
 *      tags: [Reports]
 * 
 *      responses:
 *          200:
 *              description: информация о ячейке
 *          500:
 *              description: Server error
 */

router.get('/most-loaded-cell', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getMostLoadedCellReport)

/**
 * @swagger
 * /api/reports/last-borrower/{document_id}:
 *  get:
 *      summary: Последний пользователь, получивший документ
 *      tags: [Reports]
 * 
 *      parameters:
 *          - in: path
 *            name: document_id
 *            required: true
 *            schema:
 *              type: integer
 * 
 *      responses:
 *          200:
 *              description: пользователь найден
 *          500:
 *              description: Server error
 */

router.get('/last-borrower/:document_id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getLastBorrowerReport)

/**
 * @swagger
 * /api/reports/empty-cells:
 *  get:
 *      summary: получить пустые ячейки
 *      tags: [Reports]
 * 
 *      responses:
 *          200:
 *              description: список пустых ячеек
 *          500:
 *              description: Server error
 */

router.get('/empty-cells', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getEmptyCellsReport)

/**
 * @swagger
 * /api/reports/empty-shelves:
 *  get:
 *      summary: получить пустые полки
 *      tags: [Reports]
 * 
 *      responses:
 *          200:
 *              description: список пустых полок
 *          500:
 *              description: Server error
 */

router.get('/empty-shelves', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getEmptyShelvesReport)

/**
 * @swagger
 * /api/reports/empty-racks:
 *  get:
 *      summary: получить пустые стеллажи
 *      tags: [Reports]
 * 
 *      responses:
 *          200:
 *              description: список пустых стеллажей
 *          500:
 *              description: Server error
 */

router.get('/empty-racks', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getEmptyRacksReport)

/**
 * @swagger
 * /api/reports/unused-documents:
 *  get:
 *      summary: документы, не востребованные за период
 *      tags: [Reports]
 * 
 *      parameters:
 *          - in: query
 *            name: days
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: список документов
 *          500:
 *              description: Server error
 */

router.get('/unused-documents', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getUnusedDocumentsReport)

export default router