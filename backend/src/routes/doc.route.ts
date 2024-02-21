import express from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs.json';

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(docs));

export default router;
