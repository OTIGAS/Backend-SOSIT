import { CompaniesRepository } from '../repositories/companies-repository';
import { hash } from 'bcryptjs';
import { CompanyAlreadyExistsError } from './errors/company-already-exists';
import { Company } from '@prisma/client';

interface RegisterCompanyUseCaseRequest {
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

interface RegisterCompanyUseCaseResponse {
    company: Company;
}

export class RegisterCompanyUseCase {
	constructor(private companyRepository: CompaniesRepository) { }

	async execute({
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
	}: RegisterCompanyUseCaseRequest): Promise<RegisterCompanyUseCaseResponse> {

		const senha_hash = await hash(senha, 6);

		const companyWithSameCNPJ = await this.companyRepository.findByCNPJ(cnpj);

		if (companyWithSameCNPJ) {
			throw new CompanyAlreadyExistsError();
		}

		const company = await this.companyRepository.create({
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