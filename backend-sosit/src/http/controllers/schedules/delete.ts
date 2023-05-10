import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteScheduleUseCase } from '@use-case/factories/make-delete-schedule';
import { z } from 'zod';

export async function deleteSchedule(request: FastifyRequest, response: FastifyReply) {

    const scheduleDeleteParamsSchema = z.object({
        scheduleId: z.string().uuid()
    })

    const { scheduleId } = scheduleDeleteParamsSchema.parse(request.params)

    try {
        const deleteScheduleUseCase = makeDeleteScheduleUseCase();

        await deleteScheduleUseCase.execute({ scheduleId });

    } catch (err) {
        throw err;
    }

    return response.status(204).send({ message: "Agenda deletada com sucesso!" });
}