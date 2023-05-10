import { CompaniesRepository } from '../repositories/companies-repository';
import { hash } from 'bcryptjs';
import { Company } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CompanyAlreadyExistsError } from './errors/company-already-exists';

interface UpdateCompanyUseCaseRequest {
	id: string,
	nome_fantasia: string,
	razao_social: string,
	email: string,
	senha: string,
	cnpj: string,
	sobre: string,
	img_perfil: string,
	link_google: string,
	telefone: string,
	email_contato: string,
	nome_contato: string,
	cep: string,
	estado: string,
	cidade: string,
	rua: string,
	numero: string,
}

interface UpdateCompanyUseCaseResponse {
	company: Company;
}

export class UpdateCompanyUseCase {
	constructor(private companyRepository: CompaniesRepository) { }

	async execute({
		id,
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
	}: UpdateCompanyUseCaseRequest): Promise<UpdateCompanyUseCaseResponse> {

		const companyFoundById = await this.companyRepository.findById(id);

		if (!companyFoundById) {
			throw new ResourceNotFoundError();
		}

		// console.log(companyFoundById)

		// const companyWithSameCPF = await this.companyRepository.findByCNPJ(cnpj);

		// console.log(companyWithSameCPF)

		// const companyWithSameEmail = await this.companyRepository.findByEmail(email);

		// console.log(companyWithSameEmail)

		// if (companyWithSameCPF || companyWithSameEmail) {
		// 	if (companyWithSameCPF?.id != companyFoundById.id || companyWithSameEmail?.id != companyFoundById.id) {
		// 		throw new CompanyAlreadyExistsError();
		// 	}
		// }

		const senha_hash = await hash(senha, 6);

		const company = await this.companyRepository.update({
			id,
			nome_fantasia,
			razao_social,
			email,
			senha_hash,
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

		return { company };
	}
}