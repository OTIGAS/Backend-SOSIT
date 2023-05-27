import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@repositories/commitments-repository';
import { UnavailableSchedule } from './errors/unavailable-schedule';

interface CommitmentUseCaseRequest {
	costumerId: string;
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
		costumerId,
		scheduleId,
		startDateTime,
		endDateTime
	}: CommitmentUseCaseRequest): Promise<CommitmentUseCaseResponse> {

		const commitmentOnSameDate = await this.commitmentsRepository.findByCostumerIdOnDate(
			costumerId,
			new Date(startDateTime),
			new Date(endDateTime)
		);

		if (commitmentOnSameDate) {
			throw new UnavailableSchedule();
		}

		const commitment = await this.commitmentsRepository.create({
			costumer_id: costumerId,
			schedule_id: scheduleId,
			start_date_time: new Date(startDateTime),
			end_date_time: new Date(endDateTime)
		});

		if (!commitment) {
			throw new Error('Failed to create commitment');
		}

		return { commitment };
	}
}