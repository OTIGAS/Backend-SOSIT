import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { UpdateCostumerUseCase } from '../update-costumer';

export function makeUpdateCostumerUseCase() {

	const costumersRepository = new PrismaCostumersRepository();
	const useCase = new UpdateCostumerUseCase(costumersRepository);

	return useCase;
}