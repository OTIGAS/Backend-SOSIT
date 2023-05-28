import { register } from './register';
import { authenticate } from './authenticate';
import { update } from './update';
import { get } from './get-profile';
import { getAll } from './get-all';
import { profile } from './profile';
import { deleteCostumer } from './delete';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function costumersRoutes(app: FastifyInstance) {
	app.post('/costumers', register);

	app.post('/costumers/authenticate', authenticate);

	app.delete('/costumers/:costumerId', deleteCostumer);

	app.patch('/costumers/:costumerId', update);

	app.get('/costumers/all', getAll);

	app.get('/costumers/:costumerId', get);

	app.get('/costumers/me', { onRequest: [verifyJWT] }, profile);

}  