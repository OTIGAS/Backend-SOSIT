import { Schedule } from '@prisma/client';
import { SchedulesRepository } from '@/repositories/schedules-repository';

interface SearchScheduleUseCaseRequest {
    query: string;
}

interface SearchScheduleUseCaseResponse {
    schedules: Schedule[];
}

export class SearchScheduleUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		query
	}: SearchScheduleUseCaseRequest): Promise<SearchScheduleUseCaseResponse> {

		const schedules = await this.schedulesRepository.searchMany(query);

		return {
			schedules
		};
	}
}