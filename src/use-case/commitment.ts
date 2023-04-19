import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@/repositories/commitments-repository';

interface CommitmentUseCaseRequest {
	userId: string;
	scheduleId: string;
	dateTime: string;
}

interface CommitmentUseCaseResponse {
	commitment: Commitment;
}

export class CommitmentUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		userId,
		scheduleId,
		dateTime
	}: CommitmentUseCaseRequest): Promise<CommitmentUseCaseResponse> {

		const commitment = await this.commitmentsRepository.create({
			user_id: userId, schedule_id: scheduleId, date_time: dateTime
		});

		if (!commitment) {
			throw new Error('Failed to create commitment');
		}

		return { commitment };
	}
}