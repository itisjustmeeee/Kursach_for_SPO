import { getUsersStatsService } from "../services/usersStatsService.js"

export const getUsersStats = async (req, res, next) => {
    try {
        const stats = await getUsersStatsService()

        res.json(stats)
    } catch (err) {
        next(err)
    }
}