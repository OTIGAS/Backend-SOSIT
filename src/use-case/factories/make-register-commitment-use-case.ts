import { PrimsaCommitmentsRepository } from '@repositories/prisma/prisma-commitment-repository';
import { RegisterCommitmentUseCase } from '../register-commitment';

export function makeRegisterCommitmentUseCase() {

	const commitmentsRepository = new PrimsaCommitmentsRepository();
	const useCase = new RegisterCommitmentUseCase(commitmentsRepository);

	return useCase;
}