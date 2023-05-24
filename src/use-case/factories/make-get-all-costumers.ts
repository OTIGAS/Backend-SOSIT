import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { GetAllCostumerProfileUseCase } from '../get-all-costumer';

export function makeGetAllCostumerProfileUseCase() {

	const costumersRepository = new PrismaCostumersRepository();
	const useCase = new GetAllCostumerProfileUseCase(costumersRepository);

	return useCase;
}