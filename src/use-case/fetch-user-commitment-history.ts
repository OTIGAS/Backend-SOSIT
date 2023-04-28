import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@repositories/commitments-repository';

interface FetchUserCommitmentHistoryUseCaseRequest {
	userId: string;
}

interface FetchUserCommitmentHistoryUseCaseResponse {
	commitments: Commitment[];
}

export class FetchUserCommitmentHistoryUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		userId
	}: FetchUserCommitmentHistoryUseCaseRequest): Promise<FetchUserCommitmentHistoryUseCaseResponse> {

		const commitments = await this.commitmentsRepository.findManyByUserId(userId);

		return { commitments };
	}
}