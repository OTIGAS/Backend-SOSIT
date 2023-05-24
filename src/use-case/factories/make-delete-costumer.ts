import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { DeleteCostumerUseCase } from '../delete-costumer';

export function makeDeleteCostumerUseCase() {

	const costumersRepository = new PrismaCostumersRepository();
	const useCase = new DeleteCostumerUseCase(costumersRepository);

	return useCase;
}