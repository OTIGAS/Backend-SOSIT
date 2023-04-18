import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@/repositories/schedules-repository';

interface ScheduleUseCaseRequest {
	nome: string;
	servico: string;
	descricao: string;
	dias_semana: string[];

	companyId: string;
}

interface ScheduleUseCaseResponse {
	schedule: Schedule;
}

export class RegisterScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		nome, servico, descricao, dias_semana, companyId
	}: ScheduleUseCaseRequest): Promise<ScheduleUseCaseResponse> {

		const schedule = await this.schedulesRepository.create({
			nome: nome,
			servico: servico,
			descricao: descricao,
			dias_semana: dias_semana,
			company_id: companyId
		});

		return {
			schedule
		};
	}
}