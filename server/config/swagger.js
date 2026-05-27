import { version } from "react"
import swaggerJSDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Archive API',

            version: '1.0.0',

            description: 'API for archive management system'
        },

        servers: [
            {
                url: 'http://localhost:5000'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ['./controllers/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec