import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteCompanyUseCase } from '@use-case/factories/make-delete-company';
import { z } from 'zod';

export async function deleteCompany(request: FastifyRequest, response: FastifyReply) {

	const companyDeleteParamsSchema = z.object({
		companyId: z.string().uuid()
	});

	const { companyId } = companyDeleteParamsSchema.parse(request.params);

	try {
		const deleteCompanyUseCase = makeDeleteCompanyUseCase();

		await deleteCompanyUseCase.execute({ companyId });

	} catch (err) {
		throw err;
	}

	return response.status(204).send({ message: 'Empresa deletada com sucesso!' });
}