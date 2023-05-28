import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFindSchedulesByCompanyNameUseCase } from '@use-case/factories/make-find-by-name-company';

export async function findSchedulesByCompanyNomeFantasia(request: FastifyRequest, response: FastifyReply) {
	const findSchedulesByCompanyNomeFantasiaSchema = z.object({
		query: z.string()
	});

	const { query } = findSchedulesByCompanyNomeFantasiaSchema.parse(request.body);

	console.log(query);

	try {
		const getByServiceScheduleUseCase = makeFindSchedulesByCompanyNameUseCase();

		const { schedules } = await getByServiceScheduleUseCase.execute({
			nomeFantasia: query,
		});

		return response.status(200).send({
			schedules
		});

	} catch (err) {
		if (err) {
			return response.status(400).send({
				message: err
			});
		}
		throw err;
	}
}