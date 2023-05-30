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
	constructor(private customerRepository: SchedulesRepository) { }

	async execute({ scheduleId }: DeleteScheduleUseCaseRequest): Promise<DeleteScheduleUseCaseResponse> {

		const schedule = await this.customerRepository.findById(scheduleId);

		if (!schedule) {
			throw new ScheduleNotFoundError();
		}

		await this.customerRepository.delete(scheduleId);

		return { schedule };
	}
}