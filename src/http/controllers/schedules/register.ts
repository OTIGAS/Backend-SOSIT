import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterScheduleUseCase } from '@use-case/factories/make-register-schedule-use-case';
import { ScheduleAlreadyExistsError } from '@use-case/errors/schedule-already-exists';
import { makeGetCompanyProfileUseCase } from '@use-case/factories/make-get-company-profile';

export async function register(request: FastifyRequest, response: FastifyReply) {

	const scheduleRegisterParamsSchema = z.object({
		companyId: z.string().uuid(),
	});

	const scheduleRegisterBodySchema = z.object({
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

	const requestData = { companyId: request.user.sub };

	const { companyId } = scheduleRegisterParamsSchema.parse(requestData);

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
		horarios_sab,
	} = scheduleRegisterBodySchema.parse(request.body);

	try {

		const registerScheduleUseCase = makeRegisterScheduleUseCase();

		await registerScheduleUseCase.execute({
			nome,
			servico,
			descricao,
			dias_semana,
			companyId,
			horarios_seg,
			horarios_ter,
			horarios_qua,
			horarios_qui,
			horarios_sex,
			horarios_sab,
		});

	} catch (err) {
		if (err instanceof ScheduleAlreadyExistsError) {
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