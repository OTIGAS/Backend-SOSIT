import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { AuthenticateCostumerUseCase } from '@use-case/authenticate-costumer';
import { InvalidCredencialsError } from '@use-case/errors/invalid-credencials-error';

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
	const costumerAuthenticateBodySchema = z.object({
		email: z.string().email(),
		senha: z.string().min(6),
	});

	const { email, senha } = costumerAuthenticateBodySchema.parse(request.body);

	try {
		const costumersRepository = new PrismaCostumersRepository();
		const authenticateCostumerUseCase = new AuthenticateCostumerUseCase(costumersRepository);

		const { costumer } = await authenticateCostumerUseCase.execute({
			email,
			senha,
		});

		const token = await response.jwtSign({}, {
			sign: {
				sub: costumer.id
			}
		});

		return response.status(200).send({ token });

	} catch (err) {
		if (err instanceof InvalidCredencialsError) {
			return response.status(400).send({
				message: err.message
			});
		}
		throw err;
	}
}