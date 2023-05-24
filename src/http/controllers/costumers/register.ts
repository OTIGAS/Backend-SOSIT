import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CostumerAlreadyExistsError } from '@use-case/errors/costumer-already-exists';
import { makeRegisterCostumerUseCase } from '@use-case/factories/make-register-costumer-use-case';

export async function register(request: FastifyRequest, response: FastifyReply) {
	const costumerRegisterBodySchema = z.object({
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
	} = costumerRegisterBodySchema.parse(request.body);

	try {
		const registerCostumerUseCase = makeRegisterCostumerUseCase();

		await registerCostumerUseCase.execute({
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
		if (err instanceof CostumerAlreadyExistsError) {
			return response.status(409).send({
				message: err.message
			});
		}
		throw err;
	}

	return response.status(201).send();
}