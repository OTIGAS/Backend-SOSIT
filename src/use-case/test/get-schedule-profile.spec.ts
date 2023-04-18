import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemorySchedulesRepository } from '@/repositories/in-memory/in-memory-schedules-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { GetScheduleProfileUseCase } from '../get-schedule-profile';
import { RegisterScheduleUseCase } from '../register-schedule';

let scheduleRepository: InMemorySchedulesRepository;
let getScheduleProfileUseCase: GetScheduleProfileUseCase;

let scheduleUseCase: RegisterScheduleUseCase;


beforeEach(() => {
	scheduleRepository = new InMemorySchedulesRepository();
	getScheduleProfileUseCase = new GetScheduleProfileUseCase(scheduleRepository);

	scheduleUseCase = new RegisterScheduleUseCase(scheduleRepository);
});

describe('Get Schedule Profile Use Case', () => {

	it('should be able to get schedule profile', async () => {

		const createdSchedule = await scheduleUseCase.execute({
			nome: 'Nome',
			servico: 'Servico',
			descricao: 'Descrição',
			dias_semana: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
			companyId: 'company-01',
		});

		const { schedule } = await getScheduleProfileUseCase.execute({
			scheduleId: createdSchedule.schedule.id
		});

		expect(schedule.id).toEqual(expect.any(String));
		expect(schedule.nome).toEqual('Nome');
	});

	it('should be able to get user profile with wrong id', async () => {

		expect(() =>
			getScheduleProfileUseCase.execute({
				scheduleId: 'non-existing-id'
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});