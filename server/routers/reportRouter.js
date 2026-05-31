import express from 'express'
import { getDocumentsLocationReport, getUsersBySubjectReport, getMostLoadedCellReport, getLastBorrowerReport, getEmptyCellsReport, getEmptyShelvesReport, getEmptyRacksReport, getUnusedDocumentsReport } from '../controllers/reportController'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get('document-locations/:document_id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getDocumentsLocationReport)
router.get('/users-by-subject', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getUsersBySubjectReport)
router.get('/most-loaded-cell', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getLastBorrowerReport)
router.get('/last-borrower/:document_id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getLastBorrowerReport)
router.get('/empty-cells', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getEmptyCellsReport)
router.get('/empty-shelves', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getEmptyShelvesReport)
router.get('/empty-racks', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getEmptyRacksReport)
router.get('/unused-documents', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_document'), getUnusedDocumentsReport)

export default router