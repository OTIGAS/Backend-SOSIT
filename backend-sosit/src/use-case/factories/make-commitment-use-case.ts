import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';
import { CommitmentUseCase } from '../commitment';

export function makeCommitmentUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new CommitmentUseCase(commitmentsRepository);

	return useCase;
}