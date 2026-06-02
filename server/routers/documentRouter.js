import express from 'express'
import { getDocument, getDocuments, createDocument, updateDocument, deleteDocument } from '../controllers/documentController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { permissionMiddleware } from '../middleware/permissionMiddleware.js'
import { validate } from '../middleware/validationMiddleware.js'
import { createDocumentSchema, updateDocumentSchema } from '../validation/documentValidation.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/documents:
 *  get:
 *      summary: get all documents
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *          - in: query
 *            name: sort
 *            schema:
 *              type: string
 *          - in: query
 *            name: order
 *            schema:
 *              type: string
 * 
 *      responses:
 *          200:
 *              description: List of documents with pagination
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              documents:
 *                                  type: array
 *                              total:
 *                                  type: integer
 *                              page:
 *                                  type: integer
 *                              limit:
 *                                  type: integer
 *                              totalPages:
 *                                  type: integer
 *          500:
 *              description: Server error
 */

router.get('/', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getDocuments)

/**
 * @swagger
 * /api/documents/{id}:
 *  get:
 *      summary: get one document
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: document found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          404:
 *              description: document not found
 *          500:
 *              description: Server error
 */

router.get('/:id', authMiddleware, roleMiddleware(['user', 'admin']), permissionMiddleware('view_document'), getDocument)

/**
 * @swagger
 * /api/documents:
 *  post:
 *      summary: create new document
 *      tags: [Documents]
 * 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          inventory_number:
 *                              type: string
 *                          quantity_total:
 *                              type: string
 *      responses:
 *          201:
 *              description: created document
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              document:
 *                                  type: object
 *          500:
 *              description: Server error
 */

router.post('/', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('create_document'), validate(createDocumentSchema), createDocument)

/**
 * @swagger
 * /api/documents/{id}:
 *  put:
 *      summary: update document parameters
 *      tags: [Documents]
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
 *                          title:
 *                              type: string
 *                          subject:
 *                              type: string
 *                          inventory_number:
 *                              type: string
 *                          quantity_total:
 *                              type: integer
 *      responses:
 *          200:
 *              description: successfully updated document
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              document:
 *                                  type: object
 *          404:
 *              description: document not found
 *          500:
 *              description: Server error
 */

router.put('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('update_document'), validate(updateDocumentSchema), updateDocument)

/**
 * @swagger
 * /api/documents/{id}:
 *  delete:
 *      summary: delete document
 *      tags: [Documents]
 * 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: successfully deleted document
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: oject
 *                          properties:
 *                              message:
 *                                  type: string
 *          404:
 *              description: document not found
 *          500:
 *              description: Server error
 */

router.delete('/:id', authMiddleware, roleMiddleware(['admin']), permissionMiddleware('delete_document'), deleteDocument)

export default router