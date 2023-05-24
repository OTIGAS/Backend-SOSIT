import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredencialsError } from '@use-case/errors/invalid-credencials-error';
import { z } from 'zod';
import { makeGetScheduleProfileUseCase } from '@use-case/factories/make-get-schedule-profile';

export async function get(request: FastifyRequest, response: FastifyReply) {

	const scheduleGetParamsSchema = z.object({
		scheduleId: z.string().uuid()
	});

	try {
		const { scheduleId } = scheduleGetParamsSchema.parse(request.params);

		const getScheduleProfileUseCase = makeGetScheduleProfileUseCase();

		const { schedule } = await getScheduleProfileUseCase.execute({ scheduleId });

		return response.status(200).send({ schedule });

	} catch (err) {
		if (err instanceof InvalidCredencialsError) {
			return response.status(400).send({
				message: err.message
			});
		}
		throw err;
	}
}