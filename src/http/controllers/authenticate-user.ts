import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository';
import { AuthenticateUserUseCase } from '@/use-case/authenticate-user';
import { InvalidCredencialsError } from '@/use-case/errors/invalid-credencials-error';

export async function authenticateUser(request: FastifyRequest, response: FastifyReply) {
	const userAuthenticateBodySchema = z.object({
		email: z.string().email(),
		senha: z.string().min(6),
	});

	const { email, senha } = userAuthenticateBodySchema.parse(request.body);

	try {
		const usersRepository = new PrismaUsersRepository();
		const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

		const { user } = await authenticateUserUseCase.execute({
			email,
			senha,
		});

		const token = await response.jwtSign({}, {
			sign: {
				sub: user.id
			}
		})

		return response.status(201).send({ token });

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