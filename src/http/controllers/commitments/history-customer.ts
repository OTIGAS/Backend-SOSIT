import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchCostumerCommitmentHistoryUseCase } from '@use-case/factories/make-fetch-costumer-commitment-history';

export async function historyCustomer(request: FastifyRequest, response: FastifyReply) {

	const costumerRegisterParamsSchema = z.object({
		costumerId: z.string().uuid()
	});

	const requestData = { costumerId: request.user.sub };

	const { costumerId } = costumerRegisterParamsSchema.parse(requestData);

	try {
		const fetchCustumerCommitmentUseCase = makeFetchCostumerCommitmentHistoryUseCase();

		const { commitments } = await fetchCustumerCommitmentUseCase.execute({ costumerId });

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
