import { Prisma, Customer } from '@prisma/client';
import { CustomersRepository } from '../customers-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCustomersRepository implements CustomersRepository {

	public items: Customer[] = [];

	async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
		const customer = {
			id: data.id ?? randomUUID(),
			nome: data.nome,
			email: data.email,
			senha_hash: data.senha_hash,
			cpf: data.cpf,
			telefone: data.telefone,
			cep: data.cep,
			estado: data.estado,
			cidade: data.cidade,
			rua: data.rua,
			numero: data.numero,
			nascimento: data.nascimento,
			criado_em: new Date(),
		};

		this.items.push(customer);

		return customer;
	}

	async update(customer: Prisma.CustomerCreateInput): Promise<Customer> {
		const customerIndex = this.items.findIndex(customer => customer.id === customer.id);

		if (customerIndex >= 0) {
			this.items[customerIndex].nome = customer.nome?.toString() ?? this.items[customerIndex].nome;
			this.items[customerIndex].email = customer.email?.toString() ?? this.items[customerIndex].email;
			this.items[customerIndex].senha_hash = customer.senha_hash?.toString() ?? this.items[customerIndex].senha_hash;
			this.items[customerIndex].cpf = customer.cpf?.toString() ?? this.items[customerIndex].cpf;
			this.items[customerIndex].telefone = customer.telefone?.toString() ?? this.items[customerIndex].telefone;
			this.items[customerIndex].cep = customer.cep?.toString() ?? this.items[customerIndex].cep;
			this.items[customerIndex].estado = customer.estado?.toString() ?? this.items[customerIndex].estado;
			this.items[customerIndex].cidade = customer.cidade?.toString() ?? this.items[customerIndex].cidade;
			this.items[customerIndex].rua = customer.rua?.toString() ?? this.items[customerIndex].rua;
			this.items[customerIndex].numero = customer.numero?.toString() ?? this.items[customerIndex].numero;
			this.items[customerIndex].nascimento = customer.nascimento?.toString() ?? this.items[customerIndex].nascimento;
		}

		return Promise.resolve(this.items[customerIndex]);
	}

	async findByCPF(cpf: string): Promise<Customer | null> {
		const customer = this.items.find((item) => item.cpf === cpf);

		if (!customer) {
			return null;
		}

		return customer;
	}

	async findByEmail(email: string): Promise<Customer | null> {
		const customer = this.items.find((item) => item.email === email);

		if (!customer) {
			return null;
		}

		return customer;
	}

	async findById(id: string): Promise<Customer | null> {
		const customer = this.items.find((item) => item.id === id);

		if (!customer) {
			return null;
		}

		return customer;
	}
}