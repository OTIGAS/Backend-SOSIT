import { SchedulesRepository } from '@/repositories/schedules-repository';
import { Schedule } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ScheduleNotFoundError } from './errors/schedule-not-found-error'

interface GetScheduleProfileUseCaseResponse {
    schedules: Schedule[];
}

export class GetAllScheduleProfileUseCase {
    constructor(private usersRepository: SchedulesRepository) { }

    async execute(): Promise<GetScheduleProfileUseCaseResponse> {
        const schedules = await this.usersRepository.getAll();

        if (!schedules) {
            throw new ScheduleNotFoundError();
        }

        return {
            schedules
        };
    }
}