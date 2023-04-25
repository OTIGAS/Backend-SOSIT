import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCommitmentsRepository } from '@/repositories/in-memory/in-memory-commitments-repository';
import { CommitmentUseCase } from '../commitment';
import { FetchUserCommitmentHistoryUseCase } from '../fetch-user-commitment-history';

let commitmentRepository: InMemoryCommitmentsRepository;
let fetchUserCommitmentHistoryUseCase: FetchUserCommitmentHistoryUseCase;

beforeEach(() => {
	commitmentRepository = new InMemoryCommitmentsRepository();
	fetchUserCommitmentHistoryUseCase = new FetchUserCommitmentHistoryUseCase(commitmentRepository);
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
			user_id: 'user-01',
			schedule_id: 'schedule-02',
			start_date_time: '2023-04-19T13:00:00',
			end_date_time: '2023-04-19T14:00:00'
		});

		const { commitments } = await fetchUserCommitmentHistoryUseCase.execute({
			userId: 'user-01',
		});

		expect(commitments).toHaveLength(2);
		expect(commitments).toEqual([
			expect.objectContaining({ schedule_id: 'schedule-01' }),
			expect.objectContaining({ schedule_id: 'schedule-02' })
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
			user_id: 'user-01',
			schedule_id: 'schedule-02',
			start_date_time: '2023-04-19T13:00:00',
			end_date_time: '2023-04-19T14:00:00'
		});

		const { commitments } = await fetchUserCommitmentHistoryUseCase.execute({
			userId: 'user-02',
		});

		expect(commitments).toHaveLength(0);

	});

});