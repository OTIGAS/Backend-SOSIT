import { expect, describe, it, beforeEach } from 'vitest';
import { InMemorySchedulesRepository } from '@/repositories/in-memory/in-memory-schedules-repository';
import { SearchScheduleUseCase } from '../search-schedule';

let commitmentRepository: InMemorySchedulesRepository;
let searchScheduleUseCase: SearchScheduleUseCase;

beforeEach(() => {
    commitmentRepository = new InMemorySchedulesRepository();
    searchScheduleUseCase = new SearchScheduleUseCase(commitmentRepository);
});

describe('Search Schedule Use Case', () => {

    it('should be able to fetch schedule', async () => {

        await commitmentRepository.create({
            nome: 'Nome1',
            servico: 'Servico1',
            descricao: 'Descrição1',
            dias_semana: ['seg', 'ter', 'qua', 'sex', 'sab'],
            company_id: 'company-01',
        });

        await commitmentRepository.create({
            nome: 'Nome2',
            servico: 'Servico2',
            descricao: 'Descrição2',
            dias_semana: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
            company_id: 'company-01',
        });

        const { schedules } = await searchScheduleUseCase.execute({
            query: 'Servico1'
        });

        console.log(schedules)

        expect(schedules).toHaveLength(1);
        expect(schedules).toEqual([
            expect.objectContaining({ company_id: 'company-01', }),
        ]);
    });

    it('should be able to fetch commitment history', async () => {

        await commitmentRepository.create({
            nome: 'Nome1',
            servico: 'Servico1',
            descricao: 'Descrição1',
            dias_semana: ['seg', 'ter', 'qua', 'sex', 'sab'],
            company_id: 'company-01',
        });

        await commitmentRepository.create({
            nome: 'Nome2',
            servico: 'Servico1',
            descricao: 'Descrição2',
            dias_semana: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
            company_id: 'company-02',
        });

        const { schedules } = await searchScheduleUseCase.execute({
            query: 'Servico1'
        });

        expect(schedules).toHaveLength(2);
        expect(schedules).toEqual([
            expect.objectContaining({ company_id: 'company-01', }),
            expect.objectContaining({ company_id: 'company-02', }),
        ]);
    });

});