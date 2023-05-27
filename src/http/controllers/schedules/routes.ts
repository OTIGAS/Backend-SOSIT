import { register } from './register';
import { getAll } from './get-all';
import { update } from './update';
import { get } from './get-profile';
import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { getByService } from './get-by-service';
import { deleteSchedule } from './delete';

export async function scheduleRoutes(app: FastifyInstance) {

	app.addHook('onRequest', verifyJWT);

	app.post('/schedules', register);

	app.delete('/schedules/:scheduleId', deleteSchedule);

	app.patch('/schedules/update/:scheduleId', update);

	app.get('/schedules/all', getAll);

	app.get('/schedule/:scheduleId', get);

	app.post('/schedules/get-by-service', getByService);

}   