import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@/repositories/schedules-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists';

interface UpdateScheduleUseCaseRequest {
	id: string;
	nome: string;
	servico: string;
	descricao: string;
	dias_semana: string[];

	companyId?: string;
}

interface UpdateScheduleUseCaseResponse {
	schedule: Schedule;
}

export class UpdateScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		id, nome, servico, descricao, dias_semana, companyId
	}: UpdateScheduleUseCaseRequest): Promise<UpdateScheduleUseCaseResponse> {

		const scheduleNotFound = await this.schedulesRepository.findById(id);

		if (!scheduleNotFound) {
			throw new ResourceNotFoundError();
		}

		// const userWithSameName = await this.schedulesRepository.findByNome(nome);

		// if (userWithSameName) {
		// 	throw new ScheduleAlreadyExistsError();
		// }

		const schedule = await this.schedulesRepository.update({
			nome,
			servico,
			descricao,
			dias_semana,
			company_id: companyId
		});

		return {
			schedule
		};
	}
}