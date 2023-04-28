import { PrismaSchedulesRepository } from '@repositories/prisma/prisma-schedule-repository';
import { SearchScheduleUseCase } from '../search-schedule';

export function makeSearchScheduleUseCase() {

	const schedulesRepository = new PrismaSchedulesRepository();
	const useCase = new SearchScheduleUseCase(schedulesRepository);

	return useCase;
}