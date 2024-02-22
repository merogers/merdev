import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger.config';

const router = express.Router();

/**
 * @openapi
 * /api/v1/docs:
 *   get:
 *     summary: API Docs
 *     description: Documentation for Dev Portfolio API
 *     tags:
 *      - docs
 *     responses:
 *       200:
 *         description: Returns API Docs via Swagger UI
 */
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
