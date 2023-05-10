import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteUserUseCase } from '@use-case/factories/make-delete-user';
import { z } from 'zod';

export async function deleteUser(request: FastifyRequest, response: FastifyReply) {

    const userDeleteParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = userDeleteParamsSchema.parse(request.params)

    try {
        const deleteUserUseCase = makeDeleteUserUseCase();

        await deleteUserUseCase.execute({ userId });

    } catch (err) {
        throw err;
    }

    return response.status(204).send({ message: "Usuario deletado com sucesso!" });
}