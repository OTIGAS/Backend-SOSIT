import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCommitmentsRepository } from '@/repositories/in-memory/in-memory-commitments-repository';
import { FetchScheduleCommitmentHistoryUseCase } from '../fetch-schedule-commitment-history';

let commitmentRepository: InMemoryCommitmentsRepository;
let fetchScheduleCommitmentHistoryUseCase: FetchScheduleCommitmentHistoryUseCase;

beforeEach(() => {
	commitmentRepository = new InMemoryCommitmentsRepository();
	fetchScheduleCommitmentHistoryUseCase = new FetchScheduleCommitmentHistoryUseCase(commitmentRepository);
});

describe('Commitment Use Case', () => {

	it('should be able to fetch commitment history', async () => {

		await commitmentRepository.create({
			user_id: 'user-01',
			schedule_id: 'schedule-01',
			start_date_time: '2023-04-19T12:00:00',
			end_date_time: '2023-04-19T13:00:00'
		});

		await commitmentRepository.create({
			user_id: 'user-02',
			schedule_id: 'schedule-01',
			start_date_time: '2023-04-19T13:00:00',
			end_date_time: '2023-04-19T14:00:00'
		});

		const { commitments } = await fetchScheduleCommitmentHistoryUseCase.execute({
			scheduleId: 'schedule-01',
		});

		expect(commitments).toHaveLength(2);
		expect(commitments).toEqual([
			expect.objectContaining({ user_id: 'user-01' }),
			expect.objectContaining({ user_id: 'user-02' })
		]);
	});

	it('should not be able to fetch appointment history with unregistered id', async () => {

		await commitmentRepository.create({
			user_id: 'user-01',
			schedule_id: 'schedule-01',
			start_date_time: '2023-04-19T12:00:00',
			end_date_time: '2023-04-19T13:00:00'
		});

		await commitmentRepository.create({
			user_id: 'user-02',
			schedule_id: 'schedule-01',
			start_date_time: '2023-04-19T13:00:00',
			end_date_time: '2023-04-19T14:00:00'
		});

		const { commitments } = await fetchScheduleCommitmentHistoryUseCase.execute({
			scheduleId: 'schedule-02',
		});

		expect(commitments).toHaveLength(0);

	});

});