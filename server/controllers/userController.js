import { getUsersService, getUserByIdService } from "../services/userService.js"
import { createAuditLog } from "../services/auditService.js"

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: get all users
 *      tags: [Users]
 * 
 *      responses:
 *          200:
 *              description: users list
 *          403:
 *              description: forbidden
 *          500:
 *              description: Server error
 */

export const getUsers = async (req, res, next) => {
    try {
        const users = await getUsersService()

        await createAuditLog({
            user_id: req.user.id,
            action: 'GET_USERS',
            entity: 'USERS',
        })

        return res.json(users)
    } catch (err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: get user by id
 *      tags: [Users]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 * 
 *      responses:
 *          200:
 *              description: user found
 *          404:
 *              description: user not found
 *          500:
 *              description: Server error
 */

export const getUser = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        await createAuditLog({
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