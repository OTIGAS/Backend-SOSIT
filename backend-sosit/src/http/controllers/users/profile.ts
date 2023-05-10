import { makeGetUserProfileUseCase } from '@use-case/factories/make-get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, response: FastifyReply) {

	const getUserProfile = makeGetUserProfileUseCase();

	const { user } = await getUserProfile.execute({
		userId: request.user.sub
	});

	return response.status(200).send({
		user: {
			...user,
			senha_hash: undefined
		}
	});
}