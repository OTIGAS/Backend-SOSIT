import { Prisma, Schedule } from "@prisma/client";
import { SchedulesRepository } from "../schedules-repository";
import { randomUUID } from "node:crypto";

export class InMemorySchedulesRepository implements SchedulesRepository {

    public items: Schedule[] = [];

    async create(data: Prisma.ScheduleUncheckedCreateInput): Promise<Schedule> {
        const schedule = {
            id: randomUUID(),
            nome: data.nome,
            servico: data.servico,
            descricao: data.descricao,
            dias_semana: data.dias_semana as string[],
            company_id: data.company_id,
            criado_em: new Date(),
        }

        this.items.push(schedule);

        return schedule
    }

    async findByName(name: string): Promise<Schedule | null> {
        const schedule = this.items.find((item) => item.nome === name)

        if (!schedule) {
            return null;
        }

        return schedule
    }

    async findByService(service: string): Promise<Schedule[] | null> {
        const schedules = this.items.filter((item) => item.servico === service);

        if (schedules.length === 0) {
            return null;
        }

        return schedules;
    }

}
