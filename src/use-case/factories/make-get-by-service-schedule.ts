import { PrismaSchedulesRepository } from '@repositories/prisma/prisma-schedule-repository';
import { GetByServiceScheduleUseCase } from '../get-by-service-schedule';

export function makeGetByServiceScheduleUseCase() {

	const schedulesRepository = new PrismaSchedulesRepository();
	const useCase = new GetByServiceScheduleUseCase(schedulesRepository);

	return useCase;
}