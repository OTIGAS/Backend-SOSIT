import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';

interface UpdateUserUseCaseRequest {
	id: string,
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
	criado_em: Date
}

interface UpdateUserUseCaseResponse {
	user: User;
}

export class UpdateUserUseCase {
	constructor(private userRepository: UsersRepository) { }

	async execute(data: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

		const senha_hash = await hash(data.senha, 6);

		const user = await this.userRepository.update({
			...data,
			senha_hash,
		});

		return { user };
	}
}