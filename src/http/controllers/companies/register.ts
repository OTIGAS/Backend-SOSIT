import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CompanyAlreadyExistsError } from '@use-case/errors/company-already-exists';
import { makeRegisterCompanyUseCase } from '@use-case/factories/make-register-company-use-case';


export async function register(request: FastifyRequest, response: FastifyReply) {
	const companyRegisteBodySchema = z.object({
		nome_fantasia: z.string(),
		razao_social: z.string(),
		email: z.string().email(),
		senha: z.string().min(6),
		cnpj: z.string(),

		sobre: z.string(),
		img_perfil: z.string(),
		link_google: z.string(),

		telefone: z.string(),
		email_contato: z.string(),
		nome_contato: z.string(),

		cep: z.string(),
		estado: z.string(),
		cidade: z.string(),
		rua: z.string(),
		numero: z.string(),

		banco: z.string(),
		agencia: z.string(),
		digito: z.string(),
		tipo_conta: z.string(),
		conta: z.string()
	});

	const {
		nome_fantasia,
		razao_social,
		email,
		senha,
		cnpj,

		sobre,
		img_perfil,
		link_google,

		telefone,
		email_contato,
		nome_contato,

		cep,
		estado,
		cidade,
		rua,
		numero,

		banco,
		agencia,
		digito,
		tipo_conta,
		conta
	} = companyRegisteBodySchema.parse(request.body);

	try {
		const registerCompanyUseCase = makeRegisterCompanyUseCase();

		await registerCompanyUseCase.execute({
			nome_fantasia,
			razao_social,
			email,
			senha,
			cnpj,

			sobre,
			img_perfil,
			link_google,

			telefone,
			email_contato,
			nome_contato,

			cep,
			estado,
			cidade,
			rua,
			numero,

			banco,
			agencia,
			digito,
			tipo_conta,
			conta
		});
	} catch (err) {
		if (err instanceof CompanyAlreadyExistsError) {
			return response.status(409).send({
				message: err.message
			});
		}
		return response.status(500).send();
	}

	return response.status(201).send();
}