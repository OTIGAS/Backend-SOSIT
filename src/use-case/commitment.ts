import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@/repositories/commitments-repository';

interface CommitmentUseCaseRequest {
	userId: string;
	scheduleId: string;
	startDateTime: string;
	endDateTime: string;

}

interface CommitmentUseCaseResponse {
	commitment: Commitment;
}

export class CommitmentUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		userId,
		scheduleId,
		startDateTime,
		endDateTime
	}: CommitmentUseCaseRequest): Promise<CommitmentUseCaseResponse> {

		const commitmentOnSameDate = await this.commitmentsRepository.findByUserIdOnDate(
			userId,
			new Date(startDateTime),
			new Date(endDateTime)
		);

		if (commitmentOnSameDate) {
			throw new Error()
		}

		const commitment = await this.commitmentsRepository.create({
			user_id: userId,
			schedule_id: scheduleId,
			start_date_time: startDateTime,
			end_date_time: endDateTime
		});

		if (!commitment) {
			throw new Error('Failed to create commitment');
		}

		return { commitment };
	}
}