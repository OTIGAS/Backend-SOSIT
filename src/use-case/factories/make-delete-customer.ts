import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { DeleteCustomerUseCase } from '../delete-customer';

export function makeDeleteCustomerUseCase() {

	const customersRepository = new PrismaCustomersRepository();
	const useCase = new DeleteCustomerUseCase(customersRepository);

	return useCase;
}