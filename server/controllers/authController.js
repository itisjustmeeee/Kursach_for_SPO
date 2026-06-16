import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js'
import { hashPassword, comparePassword } from '../utils/hash.js'
import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import { createAuditLogService } from '../services/auditService.js'

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await prisma.users.findUnique({
            where: { email },
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

        const permissions = [
            ...new Set(
                user.user_roles.flatMap(ur =>
                    ur.roles.role_permissions.map(rp => rp.permissions.name)
                )
            )
        ]

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const validPassword = await comparePassword(password, user.password_hash)

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const accessToken = generateAccessToken(user, permissions)
        const refreshToken = generateRefreshToken(user, permissions)

        await createAuditLogService({
            user_id: user.id,
            action: 'LOGIN',
            entity: 'USER',
            entity_id: user.id
        })

        const roles = user.user_roles.map(ur => ur.roles.name)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ message: 'Login success',
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                last_name: user.last_name,
                first_name: user.first_name,
                middle_name: user.middle_name,
                phone: user.phone,
                department: user.department,
                roles
            }
        })
    } catch (err) {
        next(err)
    }
}

export const register = async (req, res, next) => {
    try {
        const {username, first_name, last_name, middle_name, email, phone, password, department} = req.body

        if (!username || !first_name || !last_name || !email || !phone || !password || !department) {
            return res.status(400).json({ error: 'Все поля обязательны для заполнения' })
        }

        const existingUser = await prisma.users.findUnique({ where: { email }})

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const password_hash = await hashPassword(password)

        const user = await prisma.users.create({
            data: {
                username,
                first_name, 
                last_name, 
                middle_name, 
                email, 
                phone, 
                password_hash, 
                department
            }
        })

        await createAuditLogService({
            user_id: user.id,
            action: 'REGISTER',
            entity: 'USER',
            entity_id: user.id
        })

        const role = await prisma.roles.findUnique({
            where: { name: 'user' }
        })

        await prisma.user_roles.create({
            data: {
                user_id: user.id,
                role_id: role.id
            }
        })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true
        })

        return res.status(201).json({ message: 'User registered',
            accessToken
        })
    } catch (err) {
        next(err)
    }
}

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                message: 'No refresh token'
            })

        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        )

        const user = await prisma.users.findUnique({
            where: {
                id: decoded.id
            },
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

        const permissions = [
            ...new Set(
                user.user_roles.flatMap(ur =>
                    ur.roles.role_permissions.map(rp => rp.permissions.name)
                )
            )
        ]        

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const accessToken = generateAccessToken(user, permissions)

        return res.json({
            accessToken
        })
    } catch (err) {
        return res.status(403).json({
            message: 'Invalid refresh token'
        })
    }
}

export const logout = async (req, res, next) => {
    try{
        res.clearCookie('refreshToken')

        await createAuditLogService({
            user_id: req.user.id,
            action: 'LOGOUT',
            entity: 'USER',
            entity_id: req.user.id
        })

        return res.json({
            message: 'Logout successful'
        })
    } catch (err) {
        next(err)
    }
}