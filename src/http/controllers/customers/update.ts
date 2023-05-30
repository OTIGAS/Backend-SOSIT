import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { makeUpdateCustomerUseCase } from '@use-case/factories/make-update-customer';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';

export async function update(request: FastifyRequest, response: FastifyReply) {

	const customerUpdateParamsSchema = z.object({
		customerId: z.string().uuid()
	});

	const customerUpdateBodySchema = z.object({
		nome: z.string(),
		email: z.string().email(),
		senha: z.string().min(6),
		cpf: z.string(),
		telefone: z.string(),
		cep: z.string(),
		estado: z.string(),
		cidade: z.string(),
		rua: z.string(),
		numero: z.string(),
		nascimento: z.string()
	});

	try {
		const { customerId } = customerUpdateParamsSchema.parse(request.params);

		const {
			nome,
			email,
			senha,
			cpf,
			telefone,
			cep,
			estado,
			cidade,
			rua,
			numero,
			nascimento,
		} = customerUpdateBodySchema.parse(request.body);

		const updateCustomerUseCase = makeUpdateCustomerUseCase();

		const updatedCustomer = await updateCustomerUseCase.execute({
			id: customerId,
			nome,
			email,
			senha_hash: senha,
			cpf,
			telefone,
			cep,
			estado,
			cidade,
			rua,
			numero,
			nascimento
		});

		return response.status(200).send({
			customer: updatedCustomer
		});
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return response.status(409).send({
				message: error.message
			});
		}
		throw error;
	}
}
