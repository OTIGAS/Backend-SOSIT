import { FetchCostumerCommitmentHistoryUseCase } from '../fetch-costumer-commitment-history';
import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';

export function makeFetchCostumerCommitmentHistoryUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new FetchCostumerCommitmentHistoryUseCase(commitmentsRepository);

	return useCase;
}