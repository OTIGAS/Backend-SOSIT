import { CostumersRepository } from '@repositories/costumers-repository';
import { Costumer } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetCostumerProfileUseCaseRequest {
	costumerId: string;
}

interface GetCostumerProfileUseCaseResponse {
	costumer: Costumer;
}

export class GetCostumerProfileUseCase {
	constructor(private costumersRepository: CostumersRepository) { }

	async execute({
		costumerId,
	}: GetCostumerProfileUseCaseRequest): Promise<GetCostumerProfileUseCaseResponse> {
		const costumer = await this.costumersRepository.findById(costumerId);

		if (!costumer) {
			throw new ResourceNotFoundError();
		}

		return {
			costumer
		};
	}
}