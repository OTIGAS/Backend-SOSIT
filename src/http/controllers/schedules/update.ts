import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-case/errors/resource-not-found-error';
import { makeUpdateScheduleUseCase } from '@/use-case/factories/make-update-schedule';
import { ScheduleAlreadyExistsError } from '@/use-case/errors/schedule-already-exists';

export async function update(request: FastifyRequest, response: FastifyReply) {

	const scheduleUpdateParamsSchema = z.object({
		scheduleId: z.string().uuid()
	});

	const companyUpdateParamsSchema = z.object({
		companyId: z.string().uuid()
	});

	const scheduleUpdateBodySchema = z.object({
		nome: z.string(),
		servico: z.string(),
		descricao: z.string(),
		dias_semana: z.string().array(),
	});

	try {
		const { scheduleId } = scheduleUpdateParamsSchema.parse(request.params);

		const { companyId } = companyUpdateParamsSchema.parse(request.params);

		const {
			nome,
			servico,
			descricao,
			dias_semana,
		} = scheduleUpdateBodySchema.parse(request.body);

		const updateScheduleUseCase = makeUpdateScheduleUseCase();

		const updatedUser = await updateScheduleUseCase.execute({
			id: scheduleId,
			nome,
			servico,
			descricao,
			dias_semana,
			companyId,
		});

		return response.status(200).send({
			user: updatedUser
		});
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return response.status(409).send({
				message: error.message
			});
		} else if (error instanceof ScheduleAlreadyExistsError) {
			return response.status(409).send({
				message: error.message
			});
		}
		throw error;
	}
}
