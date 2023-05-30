import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchCustomerCommitmentHistoryUseCase } from '@use-case/factories/make-fetch-customer-commitment-history';

export async function historyCustomer(request: FastifyRequest, response: FastifyReply) {

	const customerRegisterParamsSchema = z.object({
		customerId: z.string().uuid()
	});

	const requestData = { customerId: request.user.sub };

	const { customerId } = customerRegisterParamsSchema.parse(requestData);

	try {
		const fetchCustumerCommitmentUseCase = makeFetchCustomerCommitmentHistoryUseCase();

		const { commitments } = await fetchCustumerCommitmentUseCase.execute({ customerId });

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
