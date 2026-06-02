import express from 'express'
import { register, login, refresh, logout } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

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

router.post('/login', login)

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

router.post('/register', register)

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

router.post('/refresh', refresh)

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

router.post('/logout', authMiddleware, logout)

export default router
