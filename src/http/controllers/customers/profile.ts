import { makeGetCustomerProfileUseCase } from '@use-case/factories/make-get-customer-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, response: FastifyReply) {

	const getCustomerProfile = makeGetCustomerProfileUseCase();

	const { customer } = await getCustomerProfile.execute({
		customerId: request.user.sub
	});

	return response.status(200).send({
		customer: {
			...customer,
			senha_hash: undefined
		}
	});
}