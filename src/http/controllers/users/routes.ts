import { register } from './register';
import { authenticate } from './authenticate';
import { update } from './update';
import { get } from './get-profile';
import { getAll } from './get-all';
import { profile } from './profile';
import { deleteUser } from './delete'
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', register);

	app.post('/users/authenticate', authenticate);

	app.delete('/users/delete/:userId', deleteUser);

	app.patch('/users/update/:userId', update);

	app.get('/users/get-all-users', getAll);

	app.get('/users/get-profile/:userId', get);

	// app.get('/users/me', { onRequest: [verifyJWT] }, profile)

}  