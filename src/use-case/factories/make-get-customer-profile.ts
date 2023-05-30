import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { GetCustomerProfileUseCase } from '../get-customer-profile';

export function makeGetCustomerProfileUseCase() {

	const customersRepository = new PrismaCustomersRepository();
	const useCase = new GetCustomerProfileUseCase(customersRepository);

	return useCase;
}