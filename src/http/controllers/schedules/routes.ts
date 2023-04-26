import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { search } from './seach';

export async function scheduleRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJWT)

    app.get('/schedules/search', search)

    app.post('/schedules', register);

}   