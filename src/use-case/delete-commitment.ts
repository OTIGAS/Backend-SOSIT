import { CommitmentsRepository } from '@repositories/commitments-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { Commitment } from '@prisma/client';

interface DeleteCommitmentUseCaseRequest {
	commitmentId: string;
}

interface DeleteCommitmentUseCaseResponse {
	commitment: Commitment;
}

export class DeleteCommitmentUseCase {
	constructor(private commitmentRepository: CommitmentsRepository) { }

	async execute({ commitmentId }: DeleteCommitmentUseCaseRequest): Promise<DeleteCommitmentUseCaseResponse> {

		const commitment = await this.commitmentRepository.findById(commitmentId);

		if (!commitment) {
			throw new ResourceNotFoundError();
		}

		await this.commitmentRepository.delete(commitmentId);

		return { commitment };
	}
}