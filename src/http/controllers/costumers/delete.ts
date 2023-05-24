import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteCostumerUseCase } from '@use-case/factories/make-delete-costumer';
import { z } from 'zod';

export async function deleteCostumer(request: FastifyRequest, response: FastifyReply) {

	const costumerDeleteParamsSchema = z.object({
		costumerId: z.string().uuid()
	});

	const { costumerId } = costumerDeleteParamsSchema.parse(request.params);

	try {
		const deleteCostumerUseCase = makeDeleteCostumerUseCase();

		await deleteCostumerUseCase.execute({ costumerId });

	} catch (err) {
		throw err;
	}

	return response.status(204).send({ message: 'Usuario deletado com sucesso!' });
}