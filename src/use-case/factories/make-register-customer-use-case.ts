import { PrismaCustomersRepository } from '@repositories/prisma/prisma-customer-repository';
import { RegisterCustomerUseCase } from '../register-customer';

export function makeRegisterCustomerUseCase() {

	const customersRepository = new PrismaCustomersRepository();
	const useCase = new RegisterCustomerUseCase(customersRepository);

	return useCase;
}