import { Prisma, Company } from '@prisma/client';
import { CompaniesRepository } from '../companies-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCompaniesRepository implements CompaniesRepository {

	public items: Company[] = [];

	async create(data: Prisma.CompanyCreateInput): Promise<Company> {
		const company = {
			id: data.id ?? randomUUID(),
			nome_fantasia: data.nome_fantasia,
			razao_social: data.razao_social,
			email: data.email,
			senha_hash: data.senha_hash,
			cnpj: data.cnpj,
			sobre: data.sobre,
			img_perfil: data.img_perfil,
			link_google: data.link_google,
			telefone: data.telefone,
			email_contato: data.email_contato,
			nome_contato: data.nome_contato,
			cep: data.cep,
			estado: data.estado,
			cidade: data.cidade,
			rua: data.rua,
			numero: data.numero,
			criado_em: new Date(),
		};

		this.items.push(company);

		return company;
	}

	async update(company: Prisma.CompanyCreateInput): Promise<Company> {
		const companyIndex = this.items.findIndex(company => company.id === company.id);

		if (companyIndex >= 0) {
			this.items[companyIndex].nome_fantasia = company.nome_fantasia?.toString() ?? this.items[companyIndex].nome_fantasia;
			this.items[companyIndex].razao_social = company.razao_social?.toString() ?? this.items[companyIndex].razao_social;
			this.items[companyIndex].email = company.email?.toString() ?? this.items[companyIndex].email;
			this.items[companyIndex].senha_hash = company.senha_hash?.toString() ?? this.items[companyIndex].senha_hash;
			this.items[companyIndex].cnpj = company.cnpj?.toString() ?? this.items[companyIndex].cnpj;
			this.items[companyIndex].sobre = company.sobre?.toString() ?? this.items[companyIndex].sobre;
			this.items[companyIndex].img_perfil = company.img_perfil?.toString() ?? this.items[companyIndex].img_perfil;
			this.items[companyIndex].link_google = company.link_google?.toString() ?? this.items[companyIndex].link_google;
			this.items[companyIndex].telefone = company.telefone?.toString() ?? this.items[companyIndex].telefone;
			this.items[companyIndex].email_contato = company.email_contato?.toString() ?? this.items[companyIndex].email_contato;
			this.items[companyIndex].nome_contato = company.nome_contato?.toString() ?? this.items[companyIndex].nome_contato;
			this.items[companyIndex].cep = company.cep?.toString() ?? this.items[companyIndex].cep;
			this.items[companyIndex].estado = company.estado?.toString() ?? this.items[companyIndex].estado;
			this.items[companyIndex].cidade = company.cidade?.toString() ?? this.items[companyIndex].cidade;
			this.items[companyIndex].rua = company.rua?.toString() ?? this.items[companyIndex].rua;
			this.items[companyIndex].numero = company.numero?.toString() ?? this.items[companyIndex].numero;
		}

		return Promise.resolve(this.items[companyIndex]);
	}

	async findByCNPJ(cnpj: string): Promise<Company | null> {
		const company = this.items.find((item) => item.cnpj === cnpj);

		if (!company) {
			return null;
		}

		return company;
	}

	async findByEmail(email: string): Promise<Company | null> {
		const company = this.items.find((item) => item.email === email);

		if (!company) {
			return null;
		}

		return company;
	}

	async findById(id: string): Promise<Company | null> {
		const company = this.items.find((item) => item.id === id);

		if (!company) {
			return null;
		}

		return company;
	}
}