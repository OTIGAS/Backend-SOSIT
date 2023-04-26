import { authenticate } from './authenticate';
import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { profile } from './profile';

export async function companiesRoutes(app: FastifyInstance) {
    app.post('/companies', register);
    app.post('/authenticate-company', authenticate);

    app.get('/companies/me', { onRequest: [verifyJWT] }, profile)

}  