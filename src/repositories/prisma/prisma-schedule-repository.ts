import { prisma } from '@lib/prisma';
import { Prisma, Schedule } from '@prisma/client';
import { SchedulesRepository } from '../schedules-repository';

export class PrismaSchedulesRepository implements SchedulesRepository {

	async create(data: Prisma.ScheduleUncheckedCreateInput) {
		const schedule = await prisma.schedule.create({
			data,
		});
		return schedule;
	}

	async update(data: Prisma.ScheduleUpdateInput): Promise<Schedule> {
		const schedule = await prisma.schedule.update({
			where: { id: data.id as string },
			data,
		});
		return schedule;
	}

	async findById(id: string) {
		const schedule = await prisma.schedule.findUnique({
			where: { id },
		});
		return schedule;
	}

	async findByNome(nome: string) {
		const schedule = await prisma.schedule.findUnique({
			where: { nome },
		});
		return schedule;
	}

	async searchMany(query: string): Promise<Schedule[]> {
		const schedules = await prisma.schedule.findMany({
			where: {
				servico: {
					contains: query,
				},
			},
		});
		return schedules;
	}

	async getAll() {
		const schedules = await prisma.schedule.findMany();
		return schedules;
	}

	async delete(scheduleId: string) {
		const schedule = await prisma.schedule.delete({
			where: { id: scheduleId }
		});
		return schedule;
	}

}