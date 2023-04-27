import { FastifyReply, FastifyRequest } from 'fastify';
import { ScheduleNotFoundError } from '@/use-case/errors/schedule-not-found-error';
import { z } from 'zod';
import { makeGetAllScheduleProfileUseCase } from '@/use-case/factories/make-get-all-schedules';

export async function getAll(request: FastifyRequest, response: FastifyReply) {

    try {
        const getAllSchedulesProfileUseCase = makeGetAllScheduleProfileUseCase();

        const { schedules } = await getAllSchedulesProfileUseCase.execute();

        return response.status(200).send({ schedules });

    } catch (err) {
        if (err instanceof ScheduleNotFoundError) {
            return response.status(400).send({
                message: err.message
            });
        }
        throw err;
    }
}