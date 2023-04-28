import { Prisma, Schedule } from '@prisma/client';

export interface SchedulesRepository {
    create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule>
    update(data: Prisma.ScheduleUpdateInput): Promise<Schedule>
    findById(id: string): Promise<Schedule | null>
    findByNome(nome: string): Promise<Schedule | null>
    searchMany(query: string): Promise<Schedule[]>
    getAll(): Promise<Schedule[]>
}