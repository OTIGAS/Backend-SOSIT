import { expect, describe, it, beforeEach } from 'vitest';
import { InMemorySchedulesRepository } from '@repositories/in-memory/in-memory-schedules-repository';
import { UpdateScheduleUseCase } from '../update-schedule';

let scheduleRepository: InMemorySchedulesRepository;
let updateScheduleUseCase: UpdateScheduleUseCase;

beforeEach(() => {
	scheduleRepository = new InMemorySchedulesRepository();
	updateScheduleUseCase = new UpdateScheduleUseCase(scheduleRepository);
});

describe('Update Schedule', () => {

	it('should be able to update', async () => {

		const scheduleOriginal = await scheduleRepository.create({
			nome: 'Nome',
			servico: 'Servico',
			descricao: 'Descrição',
			dias_semana: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
			company_id: 'company-01',
		});

		const scheduleChanged = await updateScheduleUseCase.execute({
			id: scheduleOriginal.id,
			nome: 'Outro',
			servico: 'Servico',
			descricao: 'Descrição',
			dias_semana: ['ter', 'qui', 'sab', 'dom'],
			companyId: 'company-01',
		});

		expect(scheduleChanged.schedule).toEqual(
			expect.objectContaining({ id: scheduleOriginal.id, }),
		);
	});

});