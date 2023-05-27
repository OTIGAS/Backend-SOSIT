import { CommitmentsRepository } from '@repositories/commitments-repository';
import { ScheduleNotFoundError } from './errors/schedule-not-found-error';
import { Commitment } from '@prisma/client';

interface DeleteScheduleUseCaseRequest {
	commitmentId: string;
}

interface DeleteScheduleUseCaseResponse {
	commitment: Commitment;
}

export class DeleteCommitmentUseCase {
	constructor(private commitmentRepository: CommitmentsRepository) { }

	async execute({ commitmentId }: DeleteScheduleUseCaseRequest): Promise<DeleteScheduleUseCaseResponse> {

		const commitment = await this.commitmentRepository.findById(commitmentId);

		if (!commitment) {
			throw new ScheduleNotFoundError();
		}

		await this.commitmentRepository.delete(commitmentId);

		return { commitment };
	}
}