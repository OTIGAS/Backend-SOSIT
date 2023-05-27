import { DeleteCommitmentUseCase } from '../delete-commitment';
import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';

export function makeDeleteCommitmentUseCase() {

	const commitmentRepository = new PrimsaCommitmentsRepository();
	const useCase = new DeleteCommitmentUseCase(commitmentRepository);

	return useCase;
}