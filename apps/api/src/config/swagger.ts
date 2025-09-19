import { Express } from 'express'
// Import with type-friendly namespaces to satisfy TS when @types are partial
import swaggerJsdoc = require('swagger-jsdoc')
import * as swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FullStack Learning Hub API',
      version: '1.0.0',
      description: 'API documentation for FullStack Learning Hub - A comprehensive platform for learning Full Stack Development',
      contact: {
        name: 'FullStack Learning Hub Team',
        email: 'support@fullstackhub.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://api.fullstackhub.com'
          : `http://localhost:${process.env.PORT || 3001}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User unique identifier',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
            },
            role: {
              type: 'string',
              enum: ['student', 'mentor', 'admin'],
              description: 'User role',
            },
            isVerified: {
              type: 'boolean',
              description: 'Email verification status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
            },
          },
        },
        Module: {
          type: 'object',
          required: ['title', 'description', 'difficulty'],
          properties: {
            _id: {
              type: 'string',
              description: 'Module unique identifier',
            },
            title: {
              type: 'string',
              description: 'Module title',
            },
            description: {
              type: 'string',
              description: 'Module description',
            },
            difficulty: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              description: 'Module difficulty level',
            },
            lessons: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Lesson',
              },
              description: 'Module lessons',
            },
          },
        },
        Lesson: {
          type: 'object',
          required: ['title', 'content', 'type'],
          properties: {
            _id: {
              type: 'string',
              description: 'Lesson unique identifier',
            },
            title: {
              type: 'string',
              description: 'Lesson title',
            },
            content: {
              type: 'string',
              description: 'Lesson content',
            },
            type: {
              type: 'string',
              enum: ['video', 'text', 'interactive', 'quiz'],
              description: 'Lesson type',
            },
            duration: {
              type: 'number',
              description: 'Lesson duration in minutes',
            },
            order: {
              type: 'number',
              description: 'Lesson order in module',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Error status',
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            stack: {
              type: 'string',
              description: 'Error stack trace (development only)',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // paths to files containing OpenAPI definitions
}

const specs = swaggerJsdoc(options)

export const swaggerSetup = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'FullStack Learning Hub API Documentation',
  }))
}
