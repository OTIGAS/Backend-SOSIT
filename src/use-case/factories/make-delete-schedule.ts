import { PrismaSchedulesRepository } from '@repositories/prisma/prisma-schedule-repository';
import { DeleteScheduleUseCase } from '../delete-schedule';

export function makeDeleteScheduleUseCase() {

	const schedulesRepository = new PrismaSchedulesRepository();
	const useCase = new DeleteScheduleUseCase(schedulesRepository);

	return useCase;
}