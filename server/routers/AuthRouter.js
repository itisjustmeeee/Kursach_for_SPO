const express = require('express')
import { register, login, refresh, logout } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'
const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/refresh', refresh)
router.post('/logout', authMiddleware, logout)

export default router
