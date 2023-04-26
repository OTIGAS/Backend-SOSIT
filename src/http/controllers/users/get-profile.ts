import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { InvalidCredencialsError } from '@/use-case/errors/invalid-credencials-error';
import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile';
import { z } from 'zod';

export async function get(request: FastifyRequest, response: FastifyReply) {

    const userUpdateParamsSchema = z.object({
        userId: z.string().uuid()
    })

    try {
        const { userId } = userUpdateParamsSchema.parse(request.params)

        const getUserProfileUseCase = makeGetUserProfileUseCase();

        const { user } = await getUserProfileUseCase.execute({ userId });

        return response.status(200).send({ user });

    } catch (err) {
        if (err instanceof InvalidCredencialsError) {
            return response.status(400).send({
                message: err.message
            });
        }
        else {

        }
        throw err;
    }
}