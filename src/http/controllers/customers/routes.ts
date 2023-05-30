import { register } from './register';
import { authenticate } from './authenticate';
import { update } from './update';
import { get } from './get-profile';
import { getAll } from './get-all';
import { profile } from './profile';
import { deleteCustomer } from './delete';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function customersRoutes(app: FastifyInstance) {
	app.post('/customers', register);

	app.post('/customers/authenticate', authenticate);

	app.delete('/customers/:customerId', deleteCustomer);

	app.patch('/customers/:customerId', update);

	app.get('/customers/all', getAll);

	app.get('/customers/:customerId', get);

	app.get('/customers/me', { onRequest: [verifyJWT] }, profile);

}  