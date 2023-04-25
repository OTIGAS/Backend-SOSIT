import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCompaniesRepository } from '@/repositories/in-memory/in-memory-comparies-repository';
import { UpdateCompanyUseCase } from '../update-company';

let companyRepository: InMemoryCompaniesRepository;
let updateCompanyUseCase: UpdateCompanyUseCase;

beforeEach(() => {
	companyRepository = new InMemoryCompaniesRepository();
	updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository);
});

describe('Update Comapny', () => {
	it('should be able to update', async () => {

		const companyOriginal = await companyRepository.create({
			nome_fantasia: 'Nome Fantasia',
			razao_social: 'Razão Social',
			email: 'email@gmail.com',
			senha_hash: '123456',
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

		console.log(companyOriginal);

		const companyChanged = await updateCompanyUseCase.execute({
			nome_fantasia: 'Outro Nome Fantasia',
			razao_social: 'Outra Razão Social',
			email: 'outroEmail@gmail.com',
			senha: 'outra123456',
			cnpj: '00.000.000/0000-00',
			sobre: 'Outro Sobre',
			img_perfil: 'Outra imagem de perfil',
			link_google: 'Outro link do google',
			telefone: '00 0 0000-0000',
			email_contato: 'outroEmail.contato@gmail.com',
			nome_contato: 'Outro Nome do Contato',
			cep: '00000-000',
			estado: 'Outro Estado',
			cidade: 'Outra Cidade',
			rua: 'Outra Rua',
			numero: '123'
		});

		console.log(companyChanged);

		expect(companyChanged.company).toEqual(
			expect.objectContaining({ id: companyOriginal.id, }),
		);
	});


});