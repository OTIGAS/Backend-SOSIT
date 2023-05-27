import { Prisma, Schedule } from '@prisma/client';

export interface SchedulesRepository {
    create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule>
    delete(scheduleId: string): Promise<Schedule>
    update(data: Prisma.ScheduleUpdateInput): Promise<Schedule>
    findById(id: string): Promise<Schedule | null>
    findByNomeAndCompany(nome: string, companyId: string): Promise<Schedule | null>
    getAll(): Promise<Schedule[]>
    getByService(query: string): Promise<Schedule[]>
}