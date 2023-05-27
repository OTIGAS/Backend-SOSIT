import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';
import { makeUpdateScheduleUseCase } from '@use-case/factories/make-update-schedule';
import { ScheduleAlreadyExistsError } from '@use-case/errors/schedule-already-exists';

export async function update(request: FastifyRequest, response: FastifyReply) {

	const companyGetParamsSchema = z.object({
		companyId: z.string().uuid(),
	});

	const requestData = { companyId: request.user.sub };

	const { companyId } = companyGetParamsSchema.parse(requestData);

	const scheduleUpdateParamsSchema = z.object({
		scheduleId: z.string().uuid()
	});

	const scheduleUpdateBodySchema = z.object({
		nome: z.string(),
		servico: z.string(),
		descricao: z.string(),
		dias_semana: z.string().array(),

		horarios_seg: z.string().array(),
		horarios_ter: z.string().array(),
		horarios_qua: z.string().array(),
		horarios_qui: z.string().array(),
		horarios_sex: z.string().array(),
		horarios_sab: z.string().array(),
	});

	const { scheduleId } = scheduleUpdateParamsSchema.parse(request.params);

	const {
		nome,
		servico,
		descricao,
		dias_semana,

		horarios_seg,
		horarios_ter,
		horarios_qua,
		horarios_qui,
		horarios_sex,
		horarios_sab
	} = scheduleUpdateBodySchema.parse(request.body);

	try {
		const updateScheduleUseCase = makeUpdateScheduleUseCase();

		const updatedSchedule = await updateScheduleUseCase.execute({
			id: scheduleId,
			nome,
			servico,
			descricao,
			dias_semana,

			horarios_seg,
			horarios_ter,
			horarios_qua,
			horarios_qui,
			horarios_sex,
			horarios_sab,

			companyId
		});

		return response.status(200).send({
			schedule: updatedSchedule
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
