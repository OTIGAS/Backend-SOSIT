import { CustomersRepository } from '@repositories/customers-repository';
import { InvalidCredencialsError } from './errors/invalid-credencials-error';
import { compare } from 'bcryptjs';
import { Customer } from '@prisma/client';

interface AuthenticateCustomerUseCaseRequest {
	email: string;
	senha: string;
}

interface AuthenticateCustomerUseCaseResponse {
	customer: Customer;
}

export class AuthenticateCustomerUseCase {
	constructor(private customersRepository: CustomersRepository) { }

	async execute({
		email, senha
	}: AuthenticateCustomerUseCaseRequest): Promise<AuthenticateCustomerUseCaseResponse> {
		const customer = await this.customersRepository.findByEmail(email);

		if (!customer) {
			throw new InvalidCredencialsError();
		}

		const doesPasswordMatches = await compare(senha, customer.senha_hash);

		if (!doesPasswordMatches) {
			throw new InvalidCredencialsError();
		}

		return {
			customer
		};
	}
}