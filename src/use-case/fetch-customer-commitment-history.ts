import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@repositories/commitments-repository';

interface FetchCustomerCommitmentHistoryUseCaseRequest {
	customerId: string;
}

interface FetchCustomerCommitmentHistoryUseCaseResponse {
	commitments: Commitment[];
}

export class FetchCustomerCommitmentHistoryUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		customerId
	}: FetchCustomerCommitmentHistoryUseCaseRequest): Promise<FetchCustomerCommitmentHistoryUseCaseResponse> {

		const commitments = await this.commitmentsRepository.findManyByCustomerId(customerId);

		return { commitments };
	}
}