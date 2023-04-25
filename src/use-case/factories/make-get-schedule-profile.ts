import { GetScheduleProfileUseCase } from '../get-schedule-profile';
import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedule-repository';

export function makeGetScheduleProfileUseCase() {

    const scheduleRepository = new PrismaSchedulesRepository();
    const useCase = new GetScheduleProfileUseCase(scheduleRepository);

    return useCase;
}