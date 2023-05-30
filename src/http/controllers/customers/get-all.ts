import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetAllCustomerProfileUseCase } from '@use-case/factories/make-get-all-customers';
import { z } from 'zod';
import { CustomersNotFoundError } from '@use-case/errors/customers-not-found';

export async function getAll(request: FastifyRequest, response: FastifyReply) {

	try {
		const getAllCustomerProfileUseCase = makeGetAllCustomerProfileUseCase();

		const { customers } = await getAllCustomerProfileUseCase.execute();

		return response.status(200).send({
			customers
		});

	} catch (err) {
		if (err instanceof CustomersNotFoundError) {
			return response.status(400).send({
				message: err.message
			});
		}
		else {

		}
		throw err;
	}
}