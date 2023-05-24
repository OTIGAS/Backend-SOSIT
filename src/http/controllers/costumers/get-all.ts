import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetAllCostumerProfileUseCase } from '@use-case/factories/make-get-all-costumers';
import { z } from 'zod';
import { CostumersNotFoundError } from '@use-case/errors/costumers-not-found';

export async function getAll(request: FastifyRequest, response: FastifyReply) {

	try {
		const getAllCostumerProfileUseCase = makeGetAllCostumerProfileUseCase();

		const { costumers } = await getAllCostumerProfileUseCase.execute();

		return response.status(200).send({
			costumers
		});

	} catch (err) {
		if (err instanceof CostumersNotFoundError) {
			return response.status(400).send({
				message: err.message
			});
		}
		else {

		}
		throw err;
	}
}