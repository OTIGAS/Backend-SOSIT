import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteCustomerUseCase } from '@use-case/factories/make-delete-customer';
import { z } from 'zod';

export async function deleteCustomer(request: FastifyRequest, response: FastifyReply) {

	const customerDeleteParamsSchema = z.object({
		customerId: z.string().uuid()
	});

	const { customerId } = customerDeleteParamsSchema.parse(request.params);

	try {
		const deleteCustomerUseCase = makeDeleteCustomerUseCase();

		await deleteCustomerUseCase.execute({ customerId });

	} catch (err) {
		throw err;
	}

	return response.status(204).send({ message: 'Usuario deletado com sucesso!' });
}