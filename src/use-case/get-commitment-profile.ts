import { Commitment } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CommitmentsRepository } from '@repositories/commitments-repository';

interface GetCommitmentProfileUseCaseRequest {
	commitmentId: string;
}

interface GetCommitmentProfileUseCaseResponse {
	commitment: Commitment;
}

export class GetCommitmentProfileUseCase {
	constructor(private schedulesRepository: CommitmentsRepository) { }

	async execute({
		commitmentId,
	}: GetCommitmentProfileUseCaseRequest): Promise<GetCommitmentProfileUseCaseResponse> {
		const commitment = await this.schedulesRepository.findById(commitmentId);

		if (!commitment) {
			throw new ResourceNotFoundError();
		}

		return {
			commitment
		};
	}
}