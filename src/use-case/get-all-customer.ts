import { CustomersRepository } from '@repositories/customers-repository';
import { Customer } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CustomersNotFoundError } from './errors/customers-not-found';

interface GetCustomerProfileUseCaseResponse {
	customers: Customer[];
}

export class GetAllCustomerProfileUseCase {
	constructor(private customersRepository: CustomersRepository) { }

	async execute(): Promise<GetCustomerProfileUseCaseResponse> {
		const customers = await this.customersRepository.getAll();

		if (!customers) {
			throw new CustomersNotFoundError();
		}

		return {
			customers
		};
	}
}