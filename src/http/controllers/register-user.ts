import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterUserUseCase } from '@/use-case/register-user';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists';

export async function registerUser(request: FastifyRequest, response: FastifyReply) {
	const userRegisterBodySchema = z.object({
		nome: z.string(),
		email: z.string().email(),
		senha: z.string().min(6),
		cpf: z.string(),
		telefone: z.string(),
		cep: z.string(),
		estado: z.string(),
		cidade: z.string(),
		rua: z.string(),
		numero: z.string(),
		nascimento: z.string()
	});

	const {
		nome,
		email,
		senha,
		cpf,
		telefone,
		cep,
		estado,
		cidade,
		rua,
		numero,
		nascimento
	} = userRegisterBodySchema.parse(request.body);

	try {
		const usersRepository = new PrismaUsersRepository();
		const registerUserUseCase = new RegisterUserUseCase(usersRepository);

		await registerUserUseCase.execute({
			nome,
			email,
			senha,
			cpf,
			telefone,
			cep,
			estado,
			cidade,
			rua,
			numero,
			nascimento
		});
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return response.status(409).send({
				message: err.message
			});
		}
		else {

		}
		throw err
	}

	return response.status(201).send();
}