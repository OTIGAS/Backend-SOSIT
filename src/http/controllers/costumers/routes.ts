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

	app.delete('/costumers/delete/:costumerId', deleteCostumer);

	app.patch('/costumers/update/:costumerId', update);

	app.get('/costumers/get-all-costumers', getAll);

	app.get('/costumers/get/:costumerId', get);

	// app.get('/costumers/me', { onRequest: [verifyJWT] }, profile)

}  