import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@repositories/schedules-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists';

interface UpdateScheduleUseCaseRequest {
	id: string;
	nome: string;
	servico: string;
	descricao: string;
	dias_semana: string[];

	companyId: string;

	horarios_seg: string[];
	horarios_ter: string[];
	horarios_qua: string[];
	horarios_qui: string[];
	horarios_sex: string[];
	horarios_sab: string[];
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

		const costumerWithSameName = await this.schedulesRepository.findByNomeAndCompany(nome, companyId);

		if (costumerWithSameName) {
			if (costumerWithSameName?.id != id) {
				throw new ScheduleAlreadyExistsError();
			}
		}

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