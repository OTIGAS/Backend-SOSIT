import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@/repositories/schedules-repository';

interface UpdateScheduleUseCaseRequest {
    nome: string;
    servico: string;
    descricao: string;
    dias_semana: string[];

    companyId: string;
}

interface UpdateScheduleUseCaseResponse {
    schedule: Schedule;
}

export class UpdateScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		nome, servico, descricao, dias_semana, companyId
	}: UpdateScheduleUseCaseRequest): Promise<UpdateScheduleUseCaseResponse> {

		const schedule = await this.schedulesRepository.update({
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