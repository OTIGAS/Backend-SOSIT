import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { SchedulesRepository } from '../schedules-repository';

export class PrismaSchedulesRepository implements SchedulesRepository {

	async create(data: Prisma.ScheduleUncheckedCreateInput) {
		const schedule = await prisma.schedule.create({
			data,
		});
		return schedule;
	}

	async findByName(name: string) {
		const schedule = await prisma.schedule.findUnique({
			where: {
				nome: name
			}
		});
		return schedule;
	}

	async findByService(sercice: string) {
		const schedule = await prisma.schedule.findMany({
			where: {
				servico: sercice
			}
		});
		return schedule;
	}

}