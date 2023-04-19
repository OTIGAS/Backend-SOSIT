import { Commitment, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CommitmentsRepository } from '../commitments-repository';

export class InMemoryCommitmentsRepository implements CommitmentsRepository {

	public items: Commitment[] = [];

	async create(data: Prisma.CommitmentUncheckedCreateInput): Promise<Commitment | null> {
		const commitment: Commitment = {
			id: randomUUID(),
			user_id: data.user_id,
			schedule_id: data.schedule_id,
			date_time: new Date(data.date_time)
		};

		this.items.push(commitment);

		return commitment;
	}

}