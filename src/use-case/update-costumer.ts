import { CostumersRepository } from '@repositories/costumers-repository';
import { hash } from 'bcryptjs';
import { Costumer } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CostumerAlreadyExistsError } from './errors/costumer-already-exists';

interface UpdateCostumerUseCaseRequest {
	id: string,
	nome: string,
	email: string,
	senha_hash: string,
	cpf: string,
	telefone: string,
	cep: string,
	estado: string,
	cidade: string,
	rua: string,
	numero: string,
	nascimento: string
}

interface UpdateCostumerUseCaseResponse {
	costumer: Costumer;
}

export class UpdateCostumerUseCase {
	constructor(private costumerRepository: CostumersRepository) { }

	async execute(data: UpdateCostumerUseCaseRequest): Promise<UpdateCostumerUseCaseResponse> {

		const costumerFoundNyId = await this.costumerRepository.findById(data.id);

		if (!costumerFoundNyId) {
			throw new ResourceNotFoundError();
		}

		const costumerWithSameEmail = await this.costumerRepository.findByEmail(data.email);

		const costumerWithSameCPF = await this.costumerRepository.findByCPF(data.cpf);

		if (costumerWithSameEmail || costumerWithSameCPF) {
			if (costumerWithSameEmail?.id != data.id || costumerWithSameCPF?.id != data.id) {
				throw new CostumerAlreadyExistsError();
			}
		}

		const senha_hash = await hash(data.senha_hash, 6);

		const costumer = await this.costumerRepository.update({
			...data,
			senha_hash,
		});

		return { costumer };
	}
}