import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { getUsers, getUser } from '../controllers/userController.js'

const router = express.Router()

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

router.get('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_users'), getUsers)

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

router.get('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_users'), getUser)

export default router
