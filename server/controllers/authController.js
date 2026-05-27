import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js'
import { hashPassword, comparePassword } from '../utils/hash.js'
import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import { createAuditLog } from '../services/auditService.js'

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login user
 *      tags: [Auth]
 * 
 *      requestBody:
 *          required: true
 * 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              format: password
 *                      
 *      responses:
 *          200:
 *              description: Login success
 *          401:
 *              description:  Unauthorized
 *          404:
 *              description: User not found
 *          500:
 *              description: Server error
 */

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await prisma.users.findUnique({
            where: { email },

            include: {
                user_roles: {
                    include: {
                        roles: true
                    }
                }
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const validPassword = await comparePassword(password, user.password_hash)

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await createAuditLog({
            user_id: user.id,
            action: 'LOGIN',
            entity: 'USER',
            entity_id: user.id
        })

        const roles = user.user_roles.map(ur => ur.roles.name)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ message: 'Login success',
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roles
            }
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register new user
 *      tags: [Auth]
 * 
 *      requestBody:
 *          required: true
 * 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - first_name
 *                          - last_name
 *                          - middle_name
 *                          - email
 *                          - phone
 *                          - password
 *                          - department
 *                      properties:
 *                          username:
 *                              type: string
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          middle_name:
 *                              type: string
 *                          email:
 *                              type: string
 *                              format: email
 *                          phone:
 *                              type: string
 *                              format: phone
 *                          password:
 *                              type: string
 *                              format: password
 *                          department:
 *                              type: string
 *      responses:
 *          201:
 *              description: User created
 *          400:
 *              description: Invalid request
 *          500:
 *              description: Server error
 */

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

        await createAuditLog({
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

        res.cookies('refreshToken', refreshToken, {
            httpOnly: true
        })

        return res.status(201).json({ message: 'User registered',
            accessToken
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @swagger
 * /api/auth/refresh:
 *  post:
 *      summary: Refresh access token
 *      tags: [Auth]
 * 
 *      description: Gets refresh token from httpOnly cookie and gives new access token
 * 
 *      responses:
 *          200:
 *              description: new access token generated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *          401:
 *              description: No refresh token
 *          403:
 *              description: Invalid refresh token
 *          404:
 *              description: User not found
 *          500:
 *              description: Server error
 */

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookie.refreshToken

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
            }
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const accessToken = generateAccessToken(user)

        return res.json({
            accessToken
        })
    } catch (err) {
        return res.status(403).json({
            message: 'Invalid refresh token'
        })
    }
}

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *      summary: Logout user
 *      tags: [Auth]
 * 
 *      description: Delets refresh token from httpOnly cookie
 *      
 *      responses:
 *          200:
 *              description: Logout successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *          500:
 *              description: Server error
 */

export const logout = async (req, res, next) => {
    try{
        res.clearCookie('refreshToken')

        await createAuditLog({
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