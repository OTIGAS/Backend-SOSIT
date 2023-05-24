import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetAllCompaniesProfileUseCase } from '@use-case/factories/make-get-all-companies';
import { z } from 'zod';
import { CostumersNotFoundError } from '@use-case/errors/costumers-not-found';

export async function getAll(request: FastifyRequest, response: FastifyReply) {

	try {
		const getAllCompaniesProfileUseCase = makeGetAllCompaniesProfileUseCase();

		const { companies } = await getAllCompaniesProfileUseCase.execute();

		return response.status(200).send({
			companies
		});

	} catch (err) {
		if (err instanceof CostumersNotFoundError) {
			return response.status(400).send({
				message: err.message
			});
		}
		throw err;
	}
}