import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { GetCostumerProfileUseCase } from '../get-costumer-profile';

export function makeGetCostumerProfileUseCase() {

	const costumersRepository = new PrismaCostumersRepository();
	const useCase = new GetCostumerProfileUseCase(costumersRepository);

	return useCase;
}