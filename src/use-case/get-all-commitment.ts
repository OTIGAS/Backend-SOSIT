import { CommitmentsRepository } from '@repositories/commitments-repository';
import { Commitment } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetCommitmentProfileUseCaseResponse {
	commitments: Commitment[];
}

export class GetAllCommitmentProfileUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute(): Promise<GetCommitmentProfileUseCaseResponse> {
		const commitments = await this.commitmentsRepository.getAll();

		if (!commitments) {
			throw new ResourceNotFoundError();
		}

		return {
			commitments
		};
	}
}