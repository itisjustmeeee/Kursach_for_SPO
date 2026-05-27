import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { getUsers, getUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_users'), getUsers)
router.get('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_users'), getUser)

export default router
