import { getDocumentLocations, getUsersBySubject, getMostLoadedCell, getLastBorrower, getEmptyCells, getEmptyShelves, getEmptyRacks, getUnusedDocuments } from "../services/reportService.js"
import { getDocumentById } from "../services/documentService.js"
import { createAuditLog } from "../services/auditService.js"

/**
 * @swagger
 * /api/reports/document-locations/{documentId}:
 *   get:
 *     summary: получить местоположение документа
 *     tags:
 *       - Reports
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

export const getDocumentsLocationReport = async (req, res, next) => {
    try {
        const { document_id } = req.params

        const locations = await getDocumentLocations(document_id)

        res.status(200).json(locations)
    } catch (err) {
        next(err)
    }
}

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

export const getUsersBySubjectReport = async (req, res, next) => {
    try {
        const { subject } = req.query
        
        const result = await getUsersBySubject(subject)

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_USERS_BY_SUBJECT',
            entity: 'USERS'
        })

        res.json(result)
    } catch (err) {
        next (err)
    }
}

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

export const getMostLoadedCellReport = async (req, res, next) => {
    try {
        const result = await getMostLoadedCell()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

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

export const getLastBorrowerReport = async (req, res, next) => {
    try {
        const { document_id } = req.params

        const result = await getLastBorrower(document_id)

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_LAST_BORROWER',
            entity: 'USERS'
        })

        res.json(result)
    } catch (err) {
        next(err)
    }
}

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

export const getEmptyCellsReport = async (req, res, next) => {
    try {
        const result = await getEmptyCells()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

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

export const getEmptyShelvesReport = async (req, res, next) => {
    try {
        const result = await getEmptyShelves()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

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

export const getEmptyRacksReport = async (req, res, next) => {
    try {
        const result = await getEmptyRacks()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

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

export const getUnusedDocumentsReport = async (req, res, next) => {
    try {
        const { days } = req.query

        const result = await getUnusedDocuments(days)

        res.json(result)
    } catch (err) {
        next(err)
    }
}