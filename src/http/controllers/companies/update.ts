import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import { z } from 'zod';
import { makeUpdateCompanyUseCase } from '@use-case/factories/make-update-company';
import { ResourceNotFoundError } from '@use-case/errors/resource-not-found-error';
import { CompanyAlreadyExistsError } from '@use-case/errors/company-already-exists';

interface UpdateRequestParams extends RouteGenericInterface {
	Params: {
		id: string;
	};
}

export async function update(request: FastifyRequest<UpdateRequestParams>, response: FastifyReply) {

	const companyUpdateParamsSchema = z.object({
		companyId: z.string().uuid()
	});

	const companyUpdateBodySchema = z.object({
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
	});

	try {
		const { companyId } = companyUpdateParamsSchema.parse(request.params);

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
			numero
		} = companyUpdateBodySchema.parse(request.body);

		const updateCompanyUseCase = makeUpdateCompanyUseCase();

		const updatedCompany = await updateCompanyUseCase.execute({
			id: companyId,
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
			numero
		});

		return response.status(200).send({
			company: updatedCompany
		});
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return response.status(409).send({
				message: error.message
			});
		} else if (error instanceof CompanyAlreadyExistsError) {
			return response.status(409).send({
				message: error.message
			});
		}
		throw error;
	}
}