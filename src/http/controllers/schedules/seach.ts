import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSearchScheduleUseCase } from '@/use-case/factories/make-search-schedule';

export async function search(request: FastifyRequest, response: FastifyReply) {
    const searchScheduleQuerySchema = z.object({
        query: z.string()
    });

    const { query } = searchScheduleQuerySchema.parse(request.body)
    console.log(query)

    const searchScheduleUseCase = makeSearchScheduleUseCase()

    const { schedules } = await searchScheduleUseCase.execute({
        query,
    })

    return response.status(200).send({
        schedules
    });
}