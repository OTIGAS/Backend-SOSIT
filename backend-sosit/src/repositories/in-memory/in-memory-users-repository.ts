import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {

	public items: User[] = [];

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
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

		this.items.push(user);

		return user;
	}

	async update(user: Prisma.UserCreateInput): Promise<User> {
		const userIndex = this.items.findIndex(user => user.id === user.id);

		if (userIndex >= 0) {
			this.items[userIndex].nome = user.nome?.toString() ?? this.items[userIndex].nome;
			this.items[userIndex].email = user.email?.toString() ?? this.items[userIndex].email;
			this.items[userIndex].senha_hash = user.senha_hash?.toString() ?? this.items[userIndex].senha_hash;
			this.items[userIndex].cpf = user.cpf?.toString() ?? this.items[userIndex].cpf;
			this.items[userIndex].telefone = user.telefone?.toString() ?? this.items[userIndex].telefone;
			this.items[userIndex].cep = user.cep?.toString() ?? this.items[userIndex].cep;
			this.items[userIndex].estado = user.estado?.toString() ?? this.items[userIndex].estado;
			this.items[userIndex].cidade = user.cidade?.toString() ?? this.items[userIndex].cidade;
			this.items[userIndex].rua = user.rua?.toString() ?? this.items[userIndex].rua;
			this.items[userIndex].numero = user.numero?.toString() ?? this.items[userIndex].numero;
			this.items[userIndex].nascimento = user.nascimento?.toString() ?? this.items[userIndex].nascimento;
		}

		return Promise.resolve(this.items[userIndex]);
	}

	async findByCPF(cpf: string): Promise<User | null> {
		const user = this.items.find((item) => item.cpf === cpf);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find((item) => item.email === email);

		if (!user) {
			return null;
		}

		return user;
	}

	async findById(id: string): Promise<User | null> {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}
}