import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterScheduleUseCase } from '@/use-case/factories/make-register-schedule-use-case';
import { ScheduleNotFoundError } from '@/use-case/errors/schedule-not-found-error';
import { ScheduleAlreadyExistsError } from '@/use-case/errors/schedule-already-exists';
import { makeCommitmentUseCase } from '@/use-case/factories/make-commitment-use-case';

export async function register(request: FastifyRequest, response: FastifyReply) {

	const scheduleRegisterParamsSchema = z.object({
		scheduleId: z.string().uuid()
	});

	const userRegisterParamsSchema = z.object({
		userId: z.string().uuid()
	});

	const scheduleRegisterBodySchema = z.object({
		startDateTime: z.string(),
		endDateTime: z.string(),
	});

	const { scheduleId } = scheduleRegisterParamsSchema.parse(request.params);
	const { userId } = userRegisterParamsSchema.parse(request.params);

	const {
		startDateTime,
		endDateTime
	} = scheduleRegisterBodySchema.parse(request.body);

	try {
		const registerCommitmnetUseCase = makeCommitmentUseCase();

		await registerCommitmnetUseCase.execute({
			userId,
			scheduleId,
			startDateTime,
			endDateTime
		});

	} catch (err) {
		if (err) {
			return response.status(409).send({
				message: err
			});
		}
		else {

		}
		throw err;
	}

	return response.status(201).send();
}
