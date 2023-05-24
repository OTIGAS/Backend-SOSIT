import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@repositories/commitments-repository';

interface FetchCostumerCommitmentHistoryUseCaseRequest {
	costumerId: string;
}

interface FetchCostumerCommitmentHistoryUseCaseResponse {
	commitments: Commitment[];
}

export class FetchCostumerCommitmentHistoryUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		costumerId
	}: FetchCostumerCommitmentHistoryUseCaseRequest): Promise<FetchCostumerCommitmentHistoryUseCaseResponse> {

		const commitments = await this.commitmentsRepository.findManyByCostumerId(costumerId);

		return { commitments };
	}
}