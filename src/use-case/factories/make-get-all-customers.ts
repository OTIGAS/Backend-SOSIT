import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { GetAllCustomerProfileUseCase } from '../get-all-customer';

export function makeGetAllCustomerProfileUseCase() {

	const customersRepository = new PrismaCustomersRepository();
	const useCase = new GetAllCustomerProfileUseCase(customersRepository);

	return useCase;
}