import { getUsersService, getUserByIdService } from "../services/userService.js"
import { createAuditLogService } from "../services/auditService.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService()

        await createAuditLogService({
            user_id: req.user.id,
            action: 'GET_USERS',
            entity: 'USERS',
        })

        return res.json(users)
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        await createAuditLogService({
            user_id: req.user.id,
            action: 'GET_USER_BY_ID',
            entity: 'USER',
            entity_id: user.id
        })

        return res.json(user)
    } catch (err) {
        next(err)
    }
}