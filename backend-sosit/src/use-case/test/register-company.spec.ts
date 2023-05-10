import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterCompanyUseCase } from '../register-company';
import { compare } from 'bcryptjs';
import { InMemoryCompaniesRepository } from '@repositories/in-memory/in-memory-comparies-repository';
import { CompanyAlreadyExistsError } from '../errors/company-already-exists';

let companyRepository: InMemoryCompaniesRepository;
let registerCompanyUseCase: RegisterCompanyUseCase;

beforeEach(() => {
	companyRepository = new InMemoryCompaniesRepository();
	registerCompanyUseCase = new RegisterCompanyUseCase(companyRepository);
});

describe('Register Comapny', () => {
	it('should be able to register', async () => {

		const { company } = await registerCompanyUseCase.execute({
			nome_fantasia: 'Nome Fantasia',
			razao_social: 'Razão Social',
			email: 'email@gmail.com',
			senha: '123456',
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

		expect(company.id).toEqual(expect.any(String));
	});

	it('should hash company password upon registration', async () => {

		const { company } = await registerCompanyUseCase.execute({
			nome_fantasia: 'Nome Fantasia',
			razao_social: 'Razão Social',
			email: 'email@gmail.com',
			senha: '123456',
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

		const isPasswordCorrectlyHashed = await compare('123456', company.senha_hash);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {

		const email = 'email@gmail.com';

		await registerCompanyUseCase.execute({
			nome_fantasia: 'Nome Fantasia',
			razao_social: 'Razão Social',
			email,
			senha: '123456',
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

		await expect(() =>
			registerCompanyUseCase.execute({
				nome_fantasia: 'Nome Fantasia',
				razao_social: 'Razão Social',
				email,
				senha: '123456',
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
			}),
		).rejects.toBeInstanceOf(CompanyAlreadyExistsError);
	});

	it('should not be able to register with same cnpj twice', async () => {

		const cnpj = '00.000.000/0000-00';

		await registerCompanyUseCase.execute({
			nome_fantasia: 'Nome Fantasia',
			razao_social: 'Razão Social',
			email: 'email@gmail.com',
			senha: '123456',
			cnpj,
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

		await expect(() =>
			registerCompanyUseCase.execute({
				nome_fantasia: 'Nome Fantasia',
				razao_social: 'Razão Social',
				email: 'email@gmail.com',
				senha: '123456',
				cnpj,
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
			}),
		).rejects.toBeInstanceOf(CompanyAlreadyExistsError);
	});
});