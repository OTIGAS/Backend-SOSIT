import { FetchCustomerCommitmentHistoryUseCase } from '../fetch-customer-commitment-history';
import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';

export function makeFetchCustomerCommitmentHistoryUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new FetchCustomerCommitmentHistoryUseCase(commitmentsRepository);

	return useCase;
}