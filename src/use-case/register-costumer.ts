import { CostumersRepository } from '@repositories/costumers-repository';
import { hash } from 'bcryptjs';
import { Costumer } from '@prisma/client';

interface RegisterCostumerUseCaseRequest {
	nome: string,
	email: string,
	senha: string,
	cpf: string,
	telefone: string,
	cep: string,
	estado: string,
	cidade: string,
	rua: string,
	numero: string,
	nascimento: string,
}

interface RegisterCostumerUseCaseResponse {
	costumer: Costumer;
}

export class RegisterCostumerUseCase {
	constructor(private costumerRepository: CostumersRepository) { }

	async execute({
		nome,
		email,
		senha,
		cpf,
		telefone,
		cep,
		estado,
		cidade,
		rua,
		numero,
		nascimento
	}: RegisterCostumerUseCaseRequest): Promise<RegisterCostumerUseCaseResponse> {

		const senha_hash = await hash(senha, 6);

		const costumer = await this.costumerRepository.create({
			nome,
			email,
			senha_hash,
			cpf,
			telefone,
			cep,
			estado,
			cidade,
			rua,
			numero,
			nascimento
		});

		return { costumer };
	}
}