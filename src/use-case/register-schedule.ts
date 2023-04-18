import { Schedule } from "@prisma/client";
import { SchedulesRepository } from "@/repositories/schedules-repository";
import { ScheduleAlreadyExistsError } from "./errors/schedule-already-exists";
import { ScheduleNotFoundError } from "./errors/schedule-not-found-error";

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

		const scheduleWithSameName = await this.schedulesRepository.findByName(nome);

		if (scheduleWithSameName) {
			throw new ScheduleAlreadyExistsError();
		}

		const existingSchedule = await this.schedulesRepository.findByService(servico);

		if (!existingSchedule) {
			throw new ScheduleNotFoundError();
		}

		const schedule = await this.schedulesRepository.create({
			nome: nome,
			servico: servico,
			descricao: descricao,
			dias_semana: dias_semana,
			company_id: companyId
		})

		return {
			schedule
		}
	}
}