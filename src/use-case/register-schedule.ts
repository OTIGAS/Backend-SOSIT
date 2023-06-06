import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@repositories/schedules-repository';
import { ScheduleAlreadyExistsError } from './errors/schedule-already-exists';

interface ScheduleUseCaseRequest {
	nome: string;
	servico: string;
	descricao: string;
	dias_semana: string[];

	horarios_seg: string[];
	horarios_ter: string[];
	horarios_qua: string[];
	horarios_qui: string[];
	horarios_sex: string[];
	horarios_sab: string[];

	companyId: string;
}

interface ScheduleUseCaseResponse {
	schedule: Schedule;
}

export class RegisterScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
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
	}: ScheduleUseCaseRequest): Promise<ScheduleUseCaseResponse> {

		const customerWithSameName = await this.schedulesRepository.findByNomeAndCompany(nome, companyId);

		if (customerWithSameName) {
			throw new ScheduleAlreadyExistsError();
		}

		const schedule = await this.schedulesRepository.create({
			nome: nome,
			servico: servico,
			descricao: descricao,
			dias_semana: dias_semana,

			horarios_seg: horarios_seg,
			horarios_ter: horarios_ter,
			horarios_qua: horarios_qua,
			horarios_qui: horarios_qui,
			horarios_sex: horarios_sex,
			horarios_sab: horarios_sab,
		
			company_id: companyId
		});

		return {
			schedule
		};
	}
}