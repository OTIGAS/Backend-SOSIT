import { CostumersRepository } from '@repositories/costumers-repository';
import { Costumer } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CostumersNotFoundError } from './errors/costumers-not-found';

interface GetCostumerProfileUseCaseResponse {
    costumers: Costumer[];
}

export class GetAllCostumerProfileUseCase {
	constructor(private costumersRepository: CostumersRepository) { }

	async execute(): Promise<GetCostumerProfileUseCaseResponse> {
		const costumers = await this.costumersRepository.getAll();

		if (!costumers) {
			throw new CostumersNotFoundError();
		}

		return {
			costumers
		};
	}
}