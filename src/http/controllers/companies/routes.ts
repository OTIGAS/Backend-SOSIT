import { authenticate } from './authenticate';
import { register } from './register';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { profile } from './profile';
import { update } from './update';
import { getAll } from './get-all';
import { get } from './get-profile';
import { deleteCompany } from './delete';

export async function companiesRoutes(app: FastifyInstance) {

	app.post('/companies', register);

	app.delete('/companies/delete/:companyId', deleteCompany);

	app.post('/companies/authenticate', authenticate);

	app.patch('/companies/update/:companyId', update);

	app.get('/companies/get/:companyId', get);

	app.get('/companies/get-all-companies/', getAll);

	// app.get('/companies/me', { onRequest: [verifyJWT] }, profile)

}  