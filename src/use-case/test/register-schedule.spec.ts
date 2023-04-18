import { expect, describe, it, beforeEach } from 'vitest';
import { InMemorySchedulesRepository } from '@/repositories/in-memory/in-memory-schedules-repository';
import { RegisterScheduleUseCase } from '../register-schedule';

let scheduleRepository: InMemorySchedulesRepository;
let scheduleUseCase: RegisterScheduleUseCase;

beforeEach(() => {
	scheduleRepository = new InMemorySchedulesRepository();
	scheduleUseCase = new RegisterScheduleUseCase(scheduleRepository);
});

describe('Register Schedule', () => {

	it('should be able to register', async () => {

		const { schedule } = await scheduleUseCase.execute({
			nome: 'Nome',
			servico: 'Servico',
			descricao: 'Descrição',
			dias_semana: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
			companyId: 'company-01',
		});

		expect(schedule.id).toEqual(expect.any(String));
	});

});