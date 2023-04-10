import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterUserUseCase } from '@/use-case/register-user';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists';
import { AuthenticationUserUseCase } from '@/use-case/authenticate-user';
import { InvalidCredencialsError } from '@/use-case/errors/invalid-credencials-error';

export async function authenticateUser(request: FastifyRequest, response: FastifyReply) {
	const userAuthenticateBodySchema = z.object({
		email: z.string().email(),
		senha: z.string().min(6),
	});

	const { email, senha } = userAuthenticateBodySchema.parse(request.body);

	try {
		const usersRepository = new PrismaUsersRepository();
		const authenticateUserUseCase = new AuthenticationUserUseCase(usersRepository);

		await authenticateUserUseCase.execute({
			email,
			senha,
		});
	} catch (err) {
		if (err instanceof InvalidCredencialsError) {
			return response.status(400).send({
				message: err.message
			});
		}
		else {

		}
		throw err
	}

	return response.status(201).send();
}