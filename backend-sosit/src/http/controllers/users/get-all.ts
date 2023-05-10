import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { makeGetAllUserProfileUseCase } from '@use-case/factories/make-get-all-users';
import { z } from 'zod';
import { UsersNotFoundError } from '@use-case/errors/users-not-found';

export async function getAll(request: FastifyRequest, response: FastifyReply) {

    try {
        const getAllUserProfileUseCase = makeGetAllUserProfileUseCase();

        const { users } = await getAllUserProfileUseCase.execute();

        return response.status(200).send({
            users
        });

    } catch (err) {
        if (err instanceof UsersNotFoundError) {
            return response.status(400).send({
                message: err.message
            });
        }
        else {

        }
        throw err;
    }
}