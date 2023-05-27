import { GetCommitmentProfileUseCase } from '../get-commitment-profile';
import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';

export function makeGetCommitmentProfileUseCase() {

	const commitmentRepository = new PrimsaCommitmentsRepository();
	const useCase = new GetCommitmentProfileUseCase(commitmentRepository);

	return useCase;
}