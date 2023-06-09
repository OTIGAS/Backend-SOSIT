import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterCommitmentUseCase } from '@use-case/factories/make-register-commitment-use-case';
import { UnavailableSchedule } from '@use-case/errors/unavailable-schedule';

export async function register(request: FastifyRequest, response: FastifyReply) {

	const customerRegisterParamsSchema = z.object({
		customerId: z.string().uuid()
	});

	const requestData = { customerId: request.user.sub };


	const scheduleRegisterParamsSchema = z.object({
		scheduleId: z.string().uuid()
	});

	const scheduleRegisterBodySchema = z.object({
		startDateTime: z.string(),
		endDateTime: z.string(),
	});

	const { scheduleId } = scheduleRegisterParamsSchema.parse(request.params);

	const { customerId } = customerRegisterParamsSchema.parse(requestData);

	const {
		startDateTime,
		endDateTime
	} = scheduleRegisterBodySchema.parse(request.body);

	try {
		const registerCommitmnetUseCase = makeRegisterCommitmentUseCase();

		await registerCommitmnetUseCase.execute({
			customerId,
			scheduleId,
			startDateTime,
			endDateTime
		});

	} catch (err) {
		if (err instanceof UnavailableSchedule) {
			return response.status(409).send({
				message: err.message
			});
		}
		throw err;
	}

	return response.status(201).send();
}
