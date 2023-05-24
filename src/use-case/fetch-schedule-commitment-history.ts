import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@repositories/commitments-repository';

interface FetchScheduleCommitmentHistoryUseCaseRequest {
	scheduleId: string;
}

interface FetchScheduleCommitmentHistoryUseCaseResponse {
	commitments: Commitment[];
}

export class FetchScheduleCommitmentHistoryUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		scheduleId
	}: FetchScheduleCommitmentHistoryUseCaseRequest): Promise<FetchScheduleCommitmentHistoryUseCaseResponse> {

		const commitments = await this.commitmentsRepository.findManyByScheduleId(scheduleId);

		return { commitments };
	}
}