import { CostumersRepository } from '@repositories/costumers-repository';
import { CostumersNotFoundError } from './errors/costumers-not-found';
import { Costumer } from '@prisma/client';

interface DeleteCostumerUseCaseRequest {
    costumerId: string;
}

interface DeleteCostumerUseCaseResponse {
    costumer: Costumer;
}

export class DeleteCostumerUseCase {
	constructor(private costumerRepository: CostumersRepository) { }

	async execute({ costumerId }: DeleteCostumerUseCaseRequest): Promise<DeleteCostumerUseCaseResponse> {

		const costumer = await this.costumerRepository.findById(costumerId);

		if (!costumer) {
			throw new CostumersNotFoundError();
		}

		await this.costumerRepository.delete(costumerId);

		return { costumer };
	}
}