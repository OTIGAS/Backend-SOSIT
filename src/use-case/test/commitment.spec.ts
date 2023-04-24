import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCommitmentsRepository } from '@/repositories/in-memory/in-memory-commitments-repository';
import { CommitmentUseCase } from '../commitment';
import { CommitemntAlreadyExistingAtThisTime } from '../errors/commitment-already-exists';

let commitmentRepository: InMemoryCommitmentsRepository;
let registerCommitmentsUseCase: CommitmentUseCase;

beforeEach(() => {
    commitmentRepository = new InMemoryCommitmentsRepository();
    registerCommitmentsUseCase = new CommitmentUseCase(commitmentRepository);
});

describe('Commitment Use Case', () => {
    it('should be able to commitment', async () => {

        const { commitment } = await registerCommitmentsUseCase.execute({
            userId: 'user-01',
            scheduleId: 'schedule-01',
            startDateTime: '2023-04-18T22:27:00',
            endDateTime: '2023-04-18T24:27:00'
        });

        expect(commitment.id).toEqual(expect.any(String));
    });

    it('should not be able make commitment twice on the same date', async () => {

        await registerCommitmentsUseCase.execute({
            userId: 'user-01',
            scheduleId: 'schedule-01',
            startDateTime: '2023-04-19T12:00:00',
            endDateTime: '2023-04-19T13:00:00'
        });

        await expect(() => registerCommitmentsUseCase.execute({
            userId: 'user-01',
            scheduleId: 'schedule-01',
            startDateTime: '2023-04-19T12:30:00',
            endDateTime: '2023-04-19T13:30:00'
        })).rejects.toBeInstanceOf(CommitemntAlreadyExistingAtThisTime);
    });

    it('should not be able make commitment twice but in different dates', async () => {

        await registerCommitmentsUseCase.execute({
            userId: 'user-01',
            scheduleId: 'schedule-01',
            startDateTime: '2023-04-19T12:30:00',
            endDateTime: '2023-04-19T13:30:00'
        });

        await expect(() => registerCommitmentsUseCase.execute({
            userId: 'user-01',
            scheduleId: 'schedule-01',
            startDateTime: '2023-04-19T12:00:00',
            endDateTime: '2023-04-19T13:00:00'
        })).rejects.toBeInstanceOf(CommitemntAlreadyExistingAtThisTime);
    });

});