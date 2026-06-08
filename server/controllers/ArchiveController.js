import { getArchiveStatsService } from "../services/ArchiveStatsService.js"

export const getArchiveStats = async (req, res, next) => {
    try {
        const stats = await getArchiveStatsService()

        res.json(stats)
    } catch (err) {
        next(err)
    }
}