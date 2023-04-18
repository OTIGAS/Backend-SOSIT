import { authenticateCompany } from './controllers/authenticate-company';
import { authenticateUser } from './controllers/authenticate-user';
import { registerCompany } from './controllers/register-company';
import { registerSchedule } from './controllers/register-schedule';
import { registerUser } from './controllers/register-user';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
	app.post('/users', registerUser);
	app.post('/companies', registerCompany);
	app.post('/schedules', registerSchedule);

	app.post('/authenticate-user', authenticateUser);
	app.post('/authenticate-company', authenticateCompany);
}   