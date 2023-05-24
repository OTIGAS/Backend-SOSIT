import { SchedulesRepository } from '@repositories/schedules-repository';
import { ScheduleNotFoundError } from './errors/schedule-not-found-error';
import { Schedule } from '@prisma/client';

interface DeleteScheduleUseCaseRequest {
    scheduleId: string;
}

interface DeleteScheduleUseCaseResponse {
    schedule: Schedule;
}

export class DeleteScheduleUseCase {
	constructor(private costumerRepository: SchedulesRepository) { }

	async execute({ scheduleId }: DeleteScheduleUseCaseRequest): Promise<DeleteScheduleUseCaseResponse> {

		const schedule = await this.costumerRepository.findById(scheduleId);

		if (!schedule) {
			throw new ScheduleNotFoundError();
		}

		await this.costumerRepository.delete(scheduleId);

		return { schedule };
	}
}