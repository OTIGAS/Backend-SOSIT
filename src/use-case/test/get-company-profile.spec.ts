import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { GetCompanyProfileUseCase } from '../get-company-profile';
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-comparies-repository';

let companyRepository: InMemoryCompaniesRepository;
let getCompanyProfileUseCase: GetCompanyProfileUseCase;

beforeEach(() => {
	companyRepository = new InMemoryCompaniesRepository();
	getCompanyProfileUseCase = new GetCompanyProfileUseCase(companyRepository);
});

describe('Get Company Profile Use Case', () => {

	it('should be able to get company profile', async () => {

		const createdCompany = await companyRepository.create({
			nome_fantasia: 'Nome Fantasia',
			razao_social: 'Razão Social',
			email: 'email@gmail.com',
			senha_hash: await hash('123456', 6),
			cnpj: '00.000.000/0000-00',
			sobre: 'Sobre',
			img_perfil: 'imagem de perfil',
			link_google: 'link do google',
			telefone: '00 0 0000-0000',
			email_contato: 'email.contato@gmail.com',
			nome_contato: 'Nome do Contato',
			cep: '00000-000',
			estado: 'Estado',
			cidade: 'Cidade',
			rua: 'Rua',
			numero: '123'
		});

		const { company } = await getCompanyProfileUseCase.execute({
			companyId: createdCompany.id
		});

		expect(company.id).toEqual(expect.any(String));
		expect(company.nome_fantasia).toEqual('Nome Fantasia');
	});

	it('should be able to get user profile with wrong id', async () => {

		expect(() =>
			getCompanyProfileUseCase.execute({
				companyId: 'non-existing-id'
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});