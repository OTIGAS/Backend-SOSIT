import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCommitmentsRepository } from '@/repositories/in-memory/in-memory-commitments-repository';
import { CommitmentUseCase } from '../commitment';
import { CommitemntAlreadyExistingAtThisTime } from '../errors/commitment-already-exists';
import { GetScheduleMetricsUseCase } from '../get-schedule-metrics';

let commitmentRepository: InMemoryCommitmentsRepository;
let getScheduleMetricsUseCase: GetScheduleMetricsUseCase;

beforeEach(() => {
	commitmentRepository = new InMemoryCommitmentsRepository();
	getScheduleMetricsUseCase = new GetScheduleMetricsUseCase(commitmentRepository);
});

describe('Get Schedule Metrics Use Case', () => {
	it('should be able to get commitment count from metrics', async () => {

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

		const { schedulesCount } = await getScheduleMetricsUseCase.execute({
			scheduleId: 'schedule-01'
		});

		expect(schedulesCount).toEqual(2);
	});


});