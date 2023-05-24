import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { makeUpdateCostumerUseCase } from '@use-case/factories/make-update-costumer';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';

export async function update(request: FastifyRequest, response: FastifyReply) {

	const costumerUpdateParamsSchema = z.object({
		costumerId: z.string().uuid()
	});

	const costumerUpdateBodySchema = z.object({
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
		const { costumerId } = costumerUpdateParamsSchema.parse(request.params);

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
		} = costumerUpdateBodySchema.parse(request.body);

		const updateCostumerUseCase = makeUpdateCostumerUseCase();

		const updatedCostumer = await updateCostumerUseCase.execute({
			id: costumerId,
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
			costumer: updatedCostumer
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
