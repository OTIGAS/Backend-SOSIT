import { Commitment, Prisma } from '@prisma/client';

export interface CommitmentsRepository {
    create(data: Prisma.CommitmentUncheckedCreateInput): Promise<Commitment | null>

} 