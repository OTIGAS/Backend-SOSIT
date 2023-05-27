import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchScheduleCommitmentHistoryUseCase } from '@use-case/factories/make-fetch-schedule-commitment-history';

export async function historySchedule(request: FastifyRequest, response: FastifyReply) {

	const scheduleRegisterParamsSchema = z.object({
		scheduleId: z.string().uuid()
	});

	const { scheduleId } = scheduleRegisterParamsSchema.parse(request.params);

	try {
		const fetchScheduleCommitmentUseCase = makeFetchScheduleCommitmentHistoryUseCase();

		const { commitments } = await fetchScheduleCommitmentUseCase.execute({ scheduleId });

		return response.status(200).send({ commitments });

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

}
