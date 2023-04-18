import { Prisma, Schedule } from '@prisma/client';

export interface SchedulesRepository {
    create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule>
    findById(id: string): Promise<Schedule | null>
    findByService(service: string): Promise<Schedule[] | null>
}