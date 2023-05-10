import { Commitment } from '@prisma/client';
import { CommitmentsRepository } from '@repositories/commitments-repository';

interface GetScheduleMetricsUseCaseRequest {
	scheduleId: string;
}

interface GetScheduleMetricsUseCaseResponse {
	schedulesCount: number;
}

export class GetScheduleMetricsUseCase {
	constructor(private commitmentsRepository: CommitmentsRepository) { }

	async execute({
		scheduleId,
	}: GetScheduleMetricsUseCaseRequest): Promise<GetScheduleMetricsUseCaseResponse> {

		const schedulesCount = await this.commitmentsRepository.countByScheduleId(scheduleId);

		return { schedulesCount };
	}
}