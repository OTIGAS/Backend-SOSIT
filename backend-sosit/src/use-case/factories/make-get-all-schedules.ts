import { PrismaSchedulesRepository } from '@repositories/prisma/prisma-schedule-repository';
import { GetAllScheduleProfileUseCase } from '../get-all-schedule';

export function makeGetAllScheduleProfileUseCase() {

    const schedulesRepository = new PrismaSchedulesRepository();
    const useCase = new GetAllScheduleProfileUseCase(schedulesRepository);

    return useCase;
}