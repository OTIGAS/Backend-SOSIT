import { authenticate } from './authenticate';
import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { profile } from './profile';
import { update } from './update';
import { get } from './get-profile';

export async function companiesRoutes(app: FastifyInstance) {

    app.post('/companies', register);

    app.post('/companies/authenticate', authenticate);

    app.patch('/companies/update/:id', update);

    app.get('/companies/get-profile/:id', get);

    // app.get('/companies/me', { onRequest: [verifyJWT] }, profile)

}  