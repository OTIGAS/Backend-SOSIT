import { CostumersRepository } from '@repositories/costumers-repository';
import { InvalidCredencialsError } from './errors/invalid-credencials-error';
import { compare } from 'bcryptjs';
import { Costumer } from '@prisma/client';

interface AuthenticateCostumerUseCaseRequest {
	email: string;
	senha: string;
}

interface AuthenticateCostumerUseCaseResponse {
	costumer: Costumer;
}

export class AuthenticateCostumerUseCase {
	constructor(private costumersRepository: CostumersRepository) { }

	async execute({
		email, senha
	}: AuthenticateCostumerUseCaseRequest): Promise<AuthenticateCostumerUseCaseResponse> {
		const costumer = await this.costumersRepository.findByEmail(email);

		if (!costumer) {
			throw new InvalidCredencialsError();
		}

		const doesPasswordMatches = await compare(senha, costumer.senha_hash);

		if (!doesPasswordMatches) {
			throw new InvalidCredencialsError();
		}

		return {
			costumer
		};
	}
}