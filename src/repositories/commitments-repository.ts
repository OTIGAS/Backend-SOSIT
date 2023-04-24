import { Commitment, Prisma } from '@prisma/client';

export interface CommitmentsRepository {
    create(data: Prisma.CommitmentUncheckedCreateInput): Promise<Commitment | null>
    findByUserIdOnDate(userId: string, startDateTime: Date, endDateTime: Date): Promise<Commitment | null>
    findManyByUserId(userId: string): Promise<Commitment[]>
    findManyByScheduleId(scheduleId: string): Promise<Commitment[]>
    countByScheduleId(scheduleId: string): Promise<number>
} 