import { prisma } from '@lib/prisma';
import { Prisma, Commitment } from '@prisma/client';
import { CommitmentsRepository } from '../commitments-repository';

export class PrimsaCommitmentsRepository implements CommitmentsRepository {

	async create(data: Prisma.CommitmentUncheckedCreateInput) {
		const commitment = await prisma.commitment.create({
			data,
		});
		return commitment;
	}

	async findByCostumerIdOnDate(costumerId: string, startDateTime: Date, endDateTime: Date) {
		const commitment = await prisma.commitment.findFirst({
			where: {
				costumer_id: costumerId,
				AND: [
					{
						start_date_time: {
							lte: endDateTime,
						},
					},
					{
						end_date_time: {
							gte: startDateTime,
						},
					},
				],
			},
		});

		return commitment;
	}

	async findManyByCostumerId(costumerId: string) {
		const commitments = await prisma.commitment.findMany({
			where: {
				costumer_id: costumerId,
			},
		});
		return commitments;
	}

	async findManyByScheduleId(scheduleId: string) {
		const commitments = await prisma.commitment.findMany({
			where: {
				schedule_id: scheduleId,
			},
		});
		return commitments;
	}

	async countByScheduleId(scheduleId: string) {
		const count = await prisma.commitment.count({
			where: {
				schedule_id: scheduleId,
			},
		});
		return count;
	}

}