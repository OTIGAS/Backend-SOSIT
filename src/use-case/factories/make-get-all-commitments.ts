import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';
import { GetAllCommitmentProfileUseCase } from '../get-all-commitment';

export function makeGetAllCommitmentsUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new GetAllCommitmentProfileUseCase(commitmentsRepository);

	return useCase;
}