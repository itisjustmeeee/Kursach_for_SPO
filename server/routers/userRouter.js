import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { permissionMiddleware } from '../middleware/permissionMiddleware'
import { roleMiddleware } from '../middleware/roleMiddleware'
import { getUsers, getUser } from '../controllers/userController'

const router = express.Router()

router.get('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_users'), getUsers)
router.get('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('view_users'), getUser)

export default router
