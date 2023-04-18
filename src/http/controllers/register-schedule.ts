import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterScheduleUseCase } from '@/use-case/factories/make-register-schedule-use-case';
import { ScheduleNotFoundError } from '@/use-case/errors/schedule-not-found-error';

export async function registerSchedule(request: FastifyRequest, response: FastifyReply) {
	const scheduleRegisterBodySchema = z.object({
		nome: z.string(),
		servico: z.string(),
		descricao: z.string(),
		dias_semana: z.string().array(),
		companyId: z.string(),
	});

	const {
		nome,
		servico,
		descricao,
		dias_semana,
		companyId,
	} = scheduleRegisterBodySchema.parse(request.body);

	try {
		const registerScheduleUseCase = makeRegisterScheduleUseCase();

		await registerScheduleUseCase.execute({
			nome,
			servico,
			descricao,
			dias_semana,
			companyId,
		});

	} catch (err) {
		if (err instanceof ScheduleNotFoundError) {
			return response.status(409).send({
				message: err.message
			});
		}
		else {

		}
		throw err;
	}

	return response.status(201).send();
}