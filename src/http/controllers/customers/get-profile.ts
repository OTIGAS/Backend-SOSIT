import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetCustomerProfileUseCase } from '@use-case/factories/make-get-customer-profile';
import { z } from 'zod';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';

export async function get(request: FastifyRequest, response: FastifyReply) {

	const customerUpdateParamsSchema = z.object({
		customerId: z.string().uuid()
	});

	const { customerId } = customerUpdateParamsSchema.parse(request.params);

	try {

		const getCustomerProfileUseCase = makeGetCustomerProfileUseCase();

		const { customer } = await getCustomerProfileUseCase.execute({ customerId });

		return response.status(200).send({
			customer: {
				...customer,
				senha_hash: undefined
			}
		});

	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return response.status(400).send({
				message: err.message
			});
		}
		else {

		}
		throw err;
	}
}