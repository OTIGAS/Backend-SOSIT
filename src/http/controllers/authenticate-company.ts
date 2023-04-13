import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { AuthenticateCompanyUseCase } from '@/use-case/authenticate-campany';
import { InvalidCredencialsError } from '@/use-case/errors/invalid-credencials-error';
import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-company-repository';

export async function authenticateCompany(request: FastifyRequest, response: FastifyReply) {
	const companyAuthenticateBodySchema = z.object({
		email: z.string().email(),
		senha: z.string().min(6),
	});

	const { email, senha } = companyAuthenticateBodySchema.parse(request.body);

	try {
		const companiesRepository = new PrismaCompaniesRepository();
		const authenticateCompanyUseCase = new AuthenticateCompanyUseCase(companiesRepository);

		await authenticateCompanyUseCase.execute({
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