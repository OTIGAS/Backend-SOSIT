import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetByServiceScheduleUseCase } from '@use-case/factories/make-get-by-service-schedule';

export async function getByService(request: FastifyRequest, response: FastifyReply) {
	const getByServiceScheduleQuerySchema = z.object({
		query: z.string()
	});

	const { query } = getByServiceScheduleQuerySchema.parse(request.body);

	console.log(query);

	try {
		const getByServiceScheduleUseCase = makeGetByServiceScheduleUseCase();

		const { schedules } = await getByServiceScheduleUseCase.execute({
			query,
		});

		return response.status(200).send({
			schedules
		});

	} catch (err) {
		if (err) {
			return response.status(400).send({
				message: err
			});
		}
		throw err;
	}
}