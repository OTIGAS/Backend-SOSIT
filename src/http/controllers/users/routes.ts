import { register } from './register';
import { authenticate } from './authenticate';
import { update } from './update';
import { get } from './get-profile';
import { profile } from './profile';

import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register);

	app.post('/users/authenticate', authenticate);

	app.patch('/users/update/:userId', update);

	app.get('/users/get-profile/:userId', get);

	// app.get('/users/me', { onRequest: [verifyJWT] }, profile)

}  