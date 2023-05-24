import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { AuthenticateCostumerUseCase } from '../authenticate-costumer';

export function makeAuthenticateCostumerUseCase() {

	const costumersRepository = new PrismaCostumersRepository();
	const useCase = new AuthenticateCostumerUseCase(costumersRepository);

	return useCase;
}