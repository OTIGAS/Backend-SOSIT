import { expect, describe, it, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists';
import { InMemoryCommitmentsRepository } from '@/repositories/in-memory/in-memory-commitments-repository';
import { CommitmentUseCase } from '../commitment';

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
            dateTime: '2023-04-18T22:27:00'
        });
        console.log(commitment)
        expect(commitment.id).toEqual(expect.any(String));
    });


});