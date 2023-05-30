import { CustomersRepository } from '@repositories/customers-repository';
import { hash } from 'bcryptjs';
import { Customer } from '@prisma/client';
import { CustomerAlreadyExistsError } from './errors/customer-already-exists';

interface RegisterCustomerUseCaseRequest {
	nome: string,
	email: string,
	senha: string,
	cpf: string,
	telefone: string,
	cep: string,
	estado: string,
	cidade: string,
	rua: string,
	numero: string,
	nascimento: string,
}

interface RegisterCustomerUseCaseResponse {
	customer: Customer;
}

export class RegisterCustomerUseCase {
	constructor(private customerRepository: CustomersRepository) { }

	async execute({
		nome,
		email,
		senha,
		cpf,
		telefone,
		cep,
		estado,
		cidade,
		rua,
		numero,
		nascimento
	}: RegisterCustomerUseCaseRequest): Promise<RegisterCustomerUseCaseResponse> {

		const senha_hash = await hash(senha, 6);

		const customerWithSameEmail = await this.customerRepository.findByEmail(email);

		const customerWithSameCPF = await this.customerRepository.findByCPF(cpf);

		if (customerWithSameEmail || customerWithSameCPF) {
			throw new CustomerAlreadyExistsError();
		}

		const customer = await this.customerRepository.create({
			nome,
			email,
			senha_hash,
			cpf,
			telefone,
			cep,
			estado,
			cidade,
			rua,
			numero,
			nascimento
		});

		return { customer };
	}
}