import { prisma } from '@lib/prisma';
import { Prisma, Commitment } from '@prisma/client';
import { CommitmentsRepository } from '../commitments-repository';

export class PrimsaCommitmentsRepository implements CommitmentsRepository {
	async getAll(): Promise<Commitment[]> {
		const commitments = await prisma.commitment.findMany();
		return commitments;
	}

	async delete(commitmentId: string) {
		const commitment = await prisma.commitment.delete({
			where: { id: commitmentId }
		});
		return commitment;
	}

	async findById(commitmentId: string): Promise<Commitment | null> {
		const commitment = await prisma.commitment.findUnique({
			where: { id: commitmentId },
		});
		return commitment;
	}

	async create(data: Prisma.CommitmentUncheckedCreateInput) {
		const commitment = await prisma.commitment.create({
			data,
		});
		return commitment;
	}

	async findByCustomerIdOnDate(customerId: string, startDateTime: Date, endDateTime: Date) {
		const commitment = await prisma.commitment.findFirst({
			where: {
				customer_id: customerId,
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

	async findManyByCustomerId(customerId: string) {
		const commitments = await prisma.commitment.findMany({
			where: {
				customer_id: customerId,
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