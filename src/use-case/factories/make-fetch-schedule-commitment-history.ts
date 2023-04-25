import { FetchScheduleCommitmentHistoryUseCase } from '../fetch-schedule-commitment-history';
import { PrimsaCommitmentsRepository } from '@/repositories/prisma/prisma-commitment-repository';

export function makeFetchScheduleCommitmentHistoryUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new FetchScheduleCommitmentHistoryUseCase(commitmentsRepository);

	return useCase;
}