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
	senha_hash: string,
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

	banco: string,
	agencia: string,
	digito: string,
	tipo_conta: string,
	conta: string
}

interface UpdateCompanyUseCaseResponse {
	company: Company;
}

export class UpdateCompanyUseCase {
	constructor(private companyRepository: CompaniesRepository) { }

	async execute(data: UpdateCompanyUseCaseRequest): Promise<UpdateCompanyUseCaseResponse> {

		const companyFoundById = await this.companyRepository.findById(data.id);

		if (!companyFoundById) {
			throw new ResourceNotFoundError();
		}

		const companyWithSameEmail = await this.companyRepository.findByEmail(data.email);

		const companyWithSameCPF = await this.companyRepository.findByCNPJ(data.cnpj);

		if (companyWithSameCPF || companyWithSameEmail) {
			if (companyWithSameCPF?.id != data.id || companyWithSameEmail?.id != data.id) {
				throw new CompanyAlreadyExistsError();
			}
		}

		const senha_hash = await hash(data.senha_hash, 6);

		const company = await this.companyRepository.update({
			...data,
			senha_hash,
		});

		return { company };
	}
}