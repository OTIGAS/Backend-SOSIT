import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { UpdateCustomerUseCase } from '../update-customer';

export function makeUpdateCustomerUseCase() {

	const customersRepository = new PrismaCustomersRepository();
	const useCase = new UpdateCustomerUseCase(customersRepository);

	return useCase;
}