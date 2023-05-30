import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { AuthenticateCustomerUseCase } from '@use-case/authenticate-customer';
import { InvalidCredencialsError } from '@use-case/errors/invalid-credencials-error';

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
	const customerAuthenticateBodySchema = z.object({
		email: z.string().email(),
		senha: z.string().min(6),
	});

	const { email, senha } = customerAuthenticateBodySchema.parse(request.body);

	try {
		const customersRepository = new PrismaCustomersRepository();
		const authenticateCustomerUseCase = new AuthenticateCustomerUseCase(customersRepository);

		const { customer } = await authenticateCustomerUseCase.execute({
			email,
			senha,
		});

		const token = await response.jwtSign({}, {
			sign: {
				sub: customer.id
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