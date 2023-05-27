import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@repositories/schedules-repository';

interface GetByServiceScheduleUseCaseRequest {
	query: string;
}

interface GetByServiceScheduleUseCaseResponse {
	schedules: Schedule[];
}

export class GetByServiceScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		query
	}: GetByServiceScheduleUseCaseRequest): Promise<GetByServiceScheduleUseCaseResponse> {

		const schedules = await this.schedulesRepository.getByService(query);

		return {
			schedules
		};
	}
}