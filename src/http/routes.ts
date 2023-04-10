import { authenticateUser } from './controllers/authenticate-user';
import { registerCompany } from './controllers/register-company';
import { registerUser } from './controllers/register-user';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', registerUser);
	app.post('/companies', registerCompany);

	app.post('/sessions', authenticateUser);

}   