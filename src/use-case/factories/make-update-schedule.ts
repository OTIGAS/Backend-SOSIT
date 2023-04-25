import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedule-repository';
import { UpdateScheduleUseCase } from '../update-schedule';

export function makeUpdateScheduleUseCase() {

	const scheduleRepository = new PrismaSchedulesRepository();
	const useCase = new UpdateScheduleUseCase(scheduleRepository);

	return useCase;
}