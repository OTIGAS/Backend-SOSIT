import { RegisterScheduleUseCase } from '../register-schedule';
import { PrismaSchedulesRepository } from '@/repositories/prisma/prisma-schedule-repository';

export function makeRegisterScheduleUseCase() {

	const schedulesRepository = new PrismaSchedulesRepository();
	const useCase = new RegisterScheduleUseCase(schedulesRepository);

	return useCase;
}