import { Commitment, Prisma } from '@prisma/client';

export interface CommitmentsRepository {
    create(data: Prisma.CommitmentUncheckedCreateInput): Promise<Commitment | null>
    delete(commitmentId: string): Promise<Commitment>
    findById(commitmentId: string): Promise<Commitment | null>
    getAll(): Promise<Commitment[]>
    findByCostumerIdOnDate(costumerId: string, startDateTime: Date, endDateTime: Date): Promise<Commitment | null>
    findManyByCostumerId(costumerId: string): Promise<Commitment[]>
    findManyByScheduleId(scheduleId: string): Promise<Commitment[]>
    countByScheduleId(scheduleId: string): Promise<number>
} 