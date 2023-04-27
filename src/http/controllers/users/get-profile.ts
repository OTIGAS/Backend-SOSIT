<<<<<<< HEAD
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-case/errors/resource-not-found-error';

export async function get(request: FastifyRequest, response: FastifyReply) {

    const userUpdateParamsSchema = z.object({
        userId: z.string().uuid()
    })

    try {
        const { userId } = userUpdateParamsSchema.parse(request.params)

        const getUserProfileUseCase = makeGetUserProfileUseCase();

        const { user } = await getUserProfileUseCase.execute({ userId });

        return response.status(200).send({
            user: {
                ...user,
                senha_hash: undefined
            }
        });

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return response.status(400).send({
                message: err.message
            });
        }
        else {

        }
        throw err;
    }
=======
import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { InvalidCredencialsError } from '@/use-case/errors/invalid-credencials-error';
import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile';
import { z } from 'zod';

export async function get(request: FastifyRequest, response: FastifyReply) {

	const userUpdateParamsSchema = z.object({
		userId: z.string().uuid()
	});

	try {
		const { userId } = userUpdateParamsSchema.parse(request.params);

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
>>>>>>> 312ce5e2f7becde859274d19c67718f360d1ffa8
}