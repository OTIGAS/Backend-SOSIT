import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@repositories/schedules-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
// import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists';

interface UpdateScheduleUseCaseRequest {
	id: string;
	nome: string;
	servico: string;
	descricao: string;
	dias_semana: string[];
}

interface UpdateScheduleUseCaseResponse {
	schedule: Schedule;
}

export class UpdateScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		id, nome, servico, descricao, dias_semana
	}: UpdateScheduleUseCaseRequest): Promise<UpdateScheduleUseCaseResponse> {

		const scheduleNotFound = await this.schedulesRepository.findById(id);

		if (!scheduleNotFound) {
			throw new ResourceNotFoundError();
		}

		// const costumerWithSameName = await this.schedulesRepository.findByNome(nome);

		// if (costumerWithSameName) {
		// 	throw new ScheduleAlreadyExistsError();
		// }

		const schedule = await this.schedulesRepository.update({
			id,
			nome,
			servico,
			descricao,
			dias_semana,
		});

		return {
			schedule
		};
	}
}