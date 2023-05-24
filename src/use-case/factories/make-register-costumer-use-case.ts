import { PrismaCostumersRepository } from '@repositories/prisma/prisma-costumer-repository';
import { RegisterCostumerUseCase } from '../register-costumer';

export function makeRegisterCostumerUseCase() {

	const costumersRepository = new PrismaCostumersRepository();
	const useCase = new RegisterCostumerUseCase(costumersRepository);

	return useCase;
}