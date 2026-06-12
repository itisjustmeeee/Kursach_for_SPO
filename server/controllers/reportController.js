import { getDocumentLocations, getUsersBySubject, getMostLoadedCell, getLastBorrower, getEmptyCells, getEmptyShelves, getEmptyRacks, getUnusedDocuments } from "../services/reportService.js"
import { getDocumentById } from "../services/documentService.js"
import { createAuditLogService } from "../services/auditService.js"

export const getDocumentsLocationReport = async (req, res, next) => {
    try {
        const { document_id } = req.params

        const locations = await getDocumentLocations(document_id)

        res.status(200).json(locations)
    } catch (err) {
        next(err)
    }
}

export const getUsersBySubjectReport = async (req, res, next) => {
    try {
        const { subject } = req.query
        
        const result = await getUsersBySubject(subject)

        await createAuditLogService({
            user_id: req.user.id,
            action: 'GET_USERS_BY_SUBJECT',
            entity: 'USERS'
        })

        res.json(result)
    } catch (err) {
        next (err)
    }
}

export const getMostLoadedCellReport = async (req, res, next) => {
    try {
        const result = await getMostLoadedCell()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const getLastBorrowerReport = async (req, res, next) => {
    try {
        const { document_id } = req.params

        const result = await getLastBorrower(document_id)

        await createAuditLogService({
            user_id: req.user.id,
            action: 'GET_LAST_BORROWER',
            entity: 'USERS'
        })

        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const getEmptyCellsReport = async (req, res, next) => {
    try {
        const result = await getEmptyCells()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const getEmptyShelvesReport = async (req, res, next) => {
    try {
        const result = await getEmptyShelves()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const getEmptyRacksReport = async (req, res, next) => {
    try {
        const result = await getEmptyRacks()

        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const getUnusedDocumentsReport = async (req, res, next) => {
    try {
        const { days } = req.query

        const result = await getUnusedDocuments(days)

        res.json(result)
    } catch (err) {
        next(err)
    }
}