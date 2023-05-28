import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetAllCommitmentsUseCase } from '@use-case/factories/make-get-all-commitments';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';

export async function getAll(request: FastifyRequest, response: FastifyReply) {

	try {
		const getAllCompaniesProfileUseCase = makeGetAllCommitmentsUseCase();

		const { commitments } = await getAllCompaniesProfileUseCase.execute();

		return response.status(200).send({
			commitments
		});

	} catch (err) {
		if (err instanceof ResourceNotFoundError) {
			return response.status(400).send({
				message: err.message
			});
		}
		throw err;
	}
}