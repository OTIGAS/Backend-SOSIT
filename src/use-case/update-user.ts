import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { User } from '@prisma/client';

interface UpdateUserUseCaseRequest {
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

interface UpdateUserUseCaseResponse {
    user: User;
}

export class UpdateUserUseCase {
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
	}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

		const senha_hash = await hash(senha, 6);

		const user = await this.userRepository.update({
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