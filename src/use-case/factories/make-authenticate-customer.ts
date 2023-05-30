import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { AuthenticateCustomerUseCase } from '../authenticate-customer';

export function makeAuthenticateCustomerUseCase() {

	const customersRepository = new PrismaCustomersRepository();
	const useCase = new AuthenticateCustomerUseCase(customersRepository);

	return useCase;
}