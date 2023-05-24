import { makeGetCostumerProfileUseCase } from '@use-case/factories/make-get-costumer-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, response: FastifyReply) {

	const getCostumerProfile = makeGetCostumerProfileUseCase();

	const { costumer } = await getCostumerProfile.execute({
		costumerId: request.costumer.sub
	});

	return response.status(200).send({
		costumer: {
			...costumer,
			senha_hash: undefined
		}
	});
}