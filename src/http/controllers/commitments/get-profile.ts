import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredencialsError } from '@use-case/errors/invalid-credencials-error';
import { z } from 'zod';
import { makeGetCommitmentProfileUseCase } from '@use-case/factories/make-get-commitment-profile';

export async function get(request: FastifyRequest, response: FastifyReply) {

    const commitmentGetParamsSchema = z.object({
        commitmentId: z.string().uuid()
    });

    const { commitmentId } = commitmentGetParamsSchema.parse(request.params);

    try {

        const getCommitmentProfileUseCase = makeGetCommitmentProfileUseCase();

        const { commitment } = await getCommitmentProfileUseCase.execute({ commitmentId });

        return response.status(200).send({ commitment });

    } catch (err) {
        if (err instanceof InvalidCredencialsError) {
            return response.status(400).send({
                message: err.message
            });
        }
        throw err;
    }
}