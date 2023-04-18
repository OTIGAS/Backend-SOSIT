import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { User } from '@prisma/client';

interface RegisterUserUseCaseRequest {
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

interface RegisterUserUseCaseResponse {
	user: User;
}

export class RegisterUserUseCase {
	constructor(private userRepository: UsersRepository) { }

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
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {

		const senha_hash = await hash(senha, 6);

		const userWithSameCPF = await this.userRepository.findByCPF(cpf);

		if (userWithSameCPF) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.userRepository.create({
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

		return { user };
	}
}