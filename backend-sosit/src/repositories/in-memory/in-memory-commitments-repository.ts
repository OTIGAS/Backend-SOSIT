import { Commitment, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CommitmentsRepository } from '../commitments-repository';
import { CommitemntAlreadyExistingAtThisTime } from '@use-case/errors/commitment-already-exists';
import { areIntervalsOverlapping } from 'date-fns';

export class InMemoryCommitmentsRepository implements CommitmentsRepository {

	public items: Commitment[] = [];

	async create(data: Prisma.CommitmentUncheckedCreateInput): Promise<Commitment | null> {
		const commitment: Commitment = {
			id: data.id ?? randomUUID(),
			user_id: data.user_id,
			schedule_id: data.schedule_id,
			start_date_time: new Date(data.start_date_time),
			end_date_time: new Date(data.end_date_time)
		};

		this.items.push(commitment);

		return commitment;
	}

	async findByUserIdOnDate(userId: string, startDate: Date, endDate: Date): Promise<Commitment | null> {

		const commitmentOnSameDate = this.items.find((item) => item.user_id === userId);

		if (!commitmentOnSameDate) {
			return null;
		}

		const startTimeIsAlreadySet = this.items.find((item) =>
			areIntervalsOverlapping(
				{ start: startDate, end: endDate },
				{ start: item.start_date_time, end: item.end_date_time }
			)
		);

		if (startTimeIsAlreadySet) {
			throw new CommitemntAlreadyExistingAtThisTime();
		}

		return commitmentOnSameDate;
	}

	async findManyByUserId(userId: string) {
		return this.items.filter((item) => item.user_id === userId);
	}

	async findManyByScheduleId(scheduleId: string) {
		return this.items.filter((item) => item.schedule_id === scheduleId);
	}

	async countByScheduleId(scheduleId: string) {
		return this.items.filter((item) => item.schedule_id === scheduleId).length;
	}

}