import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { issueDocument, returnDocument, getLoans, getLoanById, approveLoan, rejectLoan, getActiveLoans, getOverdueLoans, getUsersLoans, getPendingLoans, getHistoryLoans, getMyLoans } from '../controllers/loanController.js'
import { issueDocumentSchema } from '../validation/loanSchemas.js'
import { validate } from '../middleware/validationMiddleware.js'

const router = express.Router()

/**
 * @swagger:
 * /api/loans:
 *  get:
 *      summary: Получить список выдач документов
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: Список выдач
 */

router.get('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('request_return_document'), getLoans)

/**
 * @swagger
 * /api/loans/request:
 *  post:
 *      summary: Issue document
 *      tags: [Loans]
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                          document_id:
 *                              type: integer
 *                          quantity:
 *                              type: integer
 *                          due_date:
 *                              type: string
 *                              format: date-time
 *      responses:
 *          201:
 *              description: document issued
 *          400:
 *              description: validation error
 *          403:
 *              description: forbidden
 *          500:
 *              description: Server error
 */

router.post('/request', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('issue_document'), validate(issueDocumentSchema), issueDocument)

/**
 * @swagger
 * /api/loans/active:
 *  get:
 *      summary: Получить активные выдачи
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: список активных документов
 */

router.get('/active', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), getActiveLoans)

/**
 * @swagger
 * /api/loans/overdue:
 *  get:
 *      summary: Получить просроченные выдачи
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: список просроченых документов
 */

router.get('/overdue', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), getOverdueLoans)

/**
 * @swagger
 * /api/loans/pending:
 *  get:
 *      summary: Получить все заявки на выдачу документов в статусе "pending"
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: Список заявок в ожидании одобрения
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  user_id:
 *                                      type: integer
 *                                  document_id:
 *                                      type: integer
 *                                  quantity:
 *                                      type: integer
 *                                  status:
 *                                      type: string
 *                                  due_date:
 *                                      type: string
 *                                      format: date-time
 *                                  issued_by:
 *                                      type: integer
 *                                  created_at:
 *                                      type: string
 *                                      format: date-time
 *                                  returned_at:
 *                                      type: string
 *                                      format: date-time
 *                                  users:
 *                                      type: object
 *                                  documents:
 *                                      type: object
 */

router.get('/pending', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('request_return_document'), getPendingLoans)

/**
 * @swagger
 * /api/loans/history:
 *   get:
 *     summary: История возврата документов
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поиск по документу или пользователю
 *     responses:
 *       200:
 *         description: Список завершённых выдач
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   status:
 *                     type: string
 *                     example: returned
 *                   quantity:
 *                     type: integer
 *                   issued_at:
 *                     type: string
 *                     format: date-time
 *                   returned_at:
 *                     type: string
 *                     format: date-time
 *                   documents:
 *                     type: object
 *                   users:
 *                     type: object
 *       401:
 *         description: Не авторизован
 */

router.get('/history', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), getHistoryLoans)

/**
 * @swagger
 * /api/loans/my:
 *   get:
 *     summary: Получить мои заявки и выдачи документов
 *     description: Возвращает список всех заявок и выдач текущего авторизованного пользователя.
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Список выдач пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 5
 *
 *                   user_id:
 *                     type: integer
 *                     example: 3
 *
 *                   document_id:
 *                     type: integer
 *                     example: 12
 *
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *
 *                   status:
 *                     type: string
 *                     example: issued
 *
 *                   issued_at:
 *                     type: string
 *                     format: date-time
 *
 *                   due_date:
 *                     type: string
 *                     format: date-time
 *
 *                   returned_at:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *
 *                   documents:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *
 *                       title:
 *                         type: string
 *                         example: История Казахстана
 *
 *                       inventory_number:
 *                         type: string
 *                         example: INV-001
 *
 *                       subject:
 *                         type: string
 *                         example: История
 *
 *                       quantity_total:
 *                         type: integer
 *                         example: 10
 *
 *       401:
 *         description: Не авторизован
 *
 *       403:
 *         description: Недостаточно прав
 *
 *       500:
 *         description: Ошибка сервера
 */

router.get('/my', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), getMyLoans)

/**
 * @swagger
 * /api/loans/user/{user_id}:
 *  get:
 *      summary: Получить все выдачи пользователя
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: получение списка активных документов пользователя
 */

router.get('/user/:user_id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('request_return_document'), getUsersLoans)

/**
 * @swagger
 * /api/loans/{id}:
 *  get:
 *      summary: Получить выдачу по ID
 *      tags: [Loans]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Выдача найдена
 *          404:
 *              description: Выдача не найдена
 */

router.get('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('request_return_document'), getLoanById)

/**
 * @swagger
 * /api/loans/{id}/approve:
 *  patch:
 *      summary: Одобрить выдачу документа
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: заявка была одобрена
 */

router.patch('/:id/approve', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('request_return_document'), approveLoan)

/**
 * @swagger
 * /api/loans/{id}/reject:
 *  patch:
 *      summary: Отклонить заявку
 *      tags: [Loans]
 *      responses:
 *          200:
 *              description: заявка была отклонена
 */

router.patch('/:id/reject', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('request_return_document'), rejectLoan)

/**
 * @swagger
 *  /api/loans/{id}/return:
 *  post:
 *      summary: return document
 *      tags: [Loans]
 * 
 *      security:
 *          - bearerAuth: []
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: document returned
 *          404:
 *              description: loan not found
 *          500:
 *              description: Server error
 */

router.patch('/:id/return', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('request_return_document'), returnDocument)

export default router




