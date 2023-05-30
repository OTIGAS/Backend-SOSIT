import { CustomersRepository } from '@repositories/customers-repository';
import { CustomersNotFoundError } from './errors/customers-not-found';
import { Customer } from '@prisma/client';

interface DeleteCustomerUseCaseRequest {
	customerId: string;
}

interface DeleteCustomerUseCaseResponse {
	customer: Customer;
}

export class DeleteCustomerUseCase {
	constructor(private customerRepository: CustomersRepository) { }

	async execute({ customerId }: DeleteCustomerUseCaseRequest): Promise<DeleteCustomerUseCaseResponse> {

		const customer = await this.customerRepository.findById(customerId);

		if (!customer) {
			throw new CustomersNotFoundError();
		}

		await this.customerRepository.delete(customerId);

		return { customer };
	}
}