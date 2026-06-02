import express from 'express'
import { createDocumentLocation, updateDocumentLocation, getDocumentLocation } from '../controllers/documentLocationController.js'
import { moveDocument } from '../controllers/documentMovementController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'
import { createDocumentLocationSchema, updateDocumentLocationSchema } from '../validation/locationSchemas.js'
import { moveDocumentSchema } from '../validation/documentValidation.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/locations:
 *  post:
 *      summary: create document location
 *      tags: [Document locations]
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          document_id:
 *                              type: integer
 *                          cell_id:
 *                              type: integer
 *                          quantity:
 *                              type: integer
 *      responses:
 *          201:
 *              description: Location created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              location:
 *                                  type: object
 *          500:
 *              description: Server error                    
 */

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(createDocumentLocationSchema), createDocumentLocation)

/**
 * @swagger
 * /api/locations/{id}:
 *  put:
 *      summary: update documet location
 *      tags: [Document locations]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          cell_id:
 *                              type: integer
 *                          quantity:
 *                              type: integer
 *      responses:
 *          200:
 *              description: location updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              updatedLocation:
 *                                  type: object
 *          500:
 *             description: Server error 
 */

router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(updateDocumentLocationSchema), updateDocumentLocation)

/**
 * @swagger
 * /api/locations/documents/{id}:
 *  get:
 *      summary: get document location
 *      tags: [Document locations]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: list of locations
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              location:
 *                                  type: object
 *          500:
 *              description: Server error
 */

router.get('/document/:id', authMiddleware, roleMiddleware(['admin', 'user']), permissionMiddleware('view_document'), getDocumentLocation)

/**
 * @swagger
 * /api/locations/move:
 *  post:
 *      summary: move document
 *      tags: [Document movement]
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                  properties:
 *                      location_id:
 *                          type: integer
 *                      new_cell_id:
 *                          type: integer
 *      responses:
 *          200:
 *              description: document moved
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              moved:
 *                                  type: object
 *          500:
 *              description: Server error
 */

router.post('/move', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('manage_locations'), validate(moveDocumentSchema), moveDocument)

export default router