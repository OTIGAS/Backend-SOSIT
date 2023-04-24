import { Prisma, Schedule } from '@prisma/client';
import { SchedulesRepository } from '../schedules-repository';
import { randomUUID } from 'node:crypto';

export class InMemorySchedulesRepository implements SchedulesRepository {

	public items: Schedule[] = [];

	async create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule> {
		const schedule = {
			id: data.id ?? randomUUID(),
			nome: data.nome,
			servico: data.servico,
			descricao: data.descricao,
			dias_semana: data.dias_semana as string[],
			company_id: data.company_id,
			criado_em: new Date(),
		};

		this.items.push(schedule);

		return schedule;
	}

	async update(schedule: Prisma.ScheduleUncheckedUpdateInput): Promise<Schedule> {
		const scheduleIndex = this.items.findIndex(schedule => schedule.id === schedule.id);

		if (scheduleIndex >= 0) {
			this.items[scheduleIndex].nome = schedule.nome?.toString() ?? this.items[scheduleIndex].nome;
			this.items[scheduleIndex].servico = schedule.servico?.toString() ?? this.items[scheduleIndex].servico;
			this.items[scheduleIndex].descricao = schedule.descricao?.toString() ?? this.items[scheduleIndex].descricao;

			const dias_semana = Array.isArray(schedule.dias_semana)
				? schedule.dias_semana.filter(dia => dia !== undefined)
				: [];
			this.items[scheduleIndex].dias_semana = dias_semana;
		}

		return Promise.resolve(this.items[scheduleIndex]);
	}

	async findById(id: string): Promise<Schedule | null> {
		const schedule = this.items.find((item) => item.id === id);

		if (!schedule) {
			return null;
		}

		return schedule;
	}

	async searchMany(query: string): Promise<Schedule[]> {
		return this.items.filter((item) => item.servico.includes(query));
	}

}
