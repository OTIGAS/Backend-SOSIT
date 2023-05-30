import { CustomersRepository } from '@repositories/customers-repository';
import { hash } from 'bcryptjs';
import { Customer } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { CustomerAlreadyExistsError } from './errors/customer-already-exists';

interface UpdateCustomerUseCaseRequest {
	id: string,
	nome: string,
	email: string,
	senha_hash: string,
	cpf: string,
	telefone: string,
	cep: string,
	estado: string,
	cidade: string,
	rua: string,
	numero: string,
	nascimento: string
}

interface UpdateCustomerUseCaseResponse {
	customer: Customer;
}

export class UpdateCustomerUseCase {
	constructor(private customerRepository: CustomersRepository) { }

	async execute(data: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerUseCaseResponse> {

		const customerFoundNyId = await this.customerRepository.findById(data.id);

		if (!customerFoundNyId) {
			throw new ResourceNotFoundError();
		}

		const customerWithSameEmail = await this.customerRepository.findByEmail(data.email);

		const customerWithSameCPF = await this.customerRepository.findByCPF(data.cpf);

		if (customerWithSameEmail || customerWithSameCPF) {
			if (customerWithSameEmail?.id != data.id || customerWithSameCPF?.id != data.id) {
				throw new CustomerAlreadyExistsError();
			}
		}

		const senha_hash = await hash(data.senha_hash, 6);

		const customer = await this.customerRepository.update({
			...data,
			senha_hash,
		});

		return { customer };
	}
}