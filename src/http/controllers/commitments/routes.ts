import { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';

import { get } from './get-profile';
import { register } from './register';
import { historyCustomer } from './history-customer';
import { historySchedule } from './history-schedule';
import { deleteCommitment } from './delete';

export async function commitmentRoutes(app: FastifyInstance) {

	app.addHook('onRequest', verifyJWT);

	app.post('/commitment/schedules/:scheduleId', register);

	app.delete('/commitment/:commitmentId', deleteCommitment);

	app.get('/commitment/:commitmentId', get);

	app.get('/commitment/schedules/history-costumer', historyCustomer);

	app.get('/commitment/schedules/history-schedule/:scheduleId', historySchedule);


}   