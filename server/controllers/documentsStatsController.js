import { getDocumentsStatsService } from "../services/documentsStatsService.js"

export const getDocumentsStats = async (req, res, next) => {
    try {
        const stats = await getDocumentsStatsService()

        res.json(stats)
    } catch (err) {
        next(err)
    }
}