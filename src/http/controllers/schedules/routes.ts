import { register } from './register';
import { getAll } from './get-all';
import { update } from './update';
import { get } from './get-profile';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { search } from './seach';
import { deleteSchedule } from './delete';

export async function scheduleRoutes(app: FastifyInstance) {

	app.addHook('onRequest', verifyJWT);

	app.post('/companies/:companyId/schedules', register);

	app.delete('/companies/:companyId/schedules/:scheduleId', deleteSchedule);

	app.get('/companies/:companyId/get-all-schedules', getAll);

	app.get('/companies/:companyId/get-schedule/:scheduleId', get);

	app.patch('/companies/:companyId/update/:scheduleId', update);

}   