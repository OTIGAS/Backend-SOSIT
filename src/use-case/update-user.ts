import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UserAlreadyExistsError } from './errors/user-already-exists';

interface UpdateUserUseCaseRequest {
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

interface UpdateUserUseCaseResponse {
	user: User;
}

export class UpdateUserUseCase {
	constructor(private userRepository: UsersRepository) { }

	async execute(data: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

		const userFoundNyId = await this.userRepository.findById(data.id);

		if (!userFoundNyId) {
			throw new ResourceNotFoundError();
		}

		// const userWithSameCPF = await this.userRepository.findByCPF(data.cpf);

		// const userWithSameEmail = await this.userRepository.findByEmail(data.email);

		// if (userWithSameCPF?.id != userFoundNyId.id || userWithSameEmail?.id != userFoundNyId.id) {
		// 	throw new UserAlreadyExistsError();
		// }

		const senha_hash = await hash(data.senha_hash, 6);

		const user = await this.userRepository.update({
			...data,
			senha_hash,
		});

		return { user };
	}
}