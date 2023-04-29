import { FastifyInstance } from 'fastify';

import { verifyJWT } from '../../middlewares/verify-jwt';
import { register } from './history';

export async function commitmentRoutes(app: FastifyInstance) {

	app.addHook('onRequest', verifyJWT);

	app.post('/commitment/schedules/:scheduleId/users/:userId', register);


}   