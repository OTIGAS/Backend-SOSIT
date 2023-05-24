import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetCostumerProfileUseCase } from '@use-case/factories/make-get-costumer-profile';
import { z } from 'zod';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';

export async function get(request: FastifyRequest, response: FastifyReply) {

	const costumerUpdateParamsSchema = z.object({
		costumerId: z.string().uuid()
	});

	try {
		const { costumerId } = costumerUpdateParamsSchema.parse(request.params);

		const getCostumerProfileUseCase = makeGetCostumerProfileUseCase();

		const { costumer } = await getCostumerProfileUseCase.execute({ costumerId });

		return response.status(200).send({
			costumer: {
				...costumer,
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