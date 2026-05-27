import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ message: 'No token' })
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Invalid token format'
            })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await prisma.users.findUnique({
            where: { id: decoded.id },
            include: {
                user_roles: {
                    include: {
                        roles: {
                            include: {
                                role_permissions: {
                                    include: {
                                        permissions: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        req.user = user

        next()
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}