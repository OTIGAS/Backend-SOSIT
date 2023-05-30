import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CustomerAlreadyExistsError } from '@use-case/errors/customer-already-exists';
import { makeRegisterCustomerUseCase } from '@use-case/factories/make-register-customer-use-case';

export async function register(request: FastifyRequest, response: FastifyReply) {
	const customerRegisterBodySchema = z.object({
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
		nascimento
	} = customerRegisterBodySchema.parse(request.body);

	try {
		const registerCustomerUseCase = makeRegisterCustomerUseCase();

		await registerCustomerUseCase.execute({
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
			nascimento
		});
	} catch (err) {
		if (err instanceof CustomerAlreadyExistsError) {
			return response.status(409).send({
				message: err.message
			});
		}
		throw err;
	}

	return response.status(201).send();
}