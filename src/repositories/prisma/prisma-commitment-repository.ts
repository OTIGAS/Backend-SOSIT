import { prisma } from "@/lib/prisma";
import { Prisma, Commitment } from "@prisma/client";
import { CommitmentsRepository } from "../commitments-repository";

export class PrimsaCommitmentsRepository implements CommitmentsRepository {
    async create(data: Prisma.CommitmentUncheckedCreateInput) {
        const commitment = await prisma.commitment.create({
            data,
        })
        return commitment
    }

    async findByUserIdOnDate(userId: string, startDateTime: Date, endDateTime: Date) {
        throw new Error("Method not implemented.");
    }
    async findManyByUserId(userId: string) {
        throw new Error("Method not implemented.");
    }
    async findManyByScheduleId(scheduleId: string) {
        throw new Error("Method not implemented.");
    }
    async countByScheduleId(scheduleId: string) {
        throw new Error("Method not implemented.");
    }

}