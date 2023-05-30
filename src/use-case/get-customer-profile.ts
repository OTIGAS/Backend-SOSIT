import { CustomersRepository } from '@repositories/customers-repository';
import { Customer } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetCustomerProfileUseCaseRequest {
	customerId: string;
}

interface GetCustomerProfileUseCaseResponse {
	customer: Customer;
}

export class GetCustomerProfileUseCase {
	constructor(private customersRepository: CustomersRepository) { }

	async execute({
		customerId,
	}: GetCustomerProfileUseCaseRequest): Promise<GetCustomerProfileUseCaseResponse> {
		const customer = await this.customersRepository.findById(customerId);

		if (!customer) {
			throw new ResourceNotFoundError();
		}

		return {
			customer
		};
	}
}