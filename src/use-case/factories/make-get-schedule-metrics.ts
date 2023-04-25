import { PrimsaCommitmentsRepository } from '@/repositories/prisma/prisma-commitment-repository';
import { GetScheduleMetricsUseCase } from '../get-schedule-metrics';

export function makeGetScheduleMetricsUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new GetScheduleMetricsUseCase(commitmentsRepository);

	return useCase;
}