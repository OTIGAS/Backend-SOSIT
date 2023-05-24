import { Prisma, Costumer } from '@prisma/client';
import { CostumersRepository } from '../costumers-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCostumersRepository implements CostumersRepository {

	public items: Costumer[] = [];

	async create(data: Prisma.CostumerCreateInput): Promise<Costumer> {
		const costumer = {
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

		this.items.push(costumer);

		return costumer;
	}

	async update(costumer: Prisma.CostumerCreateInput): Promise<Costumer> {
		const costumerIndex = this.items.findIndex(costumer => costumer.id === costumer.id);

		if (costumerIndex >= 0) {
			this.items[costumerIndex].nome = costumer.nome?.toString() ?? this.items[costumerIndex].nome;
			this.items[costumerIndex].email = costumer.email?.toString() ?? this.items[costumerIndex].email;
			this.items[costumerIndex].senha_hash = costumer.senha_hash?.toString() ?? this.items[costumerIndex].senha_hash;
			this.items[costumerIndex].cpf = costumer.cpf?.toString() ?? this.items[costumerIndex].cpf;
			this.items[costumerIndex].telefone = costumer.telefone?.toString() ?? this.items[costumerIndex].telefone;
			this.items[costumerIndex].cep = costumer.cep?.toString() ?? this.items[costumerIndex].cep;
			this.items[costumerIndex].estado = costumer.estado?.toString() ?? this.items[costumerIndex].estado;
			this.items[costumerIndex].cidade = costumer.cidade?.toString() ?? this.items[costumerIndex].cidade;
			this.items[costumerIndex].rua = costumer.rua?.toString() ?? this.items[costumerIndex].rua;
			this.items[costumerIndex].numero = costumer.numero?.toString() ?? this.items[costumerIndex].numero;
			this.items[costumerIndex].nascimento = costumer.nascimento?.toString() ?? this.items[costumerIndex].nascimento;
		}

		return Promise.resolve(this.items[costumerIndex]);
	}

	async findByCPF(cpf: string): Promise<Costumer | null> {
		const costumer = this.items.find((item) => item.cpf === cpf);

		if (!costumer) {
			return null;
		}

		return costumer;
	}

	async findByEmail(email: string): Promise<Costumer | null> {
		const costumer = this.items.find((item) => item.email === email);

		if (!costumer) {
			return null;
		}

		return costumer;
	}

	async findById(id: string): Promise<Costumer | null> {
		const costumer = this.items.find((item) => item.id === id);

		if (!costumer) {
			return null;
		}

		return costumer;
	}
}