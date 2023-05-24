import { Schedule } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { SchedulesRepository } from '@repositories/schedules-repository';

interface GetScheduleProfileUseCaseRequest {
	scheduleId: string;
}

interface GetScheduleProfileUseCaseResponse {
	schedule: Schedule;
}

export class GetScheduleProfileUseCase {
	constructor(private schedulesRepository: SchedulesRepository) { }

	async execute({
		scheduleId,
	}: GetScheduleProfileUseCaseRequest): Promise<GetScheduleProfileUseCaseResponse> {
		const schedule = await this.schedulesRepository.findById(scheduleId);

		if (!schedule) {
			throw new ResourceNotFoundError();
		}

		return {
			schedule
		};
	}
}