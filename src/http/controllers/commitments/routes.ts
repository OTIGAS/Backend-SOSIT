import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

import { register } from './register';
import { historyCustomer } from './history-customer';
import { historySchedule } from './history-schedule';

export async function commitmentRoutes(app: FastifyInstance) {

	app.addHook('onRequest', verifyJWT);

	app.post('/commitment/schedules/:scheduleId', register);

	app.get('/commitment/schedules/history-costumer', historyCustomer);

	app.get('/commitment/schedules/history-schedule/:scheduleId', historySchedule);


}   