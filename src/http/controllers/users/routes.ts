import { authenticate } from './authenticate';
import { profile } from './profile';
import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { update } from './update';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register);

    app.patch('/update/:id', update);

    app.post('/authenticate', authenticate);

    app.get('/users/me', { onRequest: [verifyJWT] }, profile)

}  