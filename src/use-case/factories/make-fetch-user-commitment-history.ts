import { FetchUserCommitmentHistoryUseCase } from '../fetch-user-commitment-history';
import { PrimsaCommitmentsRepository } from '@/repositories/prisma/prisma-commitment-repository';

export function makeFetchUserCommitmentHistoryUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new FetchUserCommitmentHistoryUseCase(commitmentsRepository);

	return useCase;
}