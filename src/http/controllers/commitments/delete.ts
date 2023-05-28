import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteCommitmentUseCase } from '@use-case/factories/make-delete-commitment';
import { z } from 'zod';

export async function deleteCommitment(request: FastifyRequest, response: FastifyReply) {

	const commitmentGetParamsSchema = z.object({
		commitmentId: z.string().uuid()
	});

	const { commitmentId } = commitmentGetParamsSchema.parse(request.params);

	try {
		const deleteCommitmentUseCase = makeDeleteCommitmentUseCase();

		await deleteCommitmentUseCase.execute({ commitmentId });

	} catch (err) {
		throw err;
	}

	return response.status(204).send({ message: 'Compromisso deletado com sucesso!' });
}